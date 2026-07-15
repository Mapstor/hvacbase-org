import { ImageResponse } from 'next/og';
import { getArticleBySlug, getAllSlugs } from '@/lib/content';

export const alt = 'HVAC Base article';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function OGImage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  const title = article?.meta.title ?? 'HVAC Base';

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
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </div>
        <div style={{ display: 'flex', fontSize: 28, fontWeight: 500, opacity: 0.85 }}>
          Data-Driven HVAC Guides &amp; Calculators
        </div>
      </div>
    ),
    { ...size }
  );
}
