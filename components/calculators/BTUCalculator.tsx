'use client';

import { useState, useMemo } from 'react';
import {
  Calculator,
  Thermometer,
  Home,
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  Snowflake,
  CheckCircle,
  AlertTriangle,
  Users,
  Tv,
  MapPin,
  Loader2,
  Bed,
  Sofa,
  Utensils,
  Briefcase,
  Wind,
} from 'lucide-react';
import EmbedCode from '../EmbedCode';
import SocialShare from '../SocialShare';
import {
  fmt,
  fmtMoney,
  CalcShell,
  SectionHeader,
  Segmented,
  CardChoice,
  PresetChips,
  NumberInput,
  InfoTip,
  ResultHero,
  BreakdownTable,
  DisclaimerBox,
  ResultsHeader,
  accentMap,
} from './_shared';

const ACCENT = 'blue' as const;
const a = accentMap[ACCENT];

const climateZones = [
  { value: 'very-hot', short: 'Z1', label: 'Very Hot', btuPerSqFt: 18, description: 'Southern FL, HI' },
  { value: 'hot-humid', short: 'Z2', label: 'Hot Humid', btuPerSqFt: 20, description: 'Southern TX, LA, MS, AL, GA' },
  { value: 'hot-dry', short: 'Z3', label: 'Hot Dry', btuPerSqFt: 22, description: 'AZ, S. CA, NV' },
  { value: 'mixed-humid', short: 'Z4', label: 'Mixed Humid', btuPerSqFt: 25, description: 'NC, SC, TN, AR, OK' },
  { value: 'mixed-dry', short: 'Z5', label: 'Mixed Dry', btuPerSqFt: 28, description: 'N. CA, OR, WA' },
  { value: 'cool', short: 'Z6', label: 'Cool', btuPerSqFt: 30, description: 'PA, NY, MI, WI, IL' },
  { value: 'cold', short: 'Z7', label: 'Cold', btuPerSqFt: 35, description: 'MN, ND, MT, ME' },
  { value: 'very-cold', short: 'Z8', label: 'Very Cold', btuPerSqFt: 40, description: 'Northern MN, AK' },
];

const roomTypes = [
  { value: 'bedroom', name: 'Bedroom', heatLoad: 1.0, sub: 'Quiet, low heat sources', Icon: Bed },
  { value: 'living', name: 'Living room', heatLoad: 1.1, sub: 'Mid-traffic, TV/electronics', Icon: Sofa },
  { value: 'kitchen', name: 'Kitchen', heatLoad: 1.4, sub: 'Stove + appliances heat load', Icon: Utensils },
  { value: 'office', name: 'Home office', heatLoad: 1.2, sub: 'PC + monitor heat', Icon: Briefcase },
  { value: 'sunroom', name: 'Sunroom', heatLoad: 1.5, sub: 'Heavy solar gain', Icon: Sun },
  { value: 'basement', name: 'Basement', heatLoad: 0.8, sub: 'Naturally cooler', Icon: Home },
  { value: 'bathroom', name: 'Bathroom', heatLoad: 0.9, sub: 'Small, occasional use', Icon: Wind },
  { value: 'garage', name: 'Garage', heatLoad: 1.3, sub: 'Poor insulation, big door', Icon: Home },
];

const windowTypes = [
  { value: 'single', name: 'Single pane', factor: 1.3, sub: 'Old aluminum/wood frames' },
  { value: 'double', name: 'Double pane', factor: 1.0, sub: 'Modern standard, sealed gas-fill' },
  { value: 'low-e', name: 'Low-E coated', factor: 0.9, sub: 'Reflective coating cuts solar gain' },
  { value: 'triple', name: 'Triple pane', factor: 0.8, sub: 'Top-tier, often in cold climates' },
];

const insulationOptions = [
  { value: 'poor', name: 'Poor', factor: 1.3, summary: 'Pre-1970, little/no insulation' },
  { value: 'average', name: 'Average', factor: 1.0, summary: 'Code-built walls + attic, sealed' },
  { value: 'good', name: 'Good', factor: 0.9, summary: 'Above-code, modern envelope' },
  { value: 'excellent', name: 'Excellent', factor: 0.85, summary: 'ENERGY STAR / passive house' },
];

