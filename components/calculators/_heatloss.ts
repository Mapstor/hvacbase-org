// ─────────────────────────────────────────────────────────────────────────
// Shared design heat-loss model — used by FurnaceSizingCalculator and
// HeatPumpSizeCalculator so a home's sizing and its running cost come from one
// physics model instead of divergent BTU-per-sqft rules of thumb.
//
//   Design heat loss (BTU/hr) = UA_PER_SQFT[level] × sqft × adjustments × (70 − designTempF)
//
// UA_PER_SQFT (BTU/hr·°F per sq ft). Reference house: 1-story, 2,000 sq ft,
// 8 ft ceilings, windows = 15% of floor area, air leakage included.
//   excellent 0.177 — 2021 IECC climate-zone-4 prescriptive U-factors (windows
//                     0.30, ceiling 0.024, walls 0.045, floor 0.047); 3 ACH50;
//                     50 CFM code ventilation.
//   good      0.189 — 2000s construction (walls 0.057, ceiling 0.030,
//                     windows 0.35); 5 ACH50.
//   average   0.270 — 1980s–90s (walls 0.082 / R-13, ceiling 0.035 / R-30,
//                     double-pane 0.50); 8 ACH50.
//   older     0.45  — 1960s–70s, partial insulation. Sits between average and
//                     poor; used for the heat-pump "Older" home-age tier.
//   poor      0.604 — pre-1970 (little or no wall insulation 0.20, ceiling
//                     0.080, single-pane 0.90); 15 ACH50.
//
// Modeling assumptions baked into the UA values above:
//   • natural air change = ACH50 ÷ 15 at design conditions
//   • a floor over unheated space sees half the indoor–outdoor difference
//   • indoor temperature 70°F
//   • solar gain is ignored at design, because the coldest hours are at night
// ─────────────────────────────────────────────────────────────────────────

export const UA_PER_SQFT = {
  excellent: 0.177,
  good: 0.189,
  average: 0.270,
  older: 0.45,
  poor: 0.604,
} as const;
export type UALevel = keyof typeof UA_PER_SQFT;

// Ceiling-height multiplier on UA (taller ceilings raise wall area / volume per
// floor sq ft). Keyed by the "8" / "9" / "10" / "12" ceiling-height option value.
export const CEILING_FACTOR: Record<string, number> = {
  '8': 1.00,
  '9': 1.06,
  '10': 1.13,
  '12': 1.25,
};

// Stories multiplier (more floors = less roof + floor exposure per sq ft).
// Keyed by "1" / "2" / "3" (3 = 3+ stories).
export const STORIES_FACTOR: Record<string, number> = {
  '1': 1.00,
  '2': 0.96,
  '3': 0.94,
};

// Window multiplier vs the 15%-of-floor-area reference: each point of window
// area above/below 15% shifts the envelope UA by 1.5%.
export function windowPercentFactor(windowPercentOfFloor: number): number {
  return 1 + (windowPercentOfFloor - 15) * 0.015;
}

// Design heat loss (BTU/hr) at the local 99% design temperature.
export function designHeatLoss(
  uaPerSqFt: number,
  sqft: number,
  adjustments: number,
  designTempF: number,
): number {
  return uaPerSqFt * sqft * adjustments * (70 - designTempF);
}

// Annual heat the equipment must DELIVER (output BTU) via the degree-day method:
// UA × sqft × adjustments × HDD65 × 24. Same UA + adjustments as the design
// load, so a tool's recommended size and its running-cost estimate agree.
export function annualHeatOutputBtu(
  uaPerSqFt: number,
  sqft: number,
  adjustments: number,
  hdd: number,
): number {
  return uaPerSqFt * sqft * adjustments * hdd * 24;
}
