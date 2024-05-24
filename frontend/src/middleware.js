import { getAccessToken } from '@/lib/helpers'
import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request ) {
  const acessToken = getAccessToken();
  if(!acessToken){
    return NextResponse.redirect(new URL('/', request.url))
  } 
  const { pathname } = request.nextUrl
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/settings/:path*', '/books', '/home'],
}