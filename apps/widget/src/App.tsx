import { Button } from "@/components/ui/button";
import { MessageCircleMore } from "lucide-react";
import {  useState } from "react";
import ChatContainer from "./components/ChatContainer";

function App({ chatbotId }: { chatbotId: string }) {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const handleChatClick = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <>
      {isChatOpen && <ChatContainer chatbotId={chatbotId} />}
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
