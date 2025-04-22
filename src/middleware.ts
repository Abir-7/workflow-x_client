import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("authToken")?.value;

  const publicPaths = ["/login", "/signup", "/verify"];

  if (publicPaths.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (!publicPaths.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
