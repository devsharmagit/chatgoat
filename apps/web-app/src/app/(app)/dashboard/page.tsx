import { CreateChatBotDialog } from "@/components/ChatBotCreate";
import { getAllChatbots } from "@/lib/database/chatbot";

const Page = async () => {
  const result = await getAllChatbots();

  return (
    <div className="max-w-[1300px] w-full border-white m-auto    ">
      <div className="relative grid grid-cols-4 py-4 gap-4">
        <CreateChatBotDialog />
        {result &&
          result.map((chatbot) => {
            return <div key={chatbot.id}> {chatbot.name} </div>;
          })}
      </div>
    </div>
  );
};

export default Page;