const sunExposureOptions = [
  { value: 'heavy-shade', name: 'Heavy shade', sub: 'North-facing, tree cover', factor: 0.9, Icon: Cloud },
  { value: 'moderate', name: 'Moderate', sub: 'East-facing or partial sun', factor: 1.0, Icon: CloudSun },
  { value: 'direct-sun', name: 'Direct sun', sub: 'West-facing, afternoon glare', factor: 1.1, Icon: Sun },
  { value: 'southwest', name: 'Heavy sun', sub: 'South/SW, all-day exposure', factor: 1.15, Icon: Sun },
];

const lengthPresets = [10, 12, 15, 20, 25];
const heightPresets = [8, 9, 10, 12];

export default function BTUCalculator() {
  const [length, setLength] = useState('15');
  const [width, setWidth] = useState('12');
  const [height, setHeight] = useState('8');
  const [climate, setClimate] = useState('mixed-humid');
  const [roomType, setRoomType] = useState('living');
  const [windowType, setWindowType] = useState('double');
  const [windowArea, setWindowArea] = useState('30');
  const [insulation, setInsulation] = useState('average');
  const [sunExposure, setSunExposure] = useState('moderate');
  const [occupants, setOccupants] = useState('2');
  const [appliances, setAppliances] = useState('2');
  const [locationDetected, setLocationDetected] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);

  const detectClimateZone = () => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) return;
    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude } = position.coords;
        let detected = 'mixed-humid';
        if (latitude >= 48) detected = 'very-cold';
        else if (latitude >= 45) detected = 'cold';
        else if (latitude >= 42) detected = 'cool';
        else if (latitude >= 38) detected = 'mixed-humid';
        else if (latitude >= 32) detected = 'hot-humid';
        else if (latitude >= 28) detected = 'hot-dry';
        else detected = 'very-hot';
        setClimate(detected);
        setLocationDetected(true);
        setDetectingLocation(false);
      },
      () => setDetectingLocation(false),
      { timeout: 5000, enableHighAccuracy: false }
    );
  };

  const selectedZone = climateZones.find((z) => z.value === climate)!;
  const selectedRoom = roomTypes.find((r) => r.value === roomType)!;
  const selectedWindow = windowTypes.find((w) => w.value === windowType)!;
  const selectedInsulation = insulationOptions.find((i) => i.value === insulation)!;
  const selectedSun = sunExposureOptions.find((s) => s.value === sunExposure)!;

  const lenN = Math.max(parseFloat(length) || 0, 0);
  const wdtN = Math.max(parseFloat(width) || 0, 0);
  const htN = Math.max(parseFloat(height) || 0, 0);
  const winAreaN = Math.max(parseFloat(windowArea) || 0, 0);
  const occN = Math.max(parseInt(occupants) || 0, 0);
  const appN = Math.max(parseInt(appliances) || 0, 0);

  const calc = useMemo(() => {
    const roomArea = lenN * wdtN;
    const roomVolume = roomArea * htN;
    const baseBTU = roomArea * selectedZone.btuPerSqFt;
    const windowAreaFactor = roomArea > 0 ? 1 + (winAreaN / roomArea) * 0.3 : 1;
    const heightFactor = htN > 0 ? htN / 8 : 1;
    const occupantBTU = Math.max(0, occN - 2) * 600;
    const applianceBTU = appN * 400;

    const adjustedBTU =
      baseBTU *
      selectedRoom.heatLoad *
      selectedWindow.factor *
      windowAreaFactor *
      selectedInsulation.factor *
      selectedSun.factor *
      heightFactor;
    const totalBTU = Math.max(adjustedBTU + occupantBTU + applianceBTU, 0);
    const tonnage = totalBTU / 12000;

    const standardSizes = [5000, 6000, 8000, 10000, 12000, 14000, 18000, 24000, 30000, 36000];
    const ideal = standardSizes.find((size) => size >= totalBTU) || 36000;
    const idealIdx = standardSizes.indexOf(ideal);
    const minimum = standardSizes[Math.max(0, idealIdx - 1)] || ideal;

    return {
      roomArea,
      roomVolume,
      baseBTU: Math.round(baseBTU),
      windowAreaFactor,
      heightFactor,
      occupantBTU,
      applianceBTU,
      totalBTU: Math.round(totalBTU),
      tonnage,
      ideal,
      minimum,
    };
  }, [
    lenN, wdtN, htN, winAreaN, occN, appN,
    selectedZone, selectedRoom, selectedWindow, selectedInsulation, selectedSun,
  ]);

  const fit =
    calc.totalBTU === 0 ? { tone: 'warn' as const, text: 'Enter room dimensions' } :
    calc.totalBTU < 5000 ? { tone: 'ok' as const, text: 'Tiny load — smallest unit fits' } :
    calc.ideal - calc.totalBTU < calc.ideal * 0.1 ? { tone: 'good' as const, text: 'Exact match' } :
    calc.ideal - calc.totalBTU < calc.ideal * 0.25 ? { tone: 'ok' as const, text: 'Good fit' } :
                                                     { tone: 'warn' as const, text: 'Slightly oversized at this tier' };

  const systemRec =
    calc.totalBTU <= 8000 ? { name: 'Window AC or portable unit', tone: 'blue',
      desc: 'Affordable for a single room. Window beats portable on efficiency and noise.',
      cost: '$200–$800', install: 'DIY-friendly' } :
    calc.totalBTU <= 24000 ? { name: 'Mini-split (recommended)', tone: 'emerald',
      desc: 'Most efficient, quiet, and precise temperature control for one zone.',
      cost: '$1,500–$4,000', install: 'Professional install required' } :
    { name: 'Central AC or multi-zone', tone: 'purple',
      desc: 'Large load needs a whole-home system or multiple mini-splits.',
      cost: '$3,000–$8,000+', install: 'Pro design + install' };

  return (
    <CalcShell
      Icon={Calculator}
      title="BTU Calculator"
      subtitle="Exact cooling capacity for any room. Updates as you change inputs."
      accent={ACCENT}
    >
      {/* Section 1 — Room dimensions */}
      <section>
        <SectionHeader step={1} title="Room dimensions" subtitle="Length × width × ceiling height" Icon={Home} accent={ACCENT} />

        <div className="grid sm:grid-cols-3 gap-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Length</label>
            <div className="mb-2">
              <PresetChips value={length} onChange={setLength} presets={lengthPresets} accent={ACCENT} />
            </div>
            <NumberInput value={length} onChange={setLength} min={5} max={100} suffix="ft" ariaLabel="Room length" accent={ACCENT} className="max-w-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Width</label>
            <div className="mb-2">
              <PresetChips value={width} onChange={setWidth} presets={lengthPresets} accent={ACCENT} />
            </div>
            <NumberInput value={width} onChange={setWidth} min={5} max={100} suffix="ft" ariaLabel="Room width" accent={ACCENT} className="max-w-none" />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Ceiling height
              <InfoTip label="ceiling height">Most rooms are 8 ft. Cathedral/vaulted ceilings push 10–14 ft and meaningfully raise the BTU load.</InfoTip>
            </label>
            <div className="mb-2">
              <PresetChips value={height} onChange={setHeight} presets={heightPresets} accent={ACCENT} />
            </div>
            <NumberInput value={height} onChange={setHeight} min={7} max={20} suffix="ft" ariaLabel="Ceiling height" accent={ACCENT} className="max-w-none" />
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
          <div className="px-2 py-1 bg-gray-50 rounded">
            <span className="text-gray-500">Floor area:</span>{' '}
            <span className="font-semibold text-gray-800">{fmt(calc.roomArea, { maximumFractionDigits: 0 })} sq ft</span>
          </div>
          <div className="px-2 py-1 bg-gray-50 rounded">
            <span className="text-gray-500">Volume:</span>{' '}
            <span className="font-semibold text-gray-800">{fmt(calc.roomVolume, { maximumFractionDigits: 0 })} cu ft</span>
          </div>
        </div>
      </section>

      {/* Section 2 — Room context */}
      <section>
        <SectionHeader step={2} title="Room context" subtitle="What the room is for and where it sits" Icon={MapPin} accent={ACCENT} />

        <div className="space-y-5">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Room type
              <InfoTip label="room type">
                Different rooms put different heat into the air. Kitchens (stoves), home offices (computers), and sunrooms (glass) all run hotter than bedrooms.
              </InfoTip>
            </label>
            <CardChoice
              value={roomType}
              onChange={setRoomType}
              options={roomTypes}
              ariaLabel="Room type"
              accent={ACCENT}
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center">
                Climate zone
                <InfoTip label="climate zone">
                  US DOE climate zones 1 (Miami) through 8 (Northern Alaska). Cooling load drops steadily as you go north — though humidity in southern zones increases the latent load on AC equipment.
                </InfoTip>
              </span>
              <button
                type="button"
                onClick={detectClimateZone}
                disabled={detectingLocation}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-md ${a.selectedBg} ${a.bigNumber} hover:opacity-80 transition-opacity disabled:opacity-50`}
              >
                {detectingLocation
                  ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Detecting…</>
                  : <><MapPin className="w-3.5 h-3.5" /> Auto-detect</>}
              </button>
            </label>
            <div role="radiogroup" aria-label="Climate zone" className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
              {climateZones.map((zone) => {
                const active = zone.value === climate;
                return (
                  <button
                    key={zone.value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setClimate(zone.value)}
                    title={zone.description}
                    className={`px-2 py-2 rounded-lg border text-xs font-semibold transition-colors ${
                      active
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    <div className="font-bold text-sm">{zone.short}</div>
                    <div className={`text-[10px] mt-0.5 ${active ? 'text-blue-100' : 'text-gray-500'}`}>
                      {zone.label}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              {locationDetected && <span className="text-emerald-600 font-medium">✓ Location detected:</span>}
              <span><span className="font-medium text-gray-800">{selectedZone.label}:</span> {selectedZone.description}</span>
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Sun className="w-4 h-4 mr-1.5 text-gray-500" />
              Sun exposure
            </label>
            <CardChoice
              value={sunExposure}
              onChange={setSunExposure}
              options={sunExposureOptions}
              ariaLabel="Sun exposure"
              accent={ACCENT}
            />
          </div>
        </div>
      </section>

      {/* Section 3 — Construction & loads */}
      <section>
        <SectionHeader step={3} title="Construction & heat sources" subtitle="Windows, insulation, people, electronics" Icon={Thermometer} accent={ACCENT} />

        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Window type
                <InfoTip label="window type">
                  Single-pane lets ~3× as much heat through as double-pane. Low-E coatings reflect infrared, cutting cooling load substantially in sunny rooms.
                </InfoTip>
              </label>
              <CardChoice
                value={windowType}
                onChange={setWindowType}
                options={windowTypes}
                ariaLabel="Window type"
                columns={2}
                accent={ACCENT}
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Total window area
                <InfoTip label="window area">
                  Sum of every window's width × height in square feet. A typical bedroom has one 3×4 ft window (12 sq ft); a living room with three windows averages 25–40 sq ft.
                </InfoTip>
              </label>
              <NumberInput
                value={windowArea}
                onChange={setWindowArea}
                min={0}
                max={200}
                suffix="sq ft"
                ariaLabel="Total window area"
                accent={ACCENT}
                className="max-w-none"
              />
              <p className="text-xs text-gray-500 mt-1.5">
                Typical bedroom: 10–15 sq ft. Typical living room: 25–40 sq ft.
              </p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Insulation quality</label>
            <CardChoice
              value={insulation}
              onChange={setInsulation}
              options={insulationOptions}
              ariaLabel="Insulation quality"
              accent={ACCENT}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 mr-1.5 text-gray-500" />
                Regular occupants
                <InfoTip label="occupants">Each person adds ~600 BTU/hr of body heat. The first 2 are baked into the base load — only enter additional people.</InfoTip>
              </label>
              <NumberInput
                value={occupants}
                onChange={setOccupants}
                min={0}
                max={20}
                suffix="people"
                ariaLabel="Number of occupants"
                accent={ACCENT}
                className="max-w-none"
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Tv className="w-4 h-4 mr-1.5 text-gray-500" />
                Heat-generating appliances
                <InfoTip label="appliances">TVs, desktops, gaming consoles, kitchen appliances each add ~400 BTU/hr. Phone chargers and small electronics don't count.</InfoTip>
              </label>
              <NumberInput
                value={appliances}
                onChange={setAppliances}
                min={0}
                max={10}
                suffix="items"
                ariaLabel="Heat-generating appliances"
                accent={ACCENT}
                className="max-w-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section aria-live="polite" className="space-y-5">
        <ResultsHeader />

        <ResultHero
          accent={ACCENT}
          eyebrow="Recommended AC capacity"
          value={calc.ideal}
          unit="BTU/hr"
          secondaryText={
            <>
              Your room needs <strong>{fmt(calc.totalBTU)} BTU/hr</strong> of cooling
              ({calc.tonnage.toFixed(2)} tons) — the closest standard unit is <strong>{fmt(calc.ideal)} BTU</strong>.
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Floor area', value: `${fmt(calc.roomArea, { maximumFractionDigits: 0 })} sq ft` },
            { label: 'Tonnage', value: `${calc.tonnage.toFixed(2)} tons` },
            { label: 'Minimum size', value: `${fmt(calc.minimum)} BTU`, valueClass: 'text-gray-600' },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Calculator className="w-4 h-4 text-blue-600" />
              Calculation breakdown
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Base load', detail: `${fmt(calc.roomArea, { maximumFractionDigits: 0 })} sq ft × ${selectedZone.btuPerSqFt} BTU/sq ft`, factor: `${fmt(calc.baseBTU)} BTU` },
                { label: 'Room type', detail: selectedRoom.name, factor: `× ${selectedRoom.heatLoad.toFixed(2)}` },
                { label: 'Window type', detail: selectedWindow.name, factor: `× ${selectedWindow.factor.toFixed(2)}` },
                { label: 'Window area', detail: `${fmt(winAreaN, { maximumFractionDigits: 0 })} sq ft of glass`, factor: `× ${calc.windowAreaFactor.toFixed(2)}` },
                { label: 'Insulation', detail: selectedInsulation.name, factor: `× ${selectedInsulation.factor.toFixed(2)}` },
                { label: 'Sun', detail: selectedSun.name, factor: `× ${selectedSun.factor.toFixed(2)}` },
                { label: 'Ceiling', detail: `${fmt(htN)} ft ceiling`, factor: `× ${calc.heightFactor.toFixed(2)}` },
                { label: 'People (>2)', detail: `${Math.max(0, occN - 2)} extra × 600`, factor: `+ ${fmt(calc.occupantBTU)} BTU` },
                { label: 'Appliances', detail: `${appN} × 400 BTU`, factor: `+ ${fmt(calc.applianceBTU)} BTU` },
              ]}
              totals={[
                { label: 'Total cooling load', value: `${fmt(calc.totalBTU)} BTU/hr`, valueClass: 'text-blue-700' },
              ]}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Right system type for this load
            </h4>
            <div className={`p-3 rounded-lg mb-3 ${
              systemRec.tone === 'blue' ? 'bg-blue-50 border border-blue-200'
              : systemRec.tone === 'emerald' ? 'bg-emerald-50 border border-emerald-200'
              : 'bg-purple-50 border border-purple-200'
            }`}>
              <div className="font-semibold text-gray-900 mb-1">{systemRec.name}</div>
              <p className="text-xs text-gray-700 mb-2">{systemRec.desc}</p>
              <div className="text-[11px] text-gray-600 flex flex-wrap gap-x-3">
                <span><strong>Cost:</strong> {systemRec.cost}</span>
                <span><strong>Install:</strong> {systemRec.install}</span>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="font-semibold text-gray-900 mb-1 text-sm">Efficiency tip</div>
              <p className="text-xs text-gray-700">
                Look for ENERGY STAR units with SEER2 of 15+ (window/portable) or 16+ (mini-split / central).
                Higher SEER2 cuts running cost 15–30%.
              </p>
            </div>
          </div>
        </div>

        <DisclaimerBox title="Sizing right matters more than going bigger.">
          <p>
            An oversized AC cools the air fast but turns off before it can dehumidify — leaving the room
            cold and clammy. Stay within one tier of the calculated load. For rooms over 500 sq ft or with
            unusual layouts (open-plan, lofts, or vaulted ceilings), have a contractor run a proper Manual J.
          </p>
        </DisclaimerBox>
      </section>

      <SocialShare
        title="BTU Calculator"
        description="Calculate the exact cooling capacity needed for any room. Free HVAC sizing tool that helps you choose the perfect air conditioner size."
      />

      <EmbedCode calculatorType="air-conditioner-btu-calculator" title="BTU Calculator" />
    </CalcShell>
  );
}
