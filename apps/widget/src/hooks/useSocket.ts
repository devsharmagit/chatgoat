import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Messages as MessagesTypes } from "@repo/types/message";
import axios from "axios";


export interface Chatbots {
  visitorId: string;
  chatbotId: string;
}

const useSocket = ({chatbotId}: {chatbotId: string}) => {
  const [socketState, setSocketState] = useState<null | Socket>(null);
  const [messages, setMessages] = useState<MessagesTypes[]>([]);
  const [visitorId, setVisitorId] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleStart = async()=>{
    try {
      setIsLoading(true)
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
      socketState?.emit("register", chatbotId, tempVisitorId, true);
    const response = await axios.get(`http://localhost:3000/api/messages/${chatbotId}/${tempVisitorId}`)
    if(response.status === 200) setMessages(response.data.messages)
    } catch (error) {
      console.log(error)
    } finally{
      setIsLoading(false)
    }
   
  }
  function sendMessage(textMessage:string) {
    if(!socketState) return
      socketState.emit("private_message", {
        chatbotId,
        visitorId,
        isVisitor: true,
        content: textMessage.trim(),
      });
      setMessages((prev) => [
        { content: textMessage.trim(), isSentByVisitor: true, chatbotId, visitorId },
        ...prev,
      ]);
  }
  const handleReceive = ({
    content,
    chatbotId,
    visitorId,
    isSentByVisitor,
  }: MessagesTypes) => {
    setMessages((prev) => [
      { content, chatbotId, visitorId, isSentByVisitor },
      ...prev,
    ]);
  };

  useEffect(() => {
    const newSocket = io("http://localhost:8080");
    setSocketState(newSocket);
  }, []);

  useEffect(()=>{
if(socketState){
  socketState.on("receive_message", handleReceive);
}
  }, [socketState])

  return {handleStart, messages, sendMessage, visitorId, isLoading};
};

export default useSocket;
