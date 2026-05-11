'use client';

import { useState, useId, ReactNode } from 'react';
import { HelpCircle, CheckCircle, AlertTriangle } from 'lucide-react';

// ---------- Number formatting (locale-explicit to avoid SSR/CSR hydration mismatch) ----------

const defaultNumFormatter = new Intl.NumberFormat('en-US');
export function fmt(n: number, opts?: Intl.NumberFormatOptions): string {
  if (!Number.isFinite(n)) return '0';
  if (opts) return new Intl.NumberFormat('en-US', opts).format(n);
  return defaultNumFormatter.format(n);
}
export function fmtMoney(n: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.round(n));
}

// ---------- Accent system ----------

export type Accent = 'orange' | 'blue' | 'purple' | 'emerald' | 'red';

type AccentStyles = {
  headerGrad: string;
  headerBorder: string;
  iconBg: string;
  sectionBadgeBg: string;
  sectionBadgeText: string;
  sectionIconText: string;
  selectedBorder: string;
  selectedBg: string;
  selectedRing: string;
  selectedText: string;
  selectedSummary: string;
  pillActive: string;
  chipActive: string;
  hoverBorder: string;
  hoverBg: string;
  bigNumber: string;
  focus: string;
  range: string;
  resultGrad: string;
  eyebrow: string;
  ring: string;
  link: string;
};

// Tailwind requires literal class names — these maps spell each accent out.
export const accentMap: Record<Accent, AccentStyles> = {
  orange: {
    headerGrad: 'bg-gradient-to-r from-orange-50 via-orange-50 to-amber-50',
    headerBorder: 'border-orange-100',
    iconBg: 'bg-orange-600',
    sectionBadgeBg: 'bg-orange-100',
    sectionBadgeText: 'text-orange-700',
    sectionIconText: 'text-orange-600',
    selectedBorder: 'border-orange-500',
    selectedBg: 'bg-orange-50',
    selectedRing: 'ring-orange-200',
    selectedText: 'text-orange-900',
    selectedSummary: 'text-orange-800',
    pillActive: 'bg-orange-600 border-orange-600 text-white',
    chipActive: 'bg-orange-600 border-orange-600 text-white',
    hoverBorder: 'hover:border-orange-400',
    hoverBg: 'hover:bg-orange-50',
    bigNumber: 'text-orange-700',
    focus: 'focus:ring-orange-500 focus:border-orange-500',
    range: 'accent-orange-600',
    resultGrad: 'bg-gradient-to-br from-orange-50 to-amber-50',
    eyebrow: 'text-orange-700',
    ring: 'ring-orange-200',
    link: 'text-orange-700 hover:text-orange-800',
  },
  blue: {
    headerGrad: 'bg-gradient-to-r from-blue-50 via-blue-50 to-cyan-50',
    headerBorder: 'border-blue-100',
    iconBg: 'bg-blue-600',
    sectionBadgeBg: 'bg-blue-100',
    sectionBadgeText: 'text-blue-700',
    sectionIconText: 'text-blue-600',
    selectedBorder: 'border-blue-500',
    selectedBg: 'bg-blue-50',
    selectedRing: 'ring-blue-200',
    selectedText: 'text-blue-900',
    selectedSummary: 'text-blue-800',
    pillActive: 'bg-blue-600 border-blue-600 text-white',
    chipActive: 'bg-blue-600 border-blue-600 text-white',
    hoverBorder: 'hover:border-blue-400',
    hoverBg: 'hover:bg-blue-50',
    bigNumber: 'text-blue-700',
    focus: 'focus:ring-blue-500 focus:border-blue-500',
    range: 'accent-blue-600',
    resultGrad: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    eyebrow: 'text-blue-700',
    ring: 'ring-blue-200',
    link: 'text-blue-700 hover:text-blue-800',
  },
  purple: {
    headerGrad: 'bg-gradient-to-r from-purple-50 via-purple-50 to-fuchsia-50',
    headerBorder: 'border-purple-100',
    iconBg: 'bg-purple-600',
    sectionBadgeBg: 'bg-purple-100',
    sectionBadgeText: 'text-purple-700',
    sectionIconText: 'text-purple-600',
    selectedBorder: 'border-purple-500',
    selectedBg: 'bg-purple-50',
    selectedRing: 'ring-purple-200',
    selectedText: 'text-purple-900',
    selectedSummary: 'text-purple-800',
    pillActive: 'bg-purple-600 border-purple-600 text-white',
    chipActive: 'bg-purple-600 border-purple-600 text-white',
    hoverBorder: 'hover:border-purple-400',
    hoverBg: 'hover:bg-purple-50',
    bigNumber: 'text-purple-700',
    focus: 'focus:ring-purple-500 focus:border-purple-500',
    range: 'accent-purple-600',
    resultGrad: 'bg-gradient-to-br from-purple-50 to-fuchsia-50',
    eyebrow: 'text-purple-700',
    ring: 'ring-purple-200',
    link: 'text-purple-700 hover:text-purple-800',
  },
  emerald: {
    headerGrad: 'bg-gradient-to-r from-emerald-50 via-emerald-50 to-teal-50',
    headerBorder: 'border-emerald-100',
    iconBg: 'bg-emerald-600',
    sectionBadgeBg: 'bg-emerald-100',
    sectionBadgeText: 'text-emerald-700',
    sectionIconText: 'text-emerald-600',
    selectedBorder: 'border-emerald-500',
    selectedBg: 'bg-emerald-50',
    selectedRing: 'ring-emerald-200',
    selectedText: 'text-emerald-900',
    selectedSummary: 'text-emerald-800',
    pillActive: 'bg-emerald-600 border-emerald-600 text-white',
    chipActive: 'bg-emerald-600 border-emerald-600 text-white',
    hoverBorder: 'hover:border-emerald-400',
    hoverBg: 'hover:bg-emerald-50',
    bigNumber: 'text-emerald-700',
    focus: 'focus:ring-emerald-500 focus:border-emerald-500',
    range: 'accent-emerald-600',
    resultGrad: 'bg-gradient-to-br from-emerald-50 to-teal-50',
    eyebrow: 'text-emerald-700',
    ring: 'ring-emerald-200',
    link: 'text-emerald-700 hover:text-emerald-800',
  },
  red: {
    headerGrad: 'bg-gradient-to-r from-red-50 via-red-50 to-orange-50',
    headerBorder: 'border-red-100',
    iconBg: 'bg-red-600',
    sectionBadgeBg: 'bg-red-100',
    sectionBadgeText: 'text-red-700',
    sectionIconText: 'text-red-600',
    selectedBorder: 'border-red-500',
    selectedBg: 'bg-red-50',
    selectedRing: 'ring-red-200',
    selectedText: 'text-red-900',
    selectedSummary: 'text-red-800',
    pillActive: 'bg-red-600 border-red-600 text-white',
    chipActive: 'bg-red-600 border-red-600 text-white',
    hoverBorder: 'hover:border-red-400',
    hoverBg: 'hover:bg-red-50',
    bigNumber: 'text-red-700',
    focus: 'focus:ring-red-500 focus:border-red-500',
    range: 'accent-red-600',
    resultGrad: 'bg-gradient-to-br from-red-50 to-orange-50',
    eyebrow: 'text-red-700',
    ring: 'ring-red-200',
    link: 'text-red-700 hover:text-red-800',
  },
};

