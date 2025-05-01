
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.password) {
          throw new Error("User not found")
        }

        const isValid = await bcrypt.compare(credentials.password, user.password)

        if (!isValid) {
          throw new Error("Invalid password")
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      }
    }),
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login",
    signUp: "/signup",
    error: "/login",
  },
})

export { handler as GET, handler as POST }
