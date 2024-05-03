import { NextResponse } from "next/server";
import { getAccessToken, getAssessmentStatus } from "@/lib/utils/utils";


export function middleware(request) {
  const token = getAccessToken();
  const assessmentStatus = getAssessmentStatus();
  if (
    !token ||
    (request.nextUrl.pathname.startsWith("/assessment") && assessmentStatus)
  )
    return NextResponse.redirect(new URL("/", request.url));
}


export const config = {
  matcher: ["/profile/:path*", "/assessment", "/books/:path*"],
};
