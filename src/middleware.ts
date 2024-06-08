import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("acess-token");

  if (token) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
