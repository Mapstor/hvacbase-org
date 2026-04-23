// Map cluster names to actual existing route directories
export function getClusterRoute(cluster: string): string {
  const clusterMap: Record<string, string> = {
    // Air conditioning clusters
    'ac-sizing-selection': 'air-conditioning',
    'mini-split-air-conditioners': 'air-conditioning',
    'portable-air-conditioners': 'air-conditioning',
    
    // Heating clusters
    'furnaces-heating': 'heating',
    'space-heaters': 'heating',
    'tankless-water-heaters': 'heating',
    'water-heaters': 'heating',
    'fireplaces-stoves': 'heating',
    
    // Energy efficiency clusters
    'energy-efficiency-ratings': 'energy-efficiency',
    'insulation': 'energy-efficiency',
    'smart-thermostats': 'energy-efficiency',
    
    // Air quality clusters
    'air-quality': 'air-quality',
    'dehumidifiers': 'air-quality',
    'mold-prevention': 'air-quality',
    'indoor-air-quality': 'air-quality',
    'air-purifier-brands': 'air-quality',
    
    // Other clusters
    'hvac-maintenance': 'how-to',
    'electrical': 'how-to',
    'electrical-wiring': 'how-to',
    'hvac-brands': 'brand-reviews',
    'ductwork': 'how-to',
    'refrigerants': 'troubleshooting',
    'tax-credits': 'articles',
    'energy-costs': 'cost-guides',
    'generators': 'articles',
    'batteries-solar': 'energy-efficiency',
    'evaporative-coolers-fans': 'air-conditioning',
  };

  // Direct mapping if exists
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
    'hvac-dictionary'
  ];
  
  if (validRoutes.includes(normalizedCluster)) {
    return normalizedCluster;
  }
  
  // Otherwise use the mapping
  return clusterMap[normalizedCluster] || 'articles';
}