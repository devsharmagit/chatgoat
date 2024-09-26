"use server"
import { nextauthOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";


export const createChatbot = async ({ name }: { name: string }) => {
  try {
    const session = await getServerSession(nextauthOptions);
    if (!session) throw Error("Unauthorized");
    const chatbot = await prisma.chatbot.create({
      data: {
        name: name,
        userId: session.user.id,
      },
    });
    if (chatbot) {
      revalidatePath("/dashboard")
      return chatbot;
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
};

export const getAllChatbots = async ()=>{
  try {
    const session = await getServerSession(nextauthOptions);
    if (!session) throw Error("Unauthorized");
    const chatbots = await prisma.chatbot.findMany({where: {userId: session.user.id}})
    return chatbots
  } catch (error) {
   return null 
  }
}
