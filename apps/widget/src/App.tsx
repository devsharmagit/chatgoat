import { Button } from "@/components/ui/button"
import { MessageCircleMore } from "lucide-react"
import { useEffect, useState } from "react"
import ChatContainer from "./components/ChatContainer"
import axios from "axios"



function App({chatbotId}:{chatbotId: string}) {
  
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false)
  const [visitorId, setVisitorId] = useState<string>("")
  const handleChatClick = ()=>{
    setIsChatOpen((prev)=>!prev)
  }
console.log(isChatOpen)
  

  useEffect(()=>{
    const getVisitorId = async()=>{
      const response = await axios.post("http://localhost:3000/api/visitor", {chatbotId: chatbotId})
      setVisitorId(response.data.visitor.id)
    }
    getVisitorId()
  }, [chatbotId])

  return (
    <>
    {isChatOpen && visitorId && <ChatContainer visitorId={visitorId} chatbotId={chatbotId} />}
    <Button onClick={handleChatClick} variant={"destructive"} className={`fixed bottom-2 right-2 p-0 h-[50px] w-[50px] animate-bounce rounded-full ${isChatOpen && "animate-none"}`}>
      <MessageCircleMore height={30} width={30} />
    </Button>
    </>
  )
}

export default App
