import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Send } from 'lucide-react'


const SendMessage = () => {
    const [text, setText] = useState<string>("")
  return (
    <div className='px-2 py-2 rounded-b-md  flex gap-1 items-center'> 
    <Input value={text} onChange={(e)=>setText(e.target.value)} className='h-[30px]'/>
    <Button className='h-[30px] w-[30px] rounded-md flex justify-center items-center p-0 bg-purple-900 text-white' >
<Send width={20} height={20}/>
    </Button>
    </div>
  )
}

export default SendMessage
