'use client';

// Footer link that reopens the consent banner for any visitor.
export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('hvac:open-consent'))}
      className="hover:text-white transition-colors"
    >
      Cookie settings
    </button>
  );
}
