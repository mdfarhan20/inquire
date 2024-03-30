import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password)
                    return null;
                    
                const user = await prisma.user.findUnique({ where: {
                    email: credentials.email
                }});

                if (user && await compare(credentials.password, user.password)) {
                    return user;
                }

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
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
    callbacks: {
        session: async ({ session }) => {
            const user = await prisma.user.findUnique({
                where: { email: session.user?.email }
            });

            return {
                ...session,
                userId: user.id
            };
        },
    },
} satisfies NextAuthOptions;