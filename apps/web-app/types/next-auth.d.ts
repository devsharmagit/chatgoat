
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // add this line
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string; // add this line
  }
}
