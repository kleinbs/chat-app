import React, { useEffect, useState } from "react";
import { useConnection } from "../socket/connection";
import TextEntry from "../components/TextEntry";
import Message from "../components/Message";
import { makeStyles } from "@material-ui/core/styles";
import Users from "../components/Users";

const useStyles = makeStyles((theme) => ({
  messageBox: {
    height: "75vh",
    overflowY: "auto",
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
  },
  userBox: {
    height: "5vh",
  },
  messageEntry: {
    padding: "25px 0px 20px 0px",
    height: "15vh",
    minHeight: "15vh",
  },
}));

export default ({ user, onDisconnect }) => {
  const classes = useStyles();
  const {
    messages,
    connectionState,
    activeUsers,
    sendMessage,
  } = useConnection({ user, onDisconnect });

  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(() => {
    const messageBox = document.getElementById("messages");
    const checkScrollPosition = () => {
      messageBox.scrollHeight - Math.abs(messageBox.scrollTop) ===
      messageBox.clientHeight
        ? setIsAtBottom(true)
        : setIsAtBottom(false);
    };
    messageBox.addEventListener("scroll", checkScrollPosition, true);

    return () => {
      messageBox.removeEventListener("scroll", checkScrollPosition, true);
    };
  }, []);

  useEffect(() => {
    const messageBox = document.getElementById("messages");
    if (isAtBottom) {
      messageBox.scrollTo(0, messageBox.scrollHeight, "smooth");
    }
  });

  const postMessage = (message) => {
    sendMessage({ ...user, message });
    setIsAtBottom(true);
  };

  return (
    <div>
      <div id={"messages"} className={classes.messageBox}>
        {messages.map((message, index) => {
          return (
            <Message
              key={index}
              message={message.message}
              useName={message.userName}
              postedOn={message.postedOn}
              myMessage={user.userName === message.userName}
            />
          );
        })}
      </div>
      <div className={classes.userBox}>
        <Users users={activeUsers} />
      </div>
      <div className={classes.messageEntry}>
        <TextEntry onSubmit={postMessage} />
      </div>
    </div>
  );
};
