// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"
import { AuthOptions } from "next-auth"

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const demoUsers = [
          {
            id: "1",
            name: "Demo User",
            email: "demo@example.com",
            password: "password",
            role: "user",
          },
          {
            id: "2",
            name: "Demo Artist",
            email: "artist@example.com",
            password: "password",
            role: "artist",
          },
          {
            id: "3",
            name: "Demo Promoter",
            email: "promoter@example.com",
            password: "password",
            role: "promoter",
          },
        ];

        const user = demoUsers.find(
          u => u.email === credentials?.email && u.password === credentials?.password
        );

        if (user) {
          // omitimos la contraseña para mayor seguridad
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.role = token.role;
      return session;
    },
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
