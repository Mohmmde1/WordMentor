import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/utils";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const token = getAccessToken();
  if (!token) return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/profile/:path*",
};
