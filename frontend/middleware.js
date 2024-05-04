import {NextResponse} from 'next/server';
import {getAccessToken, getAssessmentStatus} from '@/lib/helpers';

export function middleware (request) {
  const token = getAccessToken ();
  console.log (token);
  if (!token) return NextResponse.redirect (new URL ('/', request.url));
}

export const config = {
  matcher: ['/profile'],
};
