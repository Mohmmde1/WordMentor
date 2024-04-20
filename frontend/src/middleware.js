import { NextResponse } from "next/server";
import { getAccessToken, getAssessmentStatus } from "@/lib/utils/utils";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const token = getAccessToken();
  const assessmentStatus = JSON.parse(getAssessmentStatus());
  console.log(assessmentStatus);
  if (
    !token ||
    (request.nextUrl.pathname.startsWith("/assessment") && assessmentStatus)
  )
    return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile/:path*", "/assessment"],
};
