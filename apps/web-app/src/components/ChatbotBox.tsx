"use client"
import { MessageCircleCode } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const ChatbotBox = ({ id, name }: { id: string; name: string }) => {
  const router = useRouter();

  const handleViewClick = (id: string) => {
    router.push(`/chatbot/${id}`);
  };
  const handleDeleteClick = () => {
    console.log("will implement this feature later");
  };

  return (
    <div
      key={id}
      className=" w-full border border-opacity-20 border-white rounded-lg p-4"
    >
      <MessageCircleCode height={50} width={50} className="opacity-60" />
      <p className="text-2xl font-bold block py-3">{name}</p>
      <div className="flex gap-2">
        <Button
          onClick={() => handleViewClick(id)}
          className="py-1 leading-tight bg-[#6e4451] text-white border-white border-opacity-30 hover:bg-gray-500"
          
        >
          View
        </Button>
        <Button
          onClick={() => handleDeleteClick()}
          className="py-1 leading-tight border-white border-opacity-30 hover:bg-gray-500"
          variant={"outline"}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ChatbotBox;
