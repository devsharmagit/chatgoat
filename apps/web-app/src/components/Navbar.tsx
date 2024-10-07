"use client";
import React from "react";
import { ThemeToggler } from "@/components/ThemeToggler";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { GithubIcon, TwitterIcon } from "./icons";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const session = useSession();
  const handleClick = () => {
    if (session.status === "authenticated") {
      signOut();
    } else if (session.status === "unauthenticated") {
      signIn("credentials");
    }
  };

  return (
    <>
      <div className="py-3 px-4 max-w-7xl m-auto flex justify-between items-center">
        <Link href={"/"}>
          <h1 className="dark:text-white font-semibold text-2xl ">ChatGoat</h1>
        </Link>
        <div className="flex gap-3 items-center">
          <Button variant={"outline"} onClick={handleClick}>
            {session.status === "authenticated" ? "Sign-Out" : "Sign-In"}
          </Button>
          <ThemeToggler />
          <Link href={"https://x.com/CodeDevsharma"} target="_blank">
            <TwitterIcon />
          </Link>
          <Link href={"https://github.com/devsharmagit"} target="_blank">
            <GithubIcon />
          </Link>
        </div>
      </div>
      <Separator className="h-[1px] bg-white opacity-30" />
    </>
  );
};

export default Navbar;
