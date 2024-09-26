// import React, { useState } from 'react'

const Messages = () => {
//   const [messages, setMessages] = useState([])
const messages = [
    {
      content: "Hello there",
      isSentByVisitor: false
    },
    {
      content: "Hi! How can I help you today?",
      isSentByVisitor: true
    },
    {
      content: "I have a question about your services.",
      isSentByVisitor: false
    },
    {
      content: "Sure, feel free to ask!",
      isSentByVisitor: true
    },
    {
      content: "Do you offer 24/7 support?",
      isSentByVisitor: false
    },
    {
      content: "Yes, we do!",
      isSentByVisitor: true
    },
    {
      content: "Great! Thank you.",
      isSentByVisitor: false
    },
    {
      content: "You're welcome!",
      isSentByVisitor: true
    }
  ];
  
  
    return (
    <div className='flex-grow flex flex-col-reverse overflow-y-scroll px-2 py-1 gap-1'>
      {messages.map((message, id)=>{
        return <div key={id} className="">
            <p className={`px-3 py-1 block leading-tight rounded-[100px] w-fit max-w-[75%] ${message.isSentByVisitor ? "mr-auto text-left bg-purple-900 text-white" : "bg-purple-300 text-black text-right ml-auto"} `}>
{message.content}
            </p>
        </div>
      })}
    </div>
  )
}

export default Messages
