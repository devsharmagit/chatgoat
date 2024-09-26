import Header from "./Header"
import Messages from "./Messages"
import SendMessage from "./SendMessage"

const ChatContainer = ({chatbotId, visitorId}:{chatbotId: string, visitorId: string}) => {
  
  return (
    <div className='fixed bottom-16 right-4 w-[350px] h-[500px] rounded-lg shadow-md flex flex-col'>
      <Header name="Experts"/>
      
      <Messages />
      <SendMessage />
      
    </div>
  )
}

export default ChatContainer
