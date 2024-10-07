import React from "react";
import VisitorInfromation from "@/components/VisitorInfromation";
import MessagesContainer from "@/components/MessagesContainer";

const ChatPage = ({
  params: { chatbotId, visitorId },
}: {
  params: { chatbotId: string; visitorId: string };
}) => {

  return (<div className="max-w-7xl flex m-auto">
    <MessagesContainer chatbotId={chatbotId} visitorId={visitorId} />
    <VisitorInfromation visitorId={visitorId}/> 
  </div>
  );
};

export default ChatPage;
