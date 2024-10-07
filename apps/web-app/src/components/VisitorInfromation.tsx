import { getVisitorDetails } from '@/lib/database/visitor';
import React from 'react';
import {formatRelative} from "date-fns";
import { Separator } from '@radix-ui/react-dropdown-menu';

const VisitorInfromation = async({visitorId}: {visitorId: string}) => {

    const visitor = await getVisitorDetails(visitorId)
    if(!visitor){
        return null
    }

  return (
    <div className='mt-5 p-5 border-white h-fit border rounded-3xl border-opacity-30'>
        <h2 className='text-2xl font-bold'> Visitor Information </h2>
        <Separator className='h-[1px] bg-white opacity-30 mt-3 mb-4' />
      <p> Visitor Id : {visitor.id}  </p> 
      <p> ChatBot Name :  {visitor.chatbot.name} </p> 
     <p> First Visit Time : {formatRelative( visitor.visitTime, Date.now())} </p> 
    </div>
  )
}

export default VisitorInfromation
