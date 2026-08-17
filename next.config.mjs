import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XDN-Robots-Tag', value: 'index,follow' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/mini-split-in-cold-climates',
        destination: '/heat-pump-in-cold-weather',
        permanent: true,
      },
      {
        source: '/best-2-zone-mini-split',
        destination: '/best-multi-zone-mini-splits',
        permanent: true,
      },
      {
        source: '/best-3-zone-mini-split',
        destination: '/best-multi-zone-mini-splits',
        permanent: true,
      },
      {
        source: '/best-4-zone-mini-split',
        destination: '/best-multi-zone-mini-splits',
        permanent: true,
      },
      {
        source: '/best-5-zone-mini-split',
        destination: '/best-multi-zone-mini-splits',
        permanent: true,
      },
      // ============ Archived product pages (2026-08-17) ============
      // 70 pages moved to content/_archived-product-pages/ because they contained
      // specific-SKU spec tables (fabrication risk after multiple 2025-2026 recalls).
      // Each old URL redirects to the most topically adjacent surviving page
      // (calculator, guide, explainer, or how-to). See _archived-product-pages/README.md
      // for rollback path. Note: /best-multi-zone-mini-splits is now archived too, so
      // the 4 zone-count redirects above resolve through this block's mini-split
      // sizing calculator target.
      { source: '/14-3-seer2-vs-16-seer', destination: '/seer2-comparison-calculator', permanent: true },
      { source: '/15-2-seer2-vs-16-seer', destination: '/seer2-comparison-calculator', permanent: true },
      { source: '/16-seer-vs-14-seer', destination: '/seer2-comparison-calculator', permanent: true },
      { source: '/16-seer-vs-20-seer', destination: '/seer2-savings-calculator', permanent: true },
      { source: '/best-10000-btu-air-conditioners', destination: '/air-conditioner-btu-calculator', permanent: true },
      { source: '/best-12000-btu-air-conditioners', destination: '/air-conditioner-btu-calculator', permanent: true },
      { source: '/best-air-curtains', destination: '/air-changes-per-hour-calculator', permanent: true },
      { source: '/best-air-purifier-humidifier-combo', destination: '/air-purifier-guide', permanent: true },
      { source: '/best-air-purifiers', destination: '/air-purifier-sizing-guide', permanent: true },
      { source: '/best-air-purifiers-for-allergies', destination: '/air-purifier-guide', permanent: true },
      { source: '/best-air-purifiers-for-dust', destination: '/air-purifier-sizing-guide', permanent: true },
      { source: '/best-air-purifiers-for-mold', destination: '/how-to-identify-mold', permanent: true },
      { source: '/best-air-purifiers-for-smoke', destination: '/air-changes-per-hour-calculator', permanent: true },
      { source: '/best-air-scrubbers', destination: '/air-changes-per-hour-calculator', permanent: true },
      { source: '/best-baseboard-heaters', destination: '/heating-cost-calculator', permanent: true },
      { source: '/best-basement-dehumidifiers', destination: '/dehumidifier-guide', permanent: true },
      { source: '/best-bedroom-air-purifiers', destination: '/air-purifier-sizing-guide', permanent: true },
      { source: '/best-central-ac-brands', destination: '/ac-tonnage-calculator', permanent: true },
      { source: '/best-cold-climate-heat-pumps', destination: '/heat-pump-size-calculator', permanent: true },
      { source: '/best-commercial-dehumidifiers', destination: '/dehumidifier-guide', permanent: true },
      { source: '/best-dehumidifier-air-purifier-combo', destination: '/dehumidifier-guide', permanent: true },
      { source: '/best-diy-mini-splits', destination: '/mini-split-sizing-calculator', permanent: true },
      { source: '/best-dual-hose-portable-acs', destination: '/how-to-vent-portable-ac-without-window', permanent: true },
      { source: '/best-electric-fireplaces', destination: '/heating-cost-calculator', permanent: true },
      { source: '/best-electric-tankless-water-heaters', destination: '/water-heater-sizing-calculator', permanent: true },
      { source: '/best-energy-efficient-space-heaters', destination: '/heating-cost-calculator', permanent: true },
      { source: '/best-evaporative-coolers', destination: '/air-conditioner-btu-calculator', permanent: true },
      { source: '/best-garage-heaters', destination: '/heating-cost-calculator', permanent: true },
      { source: '/best-gas-furnace-brands', destination: '/furnace-guide', permanent: true },
      { source: '/best-hepa-air-purifiers', destination: '/hepa-filter-explained', permanent: true },
      { source: '/best-humidifiers-for-bedroom', destination: '/dehumidifier-guide', permanent: true },
      { source: '/best-humidifiers-for-large-rooms', destination: '/dehumidifier-guide', permanent: true },
      { source: '/best-hvac-air-filters', destination: '/merv-rating-chart', permanent: true },
      { source: '/best-hvac-brands-ranked', destination: '/furnace-guide', permanent: true },
      { source: '/best-indoor-air-quality-monitors', destination: '/how-to-improve-indoor-air-quality', permanent: true },
      { source: '/best-infrared-heaters', destination: '/heating-cost-calculator', permanent: true },
      { source: '/best-large-room-air-purifiers', destination: '/air-changes-per-hour-calculator', permanent: true },
      { source: '/best-mini-split-ac-units', destination: '/mini-split-sizing-calculator', permanent: true },
      { source: '/best-mini-split-for-garage', destination: '/mini-split-sizing-calculator', permanent: true },
      { source: '/best-mini-split-heat-pumps', destination: '/mini-split-sizing-calculator', permanent: true },
      { source: '/best-multi-zone-mini-splits', destination: '/mini-split-sizing-calculator', permanent: true },
      { source: '/best-oil-furnace', destination: '/furnace-guide', permanent: true },
      { source: '/best-pellet-stoves', destination: '/heating-cost-calculator', permanent: true },
      { source: '/best-portable-ac-for-apartment', destination: '/air-conditioner-btu-calculator', permanent: true },
      { source: '/best-portable-ac-heater-combos', destination: '/air-conditioner-btu-calculator', permanent: true },
      { source: '/best-portable-air-conditioners', destination: '/air-conditioner-btu-calculator', permanent: true },
      { source: '/best-portable-generators', destination: '/what-size-generator-for-fridge', permanent: true },
      { source: '/best-small-dehumidifiers', destination: '/dehumidifier-guide', permanent: true },
      { source: '/best-small-heaters', destination: '/heating-cost-calculator', permanent: true },
      { source: '/best-smart-thermostats', destination: '/programmable-vs-smart-thermostat', permanent: true },
      { source: '/best-space-heaters-for-large-rooms', destination: '/heating-cost-calculator', permanent: true },
      { source: '/best-tankless-gas-water-heaters', destination: '/water-heater-sizing-calculator', permanent: true },
      { source: '/best-tankless-water-heaters', destination: '/water-heater-sizing-calculator', permanent: true },
      { source: '/best-thermostat-for-heat-pump', destination: '/programmable-vs-smart-thermostat', permanent: true },
      { source: '/best-tower-fans', destination: '/kwh-cost-calculator', permanent: true },
      { source: '/best-ventless-propane-heaters', destination: '/heating-cost-calculator', permanent: true },
      { source: '/best-wall-mount-electric-fireplaces', destination: '/heating-cost-calculator', permanent: true },
      { source: '/best-water-heaters', destination: '/water-heater-sizing-calculator', permanent: true },
      { source: '/best-whole-house-dehumidifiers', destination: '/dehumidifier-guide', permanent: true },
      { source: '/best-whole-house-generators', destination: '/what-size-generator-for-fridge', permanent: true },
      { source: '/best-window-air-conditioners', destination: '/air-conditioner-btu-calculator', permanent: true },
      { source: '/daikin-mini-split-reviews', destination: '/mini-split-sizing-calculator', permanent: true },
      { source: '/dyson-vs-levoit-vs-coway', destination: '/air-purifier-guide', permanent: true },
      { source: '/electric-vs-gas-tankless', destination: '/water-heater-sizing-calculator', permanent: true },
      { source: '/generator-vs-solar-battery-backup', destination: '/home-battery-backup-guide', permanent: true },
      { source: '/heat-pump-vs-mini-split', destination: '/heat-pump-guide', permanent: true },
      { source: '/mrcool-3rd-gen-vs-4th-gen', destination: '/mini-split-sizing-calculator', permanent: true },
      { source: '/nest-vs-ecobee-vs-honeywell', destination: '/programmable-vs-smart-thermostat', permanent: true },
      { source: '/senville-mini-split-reviews', destination: '/mini-split-air-conditioners', permanent: true },
      { source: '/trane-vs-carrier', destination: '/furnace-guide', permanent: true },
      // ============ end archived product pages ============
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
  },
});

export default withMDX(nextConfig);
