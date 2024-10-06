import {Messages as MessagesTypes} from "@repo/types/message"

const Messages = ({ messages}:{ messages: MessagesTypes[]}) => {

    return (
    <div className='flex-grow flex flex-col-reverse no-scrollbar overflow-y-scroll px-2 py-1 gap-1'>
      {messages.map((message, index)=>{
        return <div key={index} className="">
            <p className={`px-4 py-1 block leading-tight rounded-[20px] w-fit max-w-[75%] ${!message.isSentByVisitor ? "mr-auto text-left bg-[#6e4451] text-white" : "bg-gray-200 text-black text-right ml-auto"} `}>
{message.content}
            </p>
        </div>
      })}
    </div>
  )
}

export default Messages
