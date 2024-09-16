"use client";
import React, { useState } from 'react';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
 
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from '@/components/ui/button';
import { redirect, useParams } from 'next/navigation';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

const PAGE   = () => {
  
  const {userId} = useParams();
  const [verifyCode, setVerifyCode] = useState<string>("")

  const {toast} = useToast()
  
  if(!userId){
    return redirect("/login")
  }

  const handleClick = async ()=>{
    try {
      const response = await axios.post(`/api/verify-email`, {verifyCode, userId} )
      if(response.status === 200){
        toast({
          title: "Success!",
          description: "Email verified successfully!",
          variant: "success"
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full flex justify-center items-center min-h-[600px] h-[90vh]">
      <div className="w-[400px] bg-[#2f2b3a] p-5 rounded-xl border border-white border-opacity-30  ">
        <h1 className="text-center text-white text-2xl font-bold">
            Verify your email.
        </h1>
        <p className='text-center pt-3 text-sm opacity-80'>
          Check your email, you may have recieved a 6 digits otp code.
        </p>
        <div className='pt-4 flex justify-center'>
        <InputOTP
         onChange={(value)=>setVerifyCode(value)}
         maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} className='border-white'>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
        </div>
    <Button onClick={handleClick} type="submit" className="m-auto mt-4 block rounded-full px-4 bg-[#a688fa] text-black">
              Submit
    </Button>
      </div>
    </div>
  )
}

export default PAGE 
