'use client';

import { useState, useMemo } from 'react';
import {
  Calculator,
  Home,
  Zap,
  DollarSign,
  CheckCircle,
  Settings,
  TrendingUp,
  Leaf,
  Plus,
  X,
  Bed,
  Sofa,
  Utensils,
  Briefcase,
  Building2,
  Sun,
  CloudSun,
  Cloud,
} from 'lucide-react';
import {
  fmt,
  fmtMoney,
  CalcShell,
  SectionHeader,
  CardChoice,
  InfoTip,
  ResultHero,
  DisclaimerBox,
  ResultsHeader,
  CalculateResetBar,
  useCalculatorSubmit,
  accentMap,
} from './_shared';

const ACCENT = 'purple' as const;
const a = accentMap[ACCENT];

// baseBTU is BTU-per-square-foot, matching the ENERGY STAR Room Air Conditioner
// sizing table (~20 BTU/sqft baseline) with per-room-type adjustments folded in.
// Kitchen carries an additional flat surcharge in the compute below (see
// KITCHEN_SURCHARGE_BTU) for the cooking-appliance internal heat gain that
// ENERGY STAR/DOE guidance calls out at +4,000 BTU. All zone results are also
// floored at MIN_MINI_SPLIT_HEAD_BTU because the smallest mini-split head
// manufactured is 6,000 BTU — no zone can recommend less than one head.
const zoneTypes = [
  { value: 'bedroom',  name: 'Bedroom',  baseBTU: 20, Icon: Bed },
  { value: 'living',   name: 'Living',   baseBTU: 25, Icon: Sofa },
  { value: 'kitchen',  name: 'Kitchen',  baseBTU: 25, Icon: Utensils },
  { value: 'office',   name: 'Office',   baseBTU: 20, Icon: Briefcase },
  { value: 'basement', name: 'Basement', baseBTU: 18, Icon: Home },
  { value: 'sunroom',  name: 'Sunroom',  baseBTU: 30, Icon: Sun },
];

const KITCHEN_SURCHARGE_BTU = 4000;
const MIN_MINI_SPLIT_HEAD_BTU = 6000;

const climateOptions = [
  { value: 'hot', name: 'Hot climate', sub: 'South / Southwest', factor: 1.2 },
  { value: 'moderate', name: 'Moderate climate', sub: 'Mid-Atlantic / mixed', factor: 1.0 },
  { value: 'cold', name: 'Cold climate', sub: 'Northern states', factor: 0.9 },
];

const insulationOptions = [
  { value: 'poor', name: 'Poor', summary: 'Older home, limited insulation', factor: 1.2 },
  { value: 'average', name: 'Average', summary: 'Code-built, standard insulation', factor: 1.0 },
  { value: 'good', name: 'Good', summary: 'Modern, above-code envelope', factor: 0.9 },
];

const zoneSunOptions = [
  { value: 'low', name: 'Shaded', factor: 0.9, Icon: Cloud },
  { value: 'moderate', name: 'Moderate', factor: 1.0, Icon: CloudSun },
  { value: 'high', name: 'Full sun', factor: 1.15, Icon: Sun },
];

type Zone = { id: number; type: string; squareFeet: string; sunExposure: string };

const DEFAULT_ZONES: Zone[] = [
  { id: 1, type: 'living', squareFeet: '400', sunExposure: 'moderate' },
];
const DEFAULTS = {
  climate: 'moderate',
  insulation: 'average',
};

