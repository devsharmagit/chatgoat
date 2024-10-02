"use client";
import { Button } from "@/components/ui/button";
import { Messages } from "@repo/types/message";
import React, { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

const Page = ({
  params: { chatbotId, visitorId },
}: {
  params: { chatbotId: string; visitorId: string };
}) => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Messages[]>([]);

  const socket = io("http://localhost:8080");

  const socketRef = useRef<null | Socket>(null)

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.length !== 0) {
      socket.emit("private_message", {
        chatbotId,
        visitorId,
        isVisitor: false,
        content: input,
      });
      setMessages((prev) => [
        ...prev,
        { content: input, isSentByVisitor: false, chatbotId, visitorId },
      ]);
      setInput("");
    }
  };

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:8080");
    }
    const socket = socketRef.current;
    
    if (chatbotId && visitorId) {
      socket.emit("register", chatbotId, visitorId, false);
      
      const messageListener = ({
        content,
        chatbotId,
        isSentByVisitor,
        visitorId,
      }: Messages) => {
        console.log("this iis working")
        console.log(content)
        setMessages((prev) => [
          ...prev,
          { content, chatbotId, isSentByVisitor, visitorId },
        ]);
      };
      socket.on("receive_message", messageListener);
      return () => {
        socket.off("receive_message", messageListener);
      };
    }
  }, [chatbotId, visitorId, socket]);

  return (
    <div>
      <div className="flex flex-col gap-1">
        {messages.map(({ content }, index) => (
          <p key={index}>{content}</p>
        ))}
      </div>
      <div className="flex flex-col">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
