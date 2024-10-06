import prisma from "@repo/db/client";

export const getMessages = async ({chatbotId , visitorId}:{chatbotId : string, visitorId : string})=>{
    const messages = await prisma.message.findMany({
        where: { chatbotId , visitorId },
        take: 50,
        orderBy: {
          createdAt: "desc",
        },
      });
      return messages
}