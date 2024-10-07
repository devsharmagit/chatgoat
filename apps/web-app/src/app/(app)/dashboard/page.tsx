import ChatbotBox from "@/components/ChatbotBox";
import { CreateChatBotDialog } from "@/components/ChatBotCreate";
import { getAllChatbots } from "@/lib/database/chatbot";



const Page = async () => {
  const result = await getAllChatbots();

  return (
    <div className="max-w-[1300px] w-full border-white m-auto p-4    ">
      <h2 className="text-3xl font-bold ">
        All Chatbots
      </h2>
      <p className="opacity-75">
        Total chatbots : {result?.length}
      </p>
      <div className="w-full flex pt-5">
        <CreateChatBotDialog />
      </div>
      <div className="relative grid grid-cols-4 py-4 gap-4">
        {result &&
          result.map((chatbot) => {
            return <ChatbotBox id={chatbot.id} name={chatbot.name} key={chatbot.id} />
          })}
      </div>
    </div>
  );
};

export default Page;
