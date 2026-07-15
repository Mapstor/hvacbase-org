import { ImageResponse } from 'next/og';

export const alt = 'HVAC Base — Data-Driven HVAC Guides & Calculators';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: 'linear-gradient(135deg, #0891B2 0%, #164E63 100%)',
          color: 'white',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 34, fontWeight: 600, opacity: 0.9 }}>
          <span>hvacbase.org</span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          <span>HVAC Base</span>
        </div>
        <div style={{ display: 'flex', fontSize: 32, fontWeight: 500, opacity: 0.9 }}>
          Data-Driven HVAC Guides &amp; Calculators
        </div>
      </div>
    ),
    { ...size }
  );
}
