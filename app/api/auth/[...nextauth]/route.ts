// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import AxiosInstance from "@/lib/axios";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const res = await AxiosInstance.post("/auth/login", {
                    username: credentials?.username,
                    password: credentials?.password,
                });

                const user = res.data;

                if (!user?.token) return null;

                const profileRes = await AxiosInstance.get("/auth/profile", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                const { id, username } = profileRes.data;

                return {
                    id: id,
                    token: user.token,
                    role: user.role,
                    username,
                    password: credentials?.password ?? ""
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.token;
                token.role = user.role;
                token.username = user.username;
                token.password = user.password
            }
            return token;
        },
        async session({ session, token }) {
            session.user.accessToken = token.accessToken as string;
            session.user.role = token.role as string;
            session.user.username = token.username as string;
            session.user.password = token.password as string
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
