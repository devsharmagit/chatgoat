import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { format } from "date-fns";

interface AllVisitorsProps {
  allVisitors: {
    id: string;
    chatbotId: string;
    visitTime: Date;
  }[];
}

const AllVisitors = ({ allVisitors }: AllVisitorsProps) => {
  return (
    <>
      {allVisitors.map(({ id, chatbotId, visitTime }) => {
        return (
          <div
            className=" flex gap-2 items-center justify-between border border-white p-3 border-opacity-30 rounded-lg "
            key={id}
          >
            <div className="flex gap-4 items-center">
              <Avatar className="bg-[#6e4451]">
                <AvatarFallback className="bg-[#6e4451]"> Vi </AvatarFallback>
              </Avatar>
              <div className="opacity-50">
                <p>Id : {id}</p>
                <p>Visit Time: {format(visitTime, "dd MMM yyyy kk:mm")}</p>
              </div>
            </div>
            <Link
              href={`/chatbot/${chatbotId}/visitor/${id}`}
              className="bg-[#3d3a40] px-3 py-1 rounded-md h-fit border border-white border-opacity-20 hover:bg-[#6e4451] transition-all"
            >
              Open
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default AllVisitors;
