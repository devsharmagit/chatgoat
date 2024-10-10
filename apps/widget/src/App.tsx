import { Button } from "@/components/ui/button";
import { MessageCircleMore } from "lucide-react";
import {    useState } from "react";
import ChatContainer from "./components/ChatContainer";

function App({ chatbotid }: { chatbotid: string }) {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const handleChatClick = () => {
    setIsChatOpen((prev) => !prev);
  };
  const handleChatClose = ()=>{
    setIsChatOpen(false)
  }


  return (
    <>
    <style>
      {/* {styles} */}
    </style>
      {isChatOpen && <ChatContainer chatbotId={chatbotid} closeChat={handleChatClose} />}
      <Button
        onClick={handleChatClick}
        variant={"destructive"}
        className={`fixed bottom-2 right-2 p-0 h-[50px] w-[50px] animate-bounce rounded-full ${isChatOpen && "animate-none"}`}
      >
        <MessageCircleMore height={30} width={30} />
      </Button>
    </>
  );
}

export default App;
