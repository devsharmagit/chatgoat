import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

const formSchema = z.object({
  textMessage: z.string().max(300),
});

interface SendMessageProps {
  sendMessage: (textMessage: string) => void;
}

const SendMessage = ({ sendMessage }: SendMessageProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      textMessage: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.textMessage.length !== 0) {
      sendMessage(values.textMessage);
      form.setValue("textMessage", "");
    }
  }

  return (
    <div className="px-2 py-2 rounded-b-md flex">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-1 items-center flex-grow"
        >
          <FormField
            control={form.control}
            name="textMessage"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl className="">
                  <Input placeholder="enter message here..." {...field} className="w-full" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={"destructive"}
            className="h-[35px] w-[35px] rounded-md flex justify-center items-center p-1 text-white"
          >
            <Send width={25} height={25} />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SendMessage;
