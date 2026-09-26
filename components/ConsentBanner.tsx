'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : null;
}
function setConsentCookie(value: 'granted' | 'denied') {
  document.cookie = `hvac_consent=${value};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
}
declare global {
  interface Window { gtag?: (...args: any[]) => void; }
}

export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const evaluate = () => {
      const region = getCookie('hvac_region');
      const choice = getCookie('hvac_consent');
      // Show only to EEA/UK/CH visitors who haven't chosen yet.
      setShow(region === 'eea' && !choice);
    };
    evaluate();
    const reopen = () => setShow(true);
    window.addEventListener('hvac:open-consent', reopen);
    return () => window.removeEventListener('hvac:open-consent', reopen);
  }, []);

  const accept = () => {
    window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    setConsentCookie('granted');
    setShow(false);
  };
  const reject = () => {
    window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
    setConsentCookie('denied');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Analytics consent"
      className="fixed inset-x-0 bottom-0 z-50 bg-gray-900 text-white border-t border-gray-700 shadow-lg"
    >
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
        <p className="text-sm text-gray-200 flex-1">
          We use Google Analytics to understand how the site is used; you can accept or reject it.{' '}
          <Link href="/privacy" className="underline hover:text-white">Privacy policy</Link>.
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={reject}
            className="px-4 py-2 rounded-md border border-gray-500 text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
          >
            Reject
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 rounded-md border border-gray-500 bg-white text-gray-900 text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
