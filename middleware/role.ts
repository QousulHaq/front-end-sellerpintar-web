// middleware/role.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function roleMiddleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const pathname = req.nextUrl.pathname;

    if (!token?.role) return null;

    if (pathname === "/login" || pathname === "/register") {
        if (token.role === "Admin") {
            return NextResponse.redirect(new URL("/admin/articles", req.url));
        } else if (token.role === "User") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    if (pathname.includes("/detail-content") || pathname.includes("/preview")) {
        return NextResponse.next();
    }

    // Role-based restrictions
    if (pathname.startsWith("/admin") && token.role !== "Admin") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (!pathname.startsWith("/admin") && token.role !== "User") {
        return NextResponse.redirect(new URL("/admin/articles", req.url));
    }

    return null;
}
