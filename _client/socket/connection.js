import { useEffect, useRef, useState } from "react";
import socket from "socket.io-client";

export const useConnection = ({ user, onDisconnect }) => {
  const client = useRef();

  const [connectionState, setConnectionState] = useState("closed");
  const [activeUsers, setActiveUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    client.current = socket("localhost:3000");

    client.current.on("connect", () => {
      client.current.emit("login", user);
    });

    client.current.on("connected", (data) => {
      setConnectionState("connected");
      setMessages(data.messages);
      setActiveUsers(data.users);
    });

    client.current.on("new-message", (data) => {
      setMessages((messages) => [...messages, data]);
    });

    client.current.on("user-connected", (data) => {
      setActiveUsers(data.users);
    });

    client.current.on("user-disconnected", (data) => {
      setActiveUsers(data.users);
    });

    client.current.on("disconnect", () => {
      onDisconnect();
    });
  }, []);

  return {
    messages,
    activeUsers,
    connectionState,
    sendMessage: (message) => {
      client.current.emit("send-message", { ...message });
    },
  };
};
