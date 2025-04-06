import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { AuthOptions } from "next-auth"

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // This is where you would typically verify against your database
        // For demo purposes, we'll use a simple check
        if (credentials?.email === "demo@example.com" && credentials?.password === "password") {
          return {
            id: "1",
            name: "Demo User",
            email: "demo@example.com",
            role: "user"
          }
        }
        
        // Artist demo account
        if (credentials?.email === "artist@example.com" && credentials?.password === "password") {
          return {
            id: "2",
            name: "Demo Artist",
            email: "artist@example.com",
            role: "artist"
          }
        }
        
        // Promoter demo account
        if (credentials?.email === "promoter@example.com" && credentials?.password === "password") {
          return {
            id: "3",
            name: "Demo Promoter",
            email: "promoter@example.com",
            role: "promoter"
          }
        }
        
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login',
  },
  session: {
    strategy: "jwt",
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }