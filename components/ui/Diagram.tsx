import type { CSSProperties } from 'react';

interface DiagramProps {
  /** Absolute path to the SVG under /public, e.g. "/diagrams/<slug>/<name>.svg". */
  src: string;
  /** Descriptive alt text (the lint requires >= 80 characters). */
  alt: string;
  /** Visible caption shown under the figure. */
  caption: string;
  /** Intrinsic width in px; must equal the SVG viewBox width. Default 800. */
  width?: number;
  /**
   * Intrinsic height in px; must equal the SVG viewBox height. Required: the
   * width+height attribute pair is what reserves the box and keeps the figure
   * CLS-safe, so a Diagram can never render without a height.
   */
  height: number;
  /** Above-the-fold diagram: eager-load and fetchPriority="high". Default false. */
  priority?: boolean;
}

const imgStyle: CSSProperties = { maxWidth: '100%', height: 'auto' };

/**
 * Static SVG diagram in a <figure> with a visible <figcaption>.
 *
 * Deliberately a plain <img> (not next/image): rendering an SVG through
 * next/image needs `dangerouslyAllowSVG`, whereas a plain <img> carrying the
 * intrinsic width/height attributes lets the browser reserve the right box and
 * stay CLS-safe, while `height: auto` keeps it responsive. No overlay, no
 * lightbox.
 */
export default function Diagram({
  src,
  alt,
  caption,
  width = 800,
  height,
  priority = false,
}: DiagramProps) {
  return (
    <figure className="my-8 mx-auto text-center">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        {...(priority ? { fetchPriority: 'high' as const } : {})}
        style={imgStyle}
        className="block mx-auto"
      />
      <figcaption className="mt-2 text-sm text-gray-500">{caption}</figcaption>
    </figure>
  );
}
