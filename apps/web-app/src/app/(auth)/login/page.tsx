"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginType } from "@/types/auth";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

const Page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginType) {
    setIsLoading(true)
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    if (result?.error) {
      toast({
        description: result?.error,
        title: "Login Failed !",
        variant: "destructive",
      });
    }
    else{
      toast({
        description: "Successfully loged in!",
        title: "Success !",
        variant: "success",
      });
      router.push("/dashboard")
    }
    setIsLoading(false)
  }

  return (
    <div className="w-full flex justify-center items-center min-h-[600px] h-[90vh]">
      <div className="w-[400px] bg-[#2f2b3a] p-5 rounded-xl border border-white border-opacity-30  ">
        <h1 className="text-center text-white text-2xl font-bold">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="dark:border-white dark:border-opacity-35"
                      type="email"
                      placeholder="example@email.com"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.email && 
                  <FormMessage className="text-red-400" />
                  }
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="dark:border-white dark:border-opacity-35"
                      type="password"
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.password && 
                  <FormMessage className="text-red-400" />
                  }
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="m-auto block rounded-full px-4 bg-[#a688fa] text-black"
            >
              {isLoading ? <Loader className="animate-spin"/> : "Submit"}  
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            dont have an account ?{" "}
            <Link className="underline" href={"/signup"}>
              Signup
            </Link>{" "}
            here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
