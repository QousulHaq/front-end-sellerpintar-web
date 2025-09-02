// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import authMiddleware from "./middleware/auth";
import roleMiddleware from "./middleware/role";

export async function middleware(req: NextRequest) {

    const authResult = await authMiddleware(req);
    if (authResult) return authResult;

    const roleResult = await roleMiddleware(req);
    if (roleResult) return roleResult;

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
