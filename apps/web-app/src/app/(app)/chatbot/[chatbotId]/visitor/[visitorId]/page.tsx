"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import useSocket from "@/hooks/useSocket";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
 

const formSchema = z.object({
  textMessage: z.string().max(300),
})


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
  })
  
  const { messages, sendMessage } = useSocket(chatbotId, visitorId); 
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.textMessage.length !== 0) {
      sendMessage(values.textMessage); 
      form.setValue("textMessage", "")
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-1">
        {messages.map(({ content }, index) => (
          <p key={index}>{content}</p>
        ))}
      </div>
      <div className="flex flex-col">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="textMessage"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="message here..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
      </div>
    </div>
  );
};

export default ChatPage;
