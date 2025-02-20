import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const prisma = new PrismaClient();

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error('GitHub OAuth credentials are required');
}

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  debug: true,
  logger: {
    error: (code, metadata) => {
      console.error('NEXTAUTH_ERROR:', code, metadata);
    },
    warn: (code) => {
      console.warn('NEXTAUTH_WARN:', code);
    },
    debug: (code, metadata) => {
      console.log('NEXTAUTH_DEBUG:', code, metadata);
    },
  },
});

export { handler as GET, handler as POST }; 