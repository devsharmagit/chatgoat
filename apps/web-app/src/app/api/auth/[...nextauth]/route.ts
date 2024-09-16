import NextAuth from "next-auth"

import { nextauthOptions } from "./options";

const handler = NextAuth(nextauthOptions)

export { handler as GET, handler as POST }