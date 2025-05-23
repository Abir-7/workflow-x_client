import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./Redux/services/auth.service";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getCurrentUser();

  const publicPaths = ["/login", "/signup", "/verify"];

  if (!publicPaths.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
