// middleware/auth.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function authMiddleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (req.nextUrl.pathname !== "/login" && req.nextUrl.pathname !== "/register") {
        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return null; // Lolos, lanjut ke middleware berikutnya
}
