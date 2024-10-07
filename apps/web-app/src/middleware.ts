import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextApiRequest } from 'next';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/chatbot/:path*',
    '/login',
    '/signup',
    '/',
    '/verify/:path*',
  ],
};

export async function middleware(request: NextRequest) {
  
  const token = await getToken({ req: request as unknown as NextApiRequest });
  const url = request.nextUrl;

  if (
    token &&
    (url.pathname.startsWith('/login') ||
      url.pathname.startsWith('/signup') ||
      url.pathname.startsWith('/verify-email') ||
      url.pathname === '/')
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!token && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
