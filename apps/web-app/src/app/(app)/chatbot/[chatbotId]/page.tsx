import prisma from "@repo/db/client"
import Link from "next/link"

const getAllVisitors = async (chatbotId : string)=>{
return await prisma.visitor.findMany({where: {chatbotId : chatbotId}})
}

const Page = async ({params: {chatbotId}} : {params: {chatbotId : string}}) => {
  
    const result = await getAllVisitors(chatbotId) 
  
    return (
    <div>
      <p>
        this is chatbotis -- <br />
        {chatbotId}
      </p>
      <div className="flex flex-col gap-1">
      {result.map(({id, chatbotId, visitTime})=>{
          return <div className="bg-red-300 text-black p-2 rounded-sm" key={id}>
{id} <br /> {visitTime.toDateString()}
<Link href={`/chatbot/${chatbotId}/visitor/${id}`}>
click here to go somewhere </Link>
        </div>
      })}
      </div>
    </div>
  )
}

export default Page
