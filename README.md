# Chat App

This project is just me messing around. I created a chat app using:

Client:

1. React
2. Webpack
3. Material Ui
4. Websocket.io client

Server:

1. Node
2. Express
3. Websocket.io

## Setting up and Running the app

### Development

```npm
# To install all the app dependencies
npm i
# to start the server
npm run start:server
# to start the client
npm run start:client
```

### Docker

Install Docker https://docs.docker.com/engine/install/

```npm
npm run start:app
```

## About this app

**Q:** _How secure is this app?_

**A:** Not at all, When a user registers, the app writes a cookie with the username and a cookie with a userID _guid_ which is being used as the users "credentials". If is lost, the userId is lost, the account will become orphaned. If another actor gets ahold of someone's userID and userName, they can easily get logged in as that user.

---

**Q:** _Why use material ui?_

**A:** It made building this app very quickly, and didn't want to get hung up on styling

---

**Q:** _How is data saved?_

**A:** Just in memory. When the app goes down, all messages and users are lost. in the future I may change this
