import prisma from "@/lib/db";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// in getServerSession() we need to pass this function to get something
export const nextauthOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: 'email', type: 'text', placeholder: '' },
            password: { label: 'password', type: 'password', placeholder: '' },
          },
          async authorize(credentials) {
            
              const user = await prisma.user.findFirst({where: {email: credentials?.email, isVerified: true}})
              if(!user) throw new Error("User doesn't exists!");
              const isPasswordCorrect =  bcrypt.compareSync(credentials?.password || "", user.password);  
              if(isPasswordCorrect) {
                return user;
              }else{
                throw new Error("Incorrect credientials!")
              }
            
          },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      jwt: async ({ user, token }) => {
        console.log("JWT JWT starts here 👿👿👿👿")
        console.log({user, token})
        if (user) {
          token.userId = user.id;
          token.email = user.email;
      }
      return token;
      },
    session: async ({ session, token, user }: any) => {
        if (token) {
            session.user.id = token.userId;
            session.user.email = token.email;
        }
        console.log("SESSION STARTS HERE ❤️❤️❤️❤️")
        console.log({session, token, user})
        return session
    },
    
  },
  pages: {
    signIn: '/login',
  },
  }