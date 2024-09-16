"use client";
import React from "react";
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
import { signupSchema, SignupType } from "@/types/auth";
import Link from "next/link";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";



const Page = () => {
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<SignupType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },
  });

  async function onSubmit(values: SignupType) {
    try {
   const response = await  axios.post("/api/signup", {email: values.email, password: values.password})
   if(response.status === 200){
    toast({
      title: "Success!",
      description: "Successfully created your account!",
      variant: "success",
    })
    router.push("/verify-email/" + response.data.user.id)
   }
    } catch (error : any) {
      
      toast({
        title: "Failed",
        description: error?.response?.data?.message || "Something went wrong!",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="w-full flex justify-center items-center min-h-[600px] h-[90vh]">
      <div className="w-[400px] bg-[#2f2b3a] p-5 rounded-xl border border-white border-opacity-30  ">
        <h1 className="text-center text-white text-2xl font-bold">
            Sign Up
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="dark:border-white dark:border-opacity-35" type="email" placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400" />
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
                    <Input type="password" className="dark:border-white dark:border-opacity-35" placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input className="dark:border-white dark:border-opacity-35" type="password" placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
                       <Button type="submit" className="m-auto block rounded-full px-4 bg-[#a688fa] text-black">
              Submit
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            already have an account ? <Link className="underline" href={"/login"}> Login</Link> here</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
