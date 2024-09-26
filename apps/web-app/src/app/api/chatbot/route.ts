import prisma from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";
import   { getServerSession }  from 'next-auth/next'
import { nextauthOptions } from "../auth/[...nextauth]/options";
import {chatbotPost} from "@repo/types/chatbot";

export const POST = async(req: NextRequest)=>{
    try {
    const session = await getServerSession(nextauthOptions)
    if(!session){
        return NextResponse.json({message: "Unauthorized"}, {status: 401})
    }
    if(session.user){
        console.log("session ke ander user hai")
        console.log(session.user)
    }else{
        console.log("session ke ander user nhi hai")
    }
    const {data, success} =  chatbotPost.safeParse( await req.json())

    if(!success) return NextResponse.json({message: "invalid data"}, {status: 400})

     const newChatBot = await prisma.chatbot.create({
        data: {
            name: data.name,
            userId: session.user.id
        }
     })   

     return NextResponse.json({
        message: "successfully created chatbot",
        chatbot: newChatBot
     }, {status: 201})


    
} catch (error) {
    console.log(error)
    return NextResponse.json(
        {
          message: "something went wrong server side",
        },
        { status: 500 }
      );   
}
}

export const GET = async()=>{

    try {
        const session = await getServerSession(nextauthOptions)
        if(!session) return NextResponse.json({message: "unauthorized"}, {status: 400})
        const allChatBots =await prisma.user.findUnique({where: {id: session.user.id}, include:{
    chatbots: true}})

    return NextResponse.json({
        chatbots: allChatBots,
        message: "successfully got all chatbots",
    })

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
              message: "something went wrong server side",
            },
            { status: 500 }
          );   
    }
} 

