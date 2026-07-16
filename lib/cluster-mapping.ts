// Map cluster names (from MDX frontmatter) to actual existing route directories.
// Every cluster in content/**/*.mdx must map to a route that renders a hub — else
// the article gets breadcrumbs like "Home > Articles > [Title]" instead of the
// correct topical hub name.
export function getClusterRoute(cluster: string): string {
  const clusterMap: Record<string, string> = {
    // Air conditioning clusters
    'ac-sizing-selection': 'air-conditioning',
    'air-conditioners': 'air-conditioning',
    'central-air-hvac-systems': 'air-conditioning',
    'mini-split-air-conditioners': 'air-conditioning',
    'portable-air-conditioners': 'air-conditioning',
    'window-air-conditioners': 'air-conditioning',
    'evaporative-coolers-fans': 'air-conditioning',

    // Heating clusters
    'furnaces-heating': 'heating',
    'space-heaters': 'heating',
    'space-heaters-portable-heating': 'heating',
    'tankless-water-heaters': 'heating',
    'water-heaters': 'heating',
    'fireplaces-stoves': 'heating',

    // Energy efficiency clusters
    'energy-efficiency-ratings': 'energy-efficiency',
    'insulation': 'energy-efficiency',
    'smart-thermostats': 'energy-efficiency',
    'smart-home-thermostats': 'energy-efficiency',
    'seer-comparisons': 'energy-efficiency',
    'batteries-solar': 'energy-efficiency',

    // Air quality clusters
    'air-quality': 'air-quality',
    'air-purifier-brands': 'air-quality',
    'air-purifiers-air-quality': 'air-quality',
    'dehumidifiers': 'air-quality',
    'dehumidifiers-humidity': 'air-quality',
    'mold-prevention': 'air-quality',
    'mold-moisture-control': 'air-quality',
    'indoor-air-quality': 'air-quality',

    // Cost / troubleshooting / how-to clusters
    'energy-costs': 'cost-guides',
    'hvac-costs-location': 'cost-guides',
    'hvac-maintenance': 'how-to',
    'electrical': 'how-to',
    'electrical-wiring': 'how-to',
    'ductwork': 'how-to',
    'ductwork-ventilation': 'how-to',
    'refrigerants': 'troubleshooting',
    'hvac-noise': 'troubleshooting',

    // Brand / info clusters
    'hvac-brands': 'brand-reviews',
    'tax-credits': 'articles',
    'generators': 'articles',
  };

  const normalizedCluster = cluster.toLowerCase().replace(/\s+/g, '-');

  // Check if it's already a valid route
  const validRoutes = [
    'air-conditioning',
    'heating',
    'heat-pumps',
    'energy-efficiency',
    'air-quality',
    'articles',
    'brand-reviews',
    'buying-guides',
    'cost-guides',
    'how-to',
    'troubleshooting',
    'hvac-dictionary',
  ];

  if (validRoutes.includes(normalizedCluster)) {
    return normalizedCluster;
  }

  return clusterMap[normalizedCluster] || 'articles';
}

// Display name for each hub route — used to render the second-level breadcrumb.
// Replaces the previous auto-titlecase logic which produced awkward labels for
// multi-word routes and couldn't distinguish "How-To" from "How To".
export const routeDisplayName: Record<string, string> = {
  'air-conditioning': 'Air Conditioning',
  'heating': 'Heating',
  'heat-pumps': 'Heat Pumps',
  'energy-efficiency': 'Energy Efficiency',
  'air-quality': 'Air Quality',
  'brand-reviews': 'Brand Reviews',
  'buying-guides': 'Buying Guides',
  'cost-guides': 'Cost Guides',
  'how-to': 'How-To Guides',
  'troubleshooting': 'Troubleshooting',
  'hvac-dictionary': 'HVAC Dictionary',
  'articles': 'Articles',
};

export function getClusterDisplayName(cluster: string): string {
  const route = getClusterRoute(cluster);
  return routeDisplayName[route] ?? 'Articles';
}
