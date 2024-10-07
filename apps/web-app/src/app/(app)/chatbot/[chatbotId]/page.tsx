import { Separator } from "@radix-ui/react-dropdown-menu";
import prisma from "@repo/db/client";
import { format } from "date-fns";
import EmbeddedCode from "@/components/EmbeddedCode";
import AllVisitors from "@/components/AllVisitors";



const getAllVisitors = async (chatbotId : string)=>{
return await prisma.visitor.findMany({where: {chatbotId : chatbotId}, orderBy: {visitTime: "desc"}})
}

const getChatbotDetails = async(chatbotId : string)=>{
  return await prisma.chatbot.findFirst({where: {id: chatbotId}})
}

const Page = async ({params: {chatbotId}} : {params: {chatbotId : string}}) => {
  
    const result = await getAllVisitors(chatbotId) 
    const chatbot = await getChatbotDetails(chatbotId)
    if(!chatbot || !result) return null;

    const codeString = `<div style="position: fixed; bottom: 15px; right: 15px">
      <widget-web-component theme="lavaLampLounger" website-name="new project" projectid="cm0z4puw900015ns6rnkfsnx0"></widget-web-component>
    </div>
  
    <script src="https://widget.opinify.in/widget.umd.js"></script>`;
  
    return (
    <div className="p-5">
      <h2 className="text-3xl font-bold">
{chatbot?.name}
      </h2>
      <p>
        Creataed at : {format(chatbot?.createdAt, "dd-MM-yyyy")}
      </p>
      <Separator className="bg-white opacity-20 h-[1px] my-5" />
      <EmbeddedCode codeString={codeString} />
      <Separator className="bg-white opacity-20 h-[1px] my-5" />
      <h2 className="text-2xl font-bold">
        All Visitors.
      </h2>
      <p className="opacity-70">
        Total : {result.length}
      </p>
      <div className="flex flex-col gap-3 mt-5">
        {result.length === 0 && "No Visitors found!"}
      <AllVisitors allVisitors={result} />
      </div>
    </div>
  )
}

export default Page
