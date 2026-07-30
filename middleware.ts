import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ['en', 'gu', 'hi'];
const defaultLocale = 'gu';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // જો URL માં ભાષા ના હોય, તો ડિફોલ્ટ English (en) પર મોકલી દો
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // ભાષા વગરની લિંકને ભાષા વાળી લિંકમાં બદલો (દા.ત. /news -> /en/news)
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // અહીં મેં 'admin' ઉમેર્યું છે, જેથી એડમિન પેનલ પર ભાષાની અસર ના થાય
    '/((?!api|_next/static|_next/image|favicon.ico|mihirsync-logo.png|admin|.*\\..*).*)'
  ],
};