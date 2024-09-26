"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createChatbot } from "@/lib/database/chatbot";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, "Name is too short.").max(30, "Name is too long."),
});

export function CreateChatBotDialog() {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const {toast} = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
     const value = await createChatbot({name: values.name})
     console.log(value)
     if(value) {
       toast({variant: "success", title: "Success", description: "Successfully created the chatbot"})
      }
    } catch (error) {
      toast({variant: "destructive", title: "Error", description: "Something went wrong!"})
    }finally{
      setIsOpen(false)
    }
    
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer border-white border-opacity-50 bg-[#A688FA] rounded-xl p-4 h-10 w-full "
          variant="outline"
        >
          Create new Chatbot
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new chatbot</DialogTitle>
        </DialogHeader>
        
          
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>
                       Enter name of your chatbot
                      </FormDescription>
                      {form.formState.errors.name && 
                      <FormMessage />
                      }
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          
        
        
      </DialogContent>
    </Dialog>
  );
}
