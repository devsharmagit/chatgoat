"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import useSocket from "@/hooks/useSocket";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator"
import { Send } from "lucide-react";



const formSchema = z.object({
  textMessage: z.string().max(300),
});

const ChatPage = ({
  params: { chatbotId, visitorId },
}: {
  params: { chatbotId: string; visitorId: string };
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      textMessage: "",
    },
  });

  const { messages, sendMessage } = useSocket(chatbotId, visitorId);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.textMessage.length !== 0) {
      sendMessage(values.textMessage);
      form.setValue("textMessage", "");
    }
  }

  return (
    <div className="max-w-xl m-auto flex flex-col h-[90vh]">
      
      <div className="flex-grow flex flex-col-reverse overflow-y-auto no-scrollbar">
        <div className="flex flex-col-reverse gap-1 p-4">
          {messages.map(({ content, isSentByVisitor }, index) => (
            <p className={`block leading-tight max-w-[70%] w-fit  px-4 py-1 pb-[5px] rounded-[20px] ${isSentByVisitor ? "bg-[#6e4451] mr-auto text-left" : "bg-[#2f2c32] ml-auto text-right"}`} key={index}>{content}</p>
          ))}
        </div>
      </div>

      <Separator className=" bg-white opacity-30" />

      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" flex gap-2 items-center">
            <FormField
              control={form.control}
              name="textMessage"
              render={({ field }) => (
                <FormItem className="w-full"> 
                  <FormControl >
                    <Input placeholder="message here..." {...field} className="w-full border-white border-opacity-50" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-[#a481ff] rounded-md h-9 w-9 p-0 text-white">      
<Send className="w-6 h-6" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChatPage;