// ---------- Shell ----------

export function CalcShell({
  Icon,
  title,
  subtitle,
  accent,
  children,
}: {
  Icon: any;
  title: string;
  subtitle: string;
  accent: Accent;
  children: ReactNode;
}) {
  const a = accentMap[accent];
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden my-8">
      <div className={`${a.headerGrad} border-b ${a.headerBorder} p-5`}>
        <div className="flex items-center gap-3">
          <div className={`${a.iconBg} p-2.5 rounded-lg shadow-sm`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-600">{subtitle}</p>
          </div>
        </div>
      </div>
      <div className="p-5 sm:p-6 space-y-8">{children}</div>
    </div>
  );
}

// ---------- Section header ----------

export function SectionHeader({
  step,
  title,
  subtitle,
  Icon,
  accent,
}: {
  step: number;
  title: string;
  subtitle: string;
  Icon: any;
  accent: Accent;
}) {
  const a = accentMap[accent];
  return (
    <div className="flex items-center gap-3 pb-3 mb-4 border-b border-gray-200">
      <div className={`${a.sectionBadgeBg} ${a.sectionBadgeText} rounded-lg w-9 h-9 flex items-center justify-center font-bold`}>
        {step}
      </div>
      <Icon className={`w-5 h-5 ${a.sectionIconText}`} />
      <div>
        <h3 className="text-base font-semibold text-gray-900 leading-tight">{title}</h3>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}

// ---------- Info tooltip (click-to-toggle, blur-to-close) ----------

export function InfoTip({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
        aria-label={`More info: ${label}`}
        aria-expanded={open}
        aria-describedby={open ? id : undefined}
        className="inline-flex items-center justify-center w-4 h-4 ml-1 rounded-full text-gray-400 hover:text-gray-700 focus:outline-none focus:text-gray-700 focus:ring-2 focus:ring-gray-300"
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </button>
      {open && (
        <span
          id={id}
          role="tooltip"
          className="absolute left-0 top-6 z-20 w-64 p-3 text-xs font-normal leading-relaxed text-gray-700 bg-white border border-gray-200 rounded-lg shadow-lg"
        >
          {children}
        </span>
      )}
    </span>
  );
}

// ---------- Segmented (radio-as-buttons row) ----------

export function Segmented<T extends string>({
  value,
  onChange,
  options,
  ariaLabel,
  accent,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; name: string; sub?: string }[];
  ariaLabel: string;
  accent: Accent;
}) {
  const a = accentMap[accent];
  return (
    <div role="radiogroup" aria-label={ariaLabel} className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={`flex-1 sm:flex-none px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors text-left sm:text-center min-w-[5rem] ${
              active
                ? `${a.pillActive} shadow-sm`
                : `bg-white border-gray-300 text-gray-700 ${a.hoverBorder} ${a.hoverBg}`
            }`}
          >
            <div>{opt.name}</div>
            {opt.sub && (
              <div className={`text-[11px] mt-0.5 ${active ? 'text-white/80' : 'text-gray-500'}`}>
                {opt.sub}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ---------- Card choice (rich card selector) ----------

export type CardOption<T extends string> = {
  value: T;
  name: string;
  summary?: string;
  sub?: string;
  Icon?: any;
  tier?: string;
  note?: string;
};

export function CardChoice<T extends string>({
  value,
  onChange,
  options,
  ariaLabel,
  columns,
  accent,
}: {
  value: T;
  onChange: (v: T) => void;
  options: CardOption<T>[];
  ariaLabel: string;
  columns?: number;
  accent: Accent;
}) {
  const a = accentMap[accent];
  const colClass =
    columns === 2 ? 'grid-cols-1 sm:grid-cols-2'
    : columns === 3 ? 'grid-cols-1 sm:grid-cols-3'
    : columns === 5 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5'
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
  return (
    <div role="radiogroup" aria-label={ariaLabel} className={`grid ${colClass} gap-2`}>
      {options.map((opt) => {
        const active = opt.value === value;
        const Icon = opt.Icon;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={`text-left p-3 rounded-lg border-2 transition-all ${
              active
                ? `${a.selectedBorder} ${a.selectedBg} ring-2 ${a.selectedRing}`
                : `border-gray-200 bg-white ${a.hoverBorder} ${a.hoverBg}/50`
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              {Icon && (
                <Icon className={`w-4 h-4 ${active ? a.sectionIconText : 'text-gray-500'}`} />
              )}
              <span className={`font-semibold text-sm ${active ? a.selectedText : 'text-gray-900'}`}>
                {opt.name}
              </span>
              {opt.tier && (
                <span className={`ml-auto text-[10px] uppercase tracking-wider font-bold ${active ? a.sectionBadgeText : 'text-gray-400'}`}>
                  {opt.tier}
                </span>
              )}
            </div>
            {(opt.summary || opt.sub) && (
              <div className={`text-xs leading-snug ${active ? a.selectedSummary : 'text-gray-600'}`}>
                {opt.summary || opt.sub}
              </div>
            )}
            {opt.note && (
              <div className={`text-[11px] mt-1.5 leading-snug italic ${active ? a.eyebrow : 'text-gray-500'}`}>
                {opt.note}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ---------- Preset chips + custom input ----------

export function PresetChips({
  value,
  onChange,
  presets,
  formatter,
  accent,
}: {
  value: string;
  onChange: (v: string) => void;
  presets: number[];
  formatter?: (n: number) => string;
  accent: Accent;
}) {
  const a = accentMap[accent];
  const f = formatter ?? ((n: number) => fmt(n));
  return (
    <div className="flex flex-wrap gap-1.5">
      {presets.map((preset) => {
        const active = parseFloat(value) === preset;
        return (
          <button
            key={preset}
            type="button"
            onClick={() => onChange(String(preset))}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              active
                ? a.chipActive
                : `bg-white border-gray-300 text-gray-700 ${a.hoverBorder} ${a.hoverBg}`
            }`}
          >
            {f(preset)}
          </button>
        );
      })}
    </div>
  );
}

// ---------- Range slider with value/ticks ----------

export function RangeSlider({
  value,
  onChange,
  min,
  max,
  step = 1,
  ariaLabel,
  ticks,
  valueSuffix,
  accent,
}: {
  value: string;
  onChange: (v: string) => void;
  min: number;
  max: number;
  step?: number;
  ariaLabel: string;
  ticks?: { value: number; label: string }[];
  valueSuffix?: string;
  accent: Accent;
}) {
  const a = accentMap[accent];
  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full ${a.range}`}
        aria-label={ariaLabel}
      />
      {ticks && (
        <div className="flex justify-between text-[10px] text-gray-500 mt-1">
          {ticks.map((t) => (
            <span key={t.value}>{t.label}</span>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- Number input with suffix ----------

export function NumberInput({
  value,
  onChange,
  min,
  max,
  suffix,
  placeholder,
  ariaLabel,
  className,
  accent,
}: {
  value: string;
  onChange: (v: string) => void;
  min?: number;
  max?: number;
  suffix?: string;
  placeholder?: string;
  ariaLabel: string;
  className?: string;
  accent: Accent;
}) {
  const a = accentMap[accent];
  return (
    <div className={`relative ${className ?? 'max-w-xs'}`}>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className={`w-full px-4 py-2.5 ${suffix ? 'pr-14' : ''} border border-gray-300 rounded-lg focus:ring-2 ${a.focus} focus:border-transparent`}
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
          {suffix}
        </span>
      )}
    </div>
  );
}

// ---------- Fit badge ----------

export type FitTone = 'good' | 'ok' | 'warn' | 'bad';

export function FitBadge({ tone, children }: { tone: FitTone; children: ReactNode }) {
  const cls =
    tone === 'good' ? 'bg-emerald-50 text-emerald-700' :
    tone === 'ok'   ? 'bg-emerald-50 text-emerald-700' :
    tone === 'warn' ? 'bg-amber-50 text-amber-700' :
                      'bg-red-50 text-red-700';
  const Icon = tone === 'bad' ? AlertTriangle : CheckCircle;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cls}`}>
      <Icon className="w-3.5 h-3.5" />
      {children}
    </span>
  );
}

// ---------- Result hero card ----------

export function ResultHero({
  eyebrow,
  value,
  unit,
  secondaryText,
  fitTone,
  fitText,
  warning,
  sidePanel,
  accent,
}: {
  eyebrow: string;
  value: string | number;
  unit: string;
  secondaryText: ReactNode;
  fitTone: FitTone;
  fitText: string;
  warning?: ReactNode;
  sidePanel: { label: string; value: string; valueClass?: string }[];
  accent: Accent;
}) {
  const a = accentMap[accent];
  return (
    <div className={`rounded-2xl p-5 sm:p-6 ring-1 ${a.ring} ${a.resultGrad}`}>
      <div className="grid sm:grid-cols-3 gap-5 items-center">
        <div className="sm:col-span-2">
          <p className={`text-xs uppercase tracking-wider font-bold mb-1 ${a.eyebrow}`}>
            {eyebrow}
          </p>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-4xl sm:text-5xl font-extrabold text-gray-900 tabular-nums">
              {typeof value === 'number' ? fmt(value) : value}
            </span>
            <span className="text-base font-semibold text-gray-600">{unit}</span>
          </div>
          <p className="text-sm text-gray-700 mt-1">{secondaryText}</p>
          <div className="mt-3">
            <FitBadge tone={fitTone}>{fitText}</FitBadge>
          </div>
          {warning && (
            <div className="mt-3 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800 flex gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{warning}</span>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Quick stats</div>
          <div className="space-y-2 text-sm">
            {sidePanel.map((s) => (
              <div key={s.label} className="flex justify-between">
                <span className="text-gray-600">{s.label}</span>
                <span className={`font-semibold tabular-nums ${s.valueClass ?? 'text-gray-900'}`}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Breakdown table ----------

export function BreakdownTable({
  rows,
  totals,
}: {
  rows: { label: string; detail: string; factor: string }[];
  totals: { label: string; value: string; valueClass?: string }[];
}) {
  return (
    <div className="space-y-1.5 text-xs">
      {rows.map((r) => (
        <div
          key={r.label}
          className="grid grid-cols-[auto_1fr_auto] gap-2 py-1 border-b border-gray-100 last:border-0 items-baseline"
        >
          <span className="font-medium text-gray-700">{r.label}</span>
          <span className="text-gray-500 truncate">{r.detail}</span>
          <span className="font-mono text-gray-900 tabular-nums">{r.factor}</span>
        </div>
      ))}
      {totals.map((t) => (
        <div key={t.label} className="pt-2 mt-2 border-t border-gray-300 flex justify-between items-baseline">
          <span className="font-semibold text-gray-900">{t.label}</span>
          <span className={`font-bold tabular-nums ${t.valueClass ?? 'text-gray-900'}`}>{t.value}</span>
        </div>
      ))}
    </div>
  );
}

// ---------- Disclaimer ----------

export function DisclaimerBox({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
      <div className="flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
        <div className="text-[11px] text-gray-700 space-y-1 leading-relaxed">
          <p className="font-semibold text-gray-800">{title}</p>
          {children}
        </div>
      </div>
    </div>
  );
}

// ---------- Live-updates note + results header ----------

export function ResultsHeader({
  title = 'Your result',
}: {
  title?: string;
}) {
  return (
    <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
      <div className="bg-emerald-100 p-1.5 rounded-lg">
        <CheckCircle className="w-4 h-4 text-emerald-700" />
      </div>
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      <span className="ml-auto text-[11px] text-gray-500 hidden sm:inline">
        Updates live as you change inputs
      </span>
    </div>
  );
}
