const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { v4: uuidv4 } = require("uuid");

const cors = {
  origin: "*",
};

const io = require("socket.io")(server, { cors });

const PORT = 3000;
const users = {};
const messages = [];

app.use(express.static("dist"));

app.post("/api/createUser", (req, res) => {
  const userName = req.query.value;

  if (users[userName]) {
    res.status(400).send({
      error: {
        CODE: "NAME_TAKEN",
      },
    });
  } else {
    const id = uuidv4();
    console.log(`${id} registered with userName ${userName}`);
    users[userName] = {
      id,
      userName,
      active: false,
    };
    res.status(200).send({
      data: {
        user: {
          userName,
          id,
        },
      },
    });
  }
});

server.listen(PORT, function () {
  console.log(`${new Date()} Server is listening on port ${PORT}`);
});

io.on("connection", (client) => {
  let user;

  client.on("login", (data) => {
    const { userName } = data;
    if (verifyUser(data)) {
      user = users[userName];
      user.userName = userName;
      users[data.userName].active = true;

      const scrubbedUsers = getScrubbedUsers(users);
      client.broadcast.emit("user-connected", { users: scrubbedUsers });
      client.emit("connected", {
        user,
        users: scrubbedUsers,
        messages,
      });
      console.log(`user ${user.userName} connected`);
    } else {
      console.warn(
        `Someone tried to connect with userName ${userName} with id ${data?.id}, but name either didn't exist or didn't have correct ID`
      );
      client.disconnect();
    }
  });

  client.on("disconnect", () => {
    if (user) {
      users[user.userName].active = false;
      user.active = false;
      const { userName, active } = user;
      client.broadcast.emit("user-disconnected", {
        users: getScrubbedUsers(users),
      });
      console.log(`user ${userName} disconnected`);
    } else {
      console.log(`user doesn't seem to exist, disconnecting...`);
    }
  });

  client.on("send-message", (data) => {
    const { id, userName, message } = data;

    if (verifyUser(data)) {
      const fullMessage = {
        userName,
        message,
        postedOn: Date.now(),
      };
      messages.push(fullMessage);
      console.log(`${userName} sent a message: ${message}`);
      io.sockets.emit("new-message", fullMessage);
    } else {
      console.warn(`unknown user sent message: id ${id}, userName ${userName}`);
    }
  });

  client.on("retrieve-messages", (data) => {
    const { id, userName } = data;

    verifyUser(data)
      ? client.emit("received-messages", messages)
      : console.warn(
          `unknown user tried to receive messages: id ${id}, userName ${userName}`
        );
  });

  function verifyUser({ id, userName }) {
    return !!users[userName] && users[userName].id === id;
  }
});

function getScrubbedUsers(users) {
  return Object.keys(users).map((key) => {
    const { active, userName } = users[key];
    return { active, userName };
  });
}
