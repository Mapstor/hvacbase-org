import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// EEA (EU-27 + Iceland/Liechtenstein/Norway) + United Kingdom + Switzerland.
// These are the regions where GA4 analytics_storage defaults to denied and the
// consent banner is shown. Vercel's edge sets x-vercel-ip-country on every request.
const EEA_UK_CH = new Set([
  'AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT',
  'LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE', // EU-27
  'IS','LI','NO', // EEA
  'GB', // United Kingdom
  'CH', // Switzerland
]);

export function middleware(req: NextRequest) {
  const country = (req.headers.get('x-vercel-ip-country') || '').toUpperCase();
  const region = EEA_UK_CH.has(country) ? 'eea' : 'other';
  const res = NextResponse.next();
  // First-party, non-HttpOnly so the client consent banner can read it. The
  // region-scoped gtag consent default applies regardless; this only controls
  // whether the banner is shown.
  res.cookies.set('hvac_region', region, { path: '/', maxAge: 60 * 60 * 24 * 30, sameSite: 'lax' });
  return res;
}

export const config = {
  // Run on pages, not on static assets or files with extensions.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)'],
};