export default function MiniSplitCalculator() {
  const [zones, setZones] = useState<Zone[]>(DEFAULT_ZONES);
  const [climate, setClimate] = useState(DEFAULTS.climate);
  const [insulation, setInsulation] = useState(DEFAULTS.insulation);

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    climate, insulation, zonesJson: JSON.stringify(zones),
  });

  const selectedClimate = climateOptions.find((c) => c.value === climate)!;
  const selectedInsulation = insulationOptions.find((i) => i.value === insulation)!;

  const addZone = () => {
    if (zones.length >= 5) return;
    setZones([...zones, { id: Date.now(), type: 'bedroom', squareFeet: '200', sunExposure: 'moderate' }]);
  };
  const removeZone = (id: number) => {
    if (zones.length > 1) setZones(zones.filter((z) => z.id !== id));
  };
  const updateZone = (id: number, field: keyof Zone, value: string) => {
    setZones(zones.map((z) => (z.id === id ? { ...z, [field]: value } : z)));
  };

  const handleReset = () => {
    setZones(DEFAULT_ZONES);
    setClimate(DEFAULTS.climate);
    setInsulation(DEFAULTS.insulation);
    clear();
  };

  const zoneBTUs = useMemo(() => {
    return zones.map((zone) => {
      const zType = zoneTypes.find((t) => t.value === zone.type);
      const sun = zoneSunOptions.find((s) => s.value === zone.sunExposure);
      const sqFt = Math.max(parseFloat(zone.squareFeet) || 0, 0);
      // Envelope load: per-sqft baseline × climate × insulation × sun.
      const envelope = (zType?.baseBTU ?? 20) * sqFt *
        selectedClimate.factor * selectedInsulation.factor * (sun?.factor ?? 1);
      // Internal heat gain from cooking appliances is not affected by climate
      // or insulation, so it is added AFTER the envelope multipliers.
      const kitchenSurcharge = zone.type === 'kitchen' ? KITCHEN_SURCHARGE_BTU : 0;
      // Floor at the smallest mini-split head size available.
      const btu = Math.max(envelope + kitchenSurcharge, MIN_MINI_SPLIT_HEAD_BTU);
      const recommended = Math.ceil(btu / 3000) * 3;
      return {
        ...zone,
        sqFt,
        btu: Math.round(btu),
        tons: btu / 12000,
        recommendedSize: recommended,
        zoneType: zType,
        sun,
      };
    });
  }, [zones, selectedClimate, selectedInsulation]);

  // Committed snapshot (freezes at Calculate) — powers the results section.
  // Formula MUST match the zoneBTUs useMemo above exactly.
  const srcZoneBTUs = useMemo(() => {
    const srcZones: Zone[] = JSON.parse(src.zonesJson) as Zone[];
    const srcClimate = climateOptions.find((c) => c.value === src.climate)!;
    const srcInsulation = insulationOptions.find((i) => i.value === src.insulation)!;
    return srcZones.map((zone) => {
      const zType = zoneTypes.find((t) => t.value === zone.type);
      const sun = zoneSunOptions.find((s) => s.value === zone.sunExposure);
      const sqFt = Math.max(parseFloat(zone.squareFeet) || 0, 0);
      const envelope = (zType?.baseBTU ?? 20) * sqFt *
        srcClimate.factor * srcInsulation.factor * (sun?.factor ?? 1);
      const kitchenSurcharge = zone.type === 'kitchen' ? KITCHEN_SURCHARGE_BTU : 0;
      const btu = Math.max(envelope + kitchenSurcharge, MIN_MINI_SPLIT_HEAD_BTU);
      const recommended = Math.ceil(btu / 3000) * 3;
      return {
        ...zone,
        sqFt,
        btu: Math.round(btu),
        tons: btu / 12000,
        recommendedSize: recommended,
        zoneType: zType,
        sun,
      };
    });
  }, [src.zonesJson, src.climate, src.insulation]);

  const calc = useMemo(() => {
    const totalBTU = srcZoneBTUs.reduce((sum, z) => sum + z.btu, 0);
    const totalTons = totalBTU / 12000;
    const totalArea = srcZoneBTUs.reduce((sum, z) => sum + z.sqFt, 0);
    const outdoorSizes = [18000, 24000, 30000, 36000, 42000, 48000, 60000];
    const recommendedOutdoor = outdoorSizes.find((s) => s >= totalBTU * 1.1) || 60000;
    const oversized = totalBTU > 0 ? ((recommendedOutdoor / 1.1 / totalBTU) - 1) * 100 + 10 : 0;
    const equipmentCost = 800 + srcZoneBTUs.length * 600 + (totalBTU / 1000) * 15;
    const installCost = 500 + srcZoneBTUs.length * 400;
    const totalCost = equipmentCost + installCost;
    return {
      totalBTU: Math.round(totalBTU),
      totalTons,
      totalArea,
      recommendedOutdoor,
      oversized,
      equipmentCost,
      installCost,
      totalCost,
    };
  }, [srcZoneBTUs]);

  const fit =
    calc.totalBTU === 0 ? { tone: 'warn' as const, text: 'Add zones to start' } :
    srcZoneBTUs.length === 1 ? { tone: 'good' as const, text: 'Single-zone system' } :
    srcZoneBTUs.length <= 3   ? { tone: 'good' as const, text: `${srcZoneBTUs.length}-zone system — ideal multi-zone size` } :
                                { tone: 'ok' as const, text: `${srcZoneBTUs.length}-zone system — consider two condensers if branches are far apart` };

  return (
    <CalcShell
      Icon={Zap}
      title="Mini Split Sizing Calculator"
      subtitle="Size multi-zone ductless systems."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
      {/* Section 1 — Global settings */}
      <section>
        <SectionHeader step={1} title="Whole-home context" subtitle="Affects every zone's load" Icon={Home} accent={ACCENT} />

        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Climate</label>
            <CardChoice value={climate} onChange={setClimate} options={climateOptions} ariaLabel="Climate" columns={3} accent={ACCENT} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Insulation quality</label>
            <CardChoice value={insulation} onChange={setInsulation} options={insulationOptions} ariaLabel="Insulation quality" columns={3} accent={ACCENT} />
          </div>
        </div>
      </section>

      {/* Section 2 — Zones */}
      <section>
        <SectionHeader step={2} title="Zones" subtitle="Add an indoor head for each room you want to condition" Icon={Settings} accent={ACCENT} />

        <div className="space-y-4">
          {zoneBTUs.map((zone, index) => (
            <div key={zone.id} className="bg-white border-2 border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2 text-sm">
                  <span className={`${a.sectionBadgeBg} ${a.sectionBadgeText} rounded-md w-6 h-6 flex items-center justify-center text-xs font-bold`}>
                    {index + 1}
                  </span>
                  Zone {index + 1}
                  <span className="text-xs font-normal text-gray-500">— {zone.zoneType?.name}, {fmt(zone.sqFt)} sq ft</span>
                </h4>
                {zones.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeZone(zone.id)}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                  >
                    <X className="w-3.5 h-3.5" /> Remove
                  </button>
                )}
              </div>

              <div className="grid lg:grid-cols-[2fr_1fr_1fr] gap-4">
                <div>
                  <label className="text-[11px] font-medium text-gray-600 mb-1.5 block uppercase tracking-wider">Room type</label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                    {zoneTypes.map((t) => {
                      const active = zone.type === t.value;
                      const Icon = t.Icon;
                      return (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => updateZone(zone.id, 'type', t.value)}
                          className={`p-2 rounded-lg border text-xs font-medium transition-colors ${
                            active
                              ? 'bg-purple-600 border-purple-600 text-white'
                              : 'bg-white border-gray-300 text-gray-700 hover:border-purple-400 hover:bg-purple-50'
                          }`}
                        >
                          <Icon className={`w-4 h-4 mx-auto mb-0.5 ${active ? 'text-white' : 'text-gray-500'}`} />
                          <div className="text-[10px]">{t.name}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-gray-600 mb-1.5 block uppercase tracking-wider">Square feet</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={zone.squareFeet}
                      onChange={(e) => updateZone(zone.id, 'squareFeet', e.target.value)}
                      min={50}
                      max={1000}
                      className="w-full px-3 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      aria-label={`Zone ${index + 1} square feet`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">sq ft</span>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-gray-600 mb-1.5 block uppercase tracking-wider">Sun exposure</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {zoneSunOptions.map((s) => {
                      const active = zone.sunExposure === s.value;
                      const Icon = s.Icon;
                      return (
                        <button
                          key={s.value}
                          type="button"
                          onClick={() => updateZone(zone.id, 'sunExposure', s.value)}
                          className={`p-2 rounded-lg border text-xs font-medium transition-colors ${
                            active
                              ? 'bg-purple-600 border-purple-600 text-white'
                              : 'bg-white border-gray-300 text-gray-700 hover:border-purple-400 hover:bg-purple-50'
                          }`}
                          title={s.name}
                        >
                          <Icon className={`w-4 h-4 mx-auto ${active ? 'text-white' : 'text-gray-500'}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="text-gray-500">
                  Load: <span className="font-mono font-semibold text-gray-800">{fmt(zone.btu)} BTU</span>
                  <span className="ml-2 text-gray-400">({zone.tons.toFixed(2)} tons)</span>
                </div>
                <div className={`px-2 py-1 ${a.selectedBg} ${a.bigNumber} rounded-md font-semibold`}>
                  Recommended head: {zone.recommendedSize}k BTU
                </div>
              </div>
            </div>
          ))}

          {zones.length < 5 && (
            <button
              type="button"
              onClick={addZone}
              className={`w-full py-3 rounded-xl border-2 border-dashed border-gray-300 ${a.hoverBorder} ${a.hoverBg} text-gray-600 ${a.bigNumber} font-medium text-sm transition-colors flex items-center justify-center gap-2`}
            >
              <Plus className="w-4 h-4" /> Add another zone ({5 - zones.length} remaining)
            </button>
          )}
        </div>
      </section>

      <CalculateResetBar
        onCalculate={calculate}
        onReset={handleReset}
        dirty={dirty}
        hasResult={hasResult}
        accent={ACCENT}
      />

      {/* Results */}
      {hasResult && (
      <section aria-live="polite" className="space-y-5">
        <ResultsHeader dirty={dirty} />

        <ResultHero
          accent={ACCENT}
          eyebrow="Outdoor condenser size"
          value={`${(calc.recommendedOutdoor / 1000).toFixed(0)}k`}
          unit="BTU"
          secondaryText={
            <>
              Sized for <strong>{fmt(calc.totalBTU)} BTU/hr</strong> across {srcZoneBTUs.length} zone{srcZoneBTUs.length === 1 ? '' : 's'}
              ({calc.totalTons.toFixed(2)} tons total).
              Includes ~10% safety margin for line losses and peak demand.
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Total area', value: `${fmt(calc.totalArea)} sq ft` },
            { label: 'Equipment est.', value: `$${fmtMoney(calc.equipmentCost)}` },
            { label: 'Total installed', value: `$${fmtMoney(calc.totalCost)}`, valueClass: 'text-emerald-700' },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Home className="w-4 h-4 text-purple-600" />
              Indoor head sizing per zone
            </h4>
            <div className="space-y-2">
              {srcZoneBTUs.map((zone, i) => (
                <div key={zone.id} className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 text-xs">
                  <div>
                    <div className="font-semibold text-gray-900">
                      Zone {i + 1}: {zone.zoneType?.name}
                    </div>
                    <div className="text-[11px] text-gray-500">
                      {fmt(zone.sqFt)} sq ft · {zone.sun?.name} sun · {fmt(zone.btu)} BTU load
                    </div>
                  </div>
                  <div className={`font-bold ${a.bigNumber} tabular-nums`}>
                    {zone.recommendedSize}k BTU
                  </div>
                </div>
              ))}
              <div className="pt-2 mt-2 border-t border-gray-300 flex justify-between items-baseline">
                <span className="font-semibold text-gray-900">Sum of head capacity</span>
                <span className={`font-bold ${a.bigNumber} tabular-nums`}>
                  {fmt(srcZoneBTUs.reduce((s, z) => s + z.recommendedSize * 1000, 0))} BTU
                </span>
              </div>
              <p className="text-[11px] text-gray-500 leading-snug pt-1">
                Multi-zone systems allow indoor heads to total <strong>up to 130%</strong> of outdoor capacity since not all
                zones run at max simultaneously. Your system is at {((srcZoneBTUs.reduce((s, z) => s + z.recommendedSize * 1000, 0) / calc.recommendedOutdoor) * 100).toFixed(0)}%.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              Investment estimate
            </h4>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-700">Outdoor condenser + heads</span>
                <span className="font-mono text-gray-900 tabular-nums">${fmtMoney(calc.equipmentCost)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-700">Professional installation</span>
                <span className="font-mono text-gray-900 tabular-nums">${fmtMoney(calc.installCost)}</span>
              </div>
              <div className="flex justify-between py-1.5 pt-3 border-t border-gray-300">
                <span className="font-semibold text-gray-900">Total installed cost</span>
                <span className="font-bold text-emerald-700 tabular-nums text-base">${fmtMoney(calc.totalCost)}</span>
              </div>
            </div>
            <ul className="mt-3 space-y-1 text-[11px] text-gray-600">
              <li>• Varies ±30% by region and house complexity</li>
              <li>• Federal §25C/§25D credits ended for property placed in service after Dec 31, 2025 (OBBBA) — 2026 installs are not eligible; check state/utility rebates or IRA-funded HEAR/HOMES</li>
              <li>• Typical equipment warranty: 10–12 years parts, 7 years compressor</li>
            </ul>
          </div>

          <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <Leaf className="w-4 h-4 text-emerald-700" />
              Why mini split for this load
            </h4>
            <ul className="space-y-1 text-xs text-gray-700">
              <li><strong>30–40% lower</strong> energy use vs central AC of equivalent capacity</li>
              <li><strong>Zone control</strong> — only run heads in occupied rooms</li>
              <li><strong>No ducts</strong> — no 20–30% duct losses, no major construction</li>
              <li><strong>Whisper quiet</strong> — typical indoor unit runs under 40 dB</li>
              <li><strong>Year-round</strong> — heat pump mode for heating; cold-climate models work below 0°F</li>
            </ul>
          </div>

          <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-amber-700" />
              Operating cost estimate
            </h4>
            <ul className="space-y-1 text-xs text-gray-700">
              <li><strong>Cooling season:</strong> ~${fmtMoney(calc.totalTons * 120)}–${fmtMoney(calc.totalTons * 180)}/yr</li>
              <li><strong>Heating season:</strong> ~${fmtMoney(calc.totalTons * 200)}–${fmtMoney(calc.totalTons * 300)}/yr (heat pump mode)</li>
              <li><strong>Per ton baseline:</strong> $120–$180 cooling, $200–$300 heating annually</li>
              <li className="pt-1 text-[11px] text-gray-500">Actual cost depends on usage hours, local kWh rate, and climate severity.</li>
            </ul>
          </div>
        </div>

        <DisclaimerBox title="Mini split sizing is forgiving — but only within reason.">
          <p>
            Multi-zone systems can handle slight under-sizing per zone better than central AC (inverter compressors ramp up gracefully).
            Don't over-size individual heads though — a 12k head in a 200 sq ft bedroom short-cycles and never dehumidifies properly.
            For complex multi-story layouts, get a licensed installer to run Manual J and Manual S — they'll spec exact head models
            and the right outdoor unit branching.
          </p>
        </DisclaimerBox>
      </section>
      )}
      </form>
    </CalcShell>
  );
}
