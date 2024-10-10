import { Send } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  textMessage: z.string().max(300),
});

interface SendMessageProps {
  sendMessage: (textMessage: string) => void;
}

const SendMessage = ({ sendMessage }: SendMessageProps) => {
  const {register, setValue, handleSubmit} = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      textMessage: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.textMessage.length !== 0) {
      sendMessage(values.textMessage);
      setValue("textMessage", "");
    }
  }

  return (
    <div className="px-2 py-2 rounded-b-md flex">
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full gap-2">
        <input type="text" className="flex-grow bg-slate-100 border-b border-black border-opacity-20 outline-none px-2 focus:outline-none rounded-[5px] " {...register("textMessage")} />
        <button type="submit" className="bg-red-500 text-white rounded-full px-[5px] py-[5px]">
        <Send />
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
