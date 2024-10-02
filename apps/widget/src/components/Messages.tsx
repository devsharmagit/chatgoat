import {Messages as MessagesTypes} from "@repo/types/message"

const Messages = ({ messages}:{ messages: MessagesTypes[]}) => {

    return (
    <div className='flex-grow flex flex-col justify-end overflow-y-scroll px-2 py-1 gap-1'>
      {messages.map((message, index)=>{
        return <div key={index} className="">
            <p className={`px-3 py-1 block leading-tight rounded-[100px] w-fit max-w-[75%] ${!message.isSentByVisitor ? "mr-auto text-left bg-purple-900 text-white" : "bg-purple-300 text-black text-right ml-auto"} `}>
{message.content}
            </p>
        </div>
      })}
    </div>
  )
}

export default Messages
