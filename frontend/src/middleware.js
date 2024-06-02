import { getAccessToken } from '@/lib/helpers'
import { NextResponse } from 'next/server'

// Middleware function to handle redirection based on user authentication status
export function middleware(request) {
  const accessToken = getAccessToken(request);

  // Get the pathname from the request URL
  const { pathname } = request.nextUrl;
  console.log('Pathname:', pathname);
  // If no access token is found and the user is not already on the home page, redirect to the home page
  if (!accessToken) {
    if (pathname !== '/') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // If the user is logged in and the pathname is '/', redirect to '/dashboard'
  if (accessToken && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configure middleware to match specific paths
export const config = {
  matcher: ['/', '/settings/:path*', '/books', '/home'],
};
