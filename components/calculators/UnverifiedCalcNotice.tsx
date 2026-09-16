// Rendered in place of any calculator whose formulas have not yet been
// re-verified against primary sources (ENERGY STAR / DOE / ACCA Manual J / NEC).
//
// The gate is driven by the `UNVERIFIED_TYPES` set in
// components/calculators/CalcWrapper.tsx, covering every calc invoked via
// <CalcWrapper type/calculator="..." />. As of the audit completion that set
// is empty (all calcs verified) and the legacy SEERCalculator binding was
// retired — this notice is kept for reuse if a calc is ever re-gated.

interface UnverifiedCalcNoticeProps {
  siblingSlug?: string;
  siblingLabel?: string;
}

export default function UnverifiedCalcNotice({
  siblingSlug,
  siblingLabel,
}: UnverifiedCalcNoticeProps = {}) {
  return (
    <div className="my-8 rounded-xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <span
          className="text-2xl leading-none flex-shrink-0 select-none"
          aria-hidden="true"
        >
          🔧
        </span>
        <div className="min-w-0">
          <h3 className="font-semibold text-amber-900 text-base sm:text-lg mb-2">
            This calculator is being re-verified
          </h3>
          <p className="text-sm text-amber-900 leading-relaxed">
            We&rsquo;re auditing all of our calculators against primary-source standards
            (ENERGY STAR, DOE, ACCA Manual J, NEC) and re-publishing each once its
            math is confirmed. This one will be back shortly.
          </p>
          {siblingSlug && siblingLabel && (
            <p className="mt-4 text-sm">
              <a
                href={siblingSlug}
                className="inline-flex items-center gap-1 font-medium text-amber-900 underline decoration-amber-500 decoration-2 underline-offset-2 hover:decoration-amber-700"
              >
                Try our {siblingLabel} <span aria-hidden="true">→</span>
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
