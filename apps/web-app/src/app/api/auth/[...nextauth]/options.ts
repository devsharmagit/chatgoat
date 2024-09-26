import prisma from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

// in getServerSession() we need to pass this function to get something
export const nextauthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "" },
        password: { label: "password", type: "password", placeholder: "" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          where: { email: credentials?.email, isVerified: true },
        });
        if (!user) return null
        const isPasswordCorrect = bcrypt.compareSync(
          credentials?.password || "",
          user.password
        );
        if (isPasswordCorrect) {
          return user;
        } else {
          return null
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ user, token }: { user: User; token: JWT }) => {
      if (user) {
        token.userId = user.id;
        token.email = user.email;
      }
      return token;
    },
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      if (token && session?.user) {
        session.user.id = token.userId;
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
