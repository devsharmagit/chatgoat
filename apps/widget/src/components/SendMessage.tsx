import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { Socket } from "socket.io-client";
import {Messages} from "@repo/types/message"

interface SendMessageProps {
  socket: Socket;
  chatbotId: string;
  visitorId: string;
  setMessages: React.Dispatch<React.SetStateAction<Messages[]>>;
}

const SendMessage = ({
  socket,
  chatbotId,
  visitorId,
  setMessages,
}: SendMessageProps) => {
  const [text, setText] = useState<string>("");

  
  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (text.length !== 0) {
      socket.emit("private_message", {
        chatbotId,
        visitorId,
        isVisitor: true,
        content: text,
      });
      setMessages((prev) => [
        ...prev,
        { content: text, isSentByVisitor: true, chatbotId, visitorId },
      ]);
      setText("");
    }
  };
  return (
    <div className="px-2 py-2 rounded-b-md  flex gap-1 items-center">
      <form onSubmit={handleSubmit} className="flex gap-1 items-center w-full">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="h-[30px]"
        />
        <Button
          type="submit"
          className="h-[30px] w-[30px] rounded-md flex justify-center items-center p-0 bg-purple-900 text-white"
        >
          <Send width={20} height={20} />
        </Button>
      </form>
    </div>
  );
};

export default SendMessage;
