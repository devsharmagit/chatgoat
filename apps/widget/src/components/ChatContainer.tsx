import { useEffect, useState } from "react";
import Header from "./Header";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import { Button } from "./ui/button";
import axios from "axios";
import io from "socket.io-client";
import { Messages as MessagesTypes } from "@repo/types/message";

interface Chatbots {
  visitorId: string;
  chatbotId: string;
}

const ChatContainer = ({ chatbotId }: { chatbotId: string }) => {
  const socket = io("http://localhost:8080");

  const [visitorId, setVisitorId] = useState<string>("");
  const [messages, setMessages] = useState<MessagesTypes[]>([]);

  const handleClick = async () => {
    const chatbotId2 = chatbotId;
    let tempVisitorId = "";
    const chatbots: Chatbots[] = await JSON.parse(
      localStorage.getItem("chatbots") || "[]"
    );
    const chatbot = chatbots.find(({ chatbotId }) => chatbotId === chatbotId2);
    if (chatbot) {
      tempVisitorId = chatbot.visitorId;
    } else {
      const response = await axios.post("http://localhost:3000/api/visitor", {
        chatbotId: chatbotId,
      });
      tempVisitorId = response.data.visitor.id;
      localStorage.setItem("chatbots", JSON.stringify([...chatbots, {visitorId : tempVisitorId, chatbotId}]))
    }
    setVisitorId(tempVisitorId);
    console.log({tempVisitorId})
    socket.emit("register", chatbotId, tempVisitorId, true);
  };

  const handleReceive = ({
    content,
    chatbotId,
    visitorId,
    isSentByVisitor,
  }: MessagesTypes) => {
    console.log("this function is not workign")
    setMessages((prev) => [
      ...prev,
      { content, chatbotId, visitorId, isSentByVisitor },
    ]);
  };

  useEffect(() => {
    if(socket){
      socket.on("receive_message", handleReceive);
    }
  }, [socket]);

  return (
    <div className="fixed bottom-16 right-4 w-[350px] h-[500px] rounded-lg shadow-md flex flex-col">
      {visitorId.length === 0 && (
        <div className="h-full flex flex-col justify-center items-center">
          <Button onClick={handleClick} variant={"secondary"}>
            Start
          </Button>
          <p className="text-sm pt-3"> Start chat with experts ! </p>
          <p className="text-xs">
            Powered by{" "}
            <a className="underline" href="https://chatgoat.devsharmacode.com">
              ChatGoat
            </a>
          </p>
        </div>
      )}
      {visitorId.length !== 0 && (
        <>
          {visitorId}
          <Header name="Experts" />
          <Messages messages={messages} />
          <SendMessage
            socket={socket}
            chatbotId={chatbotId}
            visitorId={visitorId}
            setMessages={setMessages}
          />
        </>
      )}
    </div>
  );
};

export default ChatContainer;
