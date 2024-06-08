import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    if (request.nextUrl.pathname === "/") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/authenticate", request.url));
  } else if (
    token.role === "seller" &&
    !request.nextUrl.pathname.startsWith("/seller")
  ) {
    if (request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL(`/${token.role}`, request.url));
    }
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  } else if (
    token.role === "buyer" &&
    !request.nextUrl.pathname.startsWith("/buyer")
  ) {
    if (request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL(`/${token.role}`, request.url));
    }
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|unauthorized|authenticate).*)",
  ],
};
