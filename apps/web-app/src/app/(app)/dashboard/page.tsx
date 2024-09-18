"use client"
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {chatbotPost} from "@repo/types/chatbot";
import axios from 'axios';
import { signOut } from 'next-auth/react';



function DialogDemo() {

  const [chatbotName, setChatbotName] = useState<string>("my-chatbot")

  const createChatBot = async ()=>{

const {success, data} = chatbotPost.safeParse({name: chatbotName})
if(!success) {
  alert("enter valid username")
  return 
}
const responseData = await axios.post("/api/chatbot", data)
console.log(responseData)

  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='cursor-pointer border-white border-opacity-50 bg-[#A688FA] rounded-xl p-4 h-10 w-full ' variant="outline">
          Create new Chatbot
          </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Create new chatbot
          </DialogTitle>
          
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={chatbotName}
              onChange={(e)=>setChatbotName(e.target.value)}
              className="col-span-3"
            />
          </div>
          
        </div>
        <DialogFooter>
          <Button onClick={createChatBot} type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


const Page = () => {
const [chatBots, setChatBots] = useState([])

const fetchchatBots = async()=>{
  try {
    const data = await axios.get("/api/chatbot")
    console.log(data)
    if(data.status === 200){
      setChatBots(data.data.chatbots.chatbots)
    }
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
fetchchatBots()
}, [])
  
    
  return (
    <div className='max-w-[1300px] w-full border-white m-auto    '>
      
<div className='relative grid grid-cols-4 py-4'>
<DialogDemo />
{chatBots.map(({name, id})=>{
  return <div key={id}>
<p>
  {name}
</p>
  </div>
})}

</div>


<button onClick={()=>{signOut()}}>
  Sign out
</button>

    </div>
  )
}

export default Page
