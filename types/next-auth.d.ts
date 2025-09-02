// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id : string
            accessToken: string;
            role: string;
            username: string;
            password : string;
        };
    }

    interface User {
        id : string | number;
        token: string;
        role: string;
        username: string;
        password : string;
    }

    interface JWT {
        accessToken: string;
        role: string;
        username: string;
        password : string;
    }
}
