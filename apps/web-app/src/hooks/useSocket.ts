"use client";
import { useEffect, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { Messages } from "@repo/types/message";
import axios from "axios";

const useSocket = (chatbotId: string, visitorId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Messages[]>([]);

  useEffect(() => {
    const newSocket = io("http://localhost:8080");
    setSocket(newSocket);
    const fetchMessages = async () => {
      const messages = await axios.get(`/api/messages/${chatbotId}/${visitorId}`);
      setMessages(messages.data.messages);
    };
    fetchMessages();
    return () => {
      newSocket.disconnect();
    };
  }, [chatbotId, visitorId]);

  useEffect(() => {
    if (socket && chatbotId && visitorId) {
      socket.emit("register", chatbotId, visitorId, false);
      console.log("emitting register");

      const messageListener = (message: Messages) => {
        setMessages((prev) => [ message, ...prev]);
      };

      socket.on("receive_message", messageListener);

      return () => {
        socket.off("receive_message", messageListener);
      };
    }
  }, [chatbotId, visitorId, socket]);

  const sendMessage = useCallback(
    (content: string) => {
      if (socket && content.trim()) {
        const newMessage = {
          content,
          isSentByVisitor: false,
          chatbotId,
          visitorId,
        };
        socket.emit("private_message", {
          ...newMessage,
          isVisitor: false,
        });
        setMessages((prev) => [newMessage, ...prev]);
      }
    },
    [socket, chatbotId, visitorId]
  );

  return { messages, sendMessage };
};

export default useSocket;
