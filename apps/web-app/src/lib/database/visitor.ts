import prisma from "@repo/db/client"

export const getVisitorDetails = async(visitorId : string)=>{
const visitor  = await prisma.visitor.findFirst({where: {id: visitorId}, include: {chatbot: true}})
return visitor
}