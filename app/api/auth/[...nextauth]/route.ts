import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials) {
                return null;
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        })
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development"
} satisfies NextAuthOptions;

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
