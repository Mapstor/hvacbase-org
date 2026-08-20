import Callout from '@/components/ui/Callout';
import ComparisonTable from '@/components/ui/ComparisonTable';
import FAQ from '@/components/ui/FAQ';
import RelatedArticles from '@/components/ui/RelatedArticles';
import SourceLink from '@/components/ui/SourceLink';
import TableOfContents from '@/components/ui/TableOfContents';
import CalcWrapper from '@/components/calculators/CalcWrapper';
import BTUCalculator from '@/components/calculators/BTUCalculator';
import SEERCalculator from '@/components/tools/SEERCalculator';
import EfficiencyCurve from '@/components/diagrams/EfficiencyCurve';
import ComparisonChart from '@/components/diagrams/ComparisonChart';
import ScaleDiagram from '@/components/diagrams/ScaleDiagram';
import DataChart from '@/components/diagrams/DataChart';
import RefrigerationCycle from '@/components/diagrams/RefrigerationCycle';
import CarbonMonoxideDetectorPlacement from '@/components/diagrams/CarbonMonoxideDetectorPlacement';
import DryModeVsCoolMode from '@/components/diagrams/DryModeVsCoolMode';
import BatteryRuntimeByLoad from '@/components/diagrams/BatteryRuntimeByLoad';

// Define SourcesBox component
const SourcesBox = ({ sources }: { sources: Array<{ text?: string; label?: string; url: string }> }) => {
  if (!sources || sources.length === 0) return null;
  
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-8">
      <h3 className="text-lg font-semibold mb-4">Sources & References</h3>
      <ul className="space-y-2">
        {sources.map((source, index) => (
          <li key={index}>
            <SourceLink href={source.url} text={source.text || source.label || 'Source'} />
          </li>
        ))}
      </ul>
    </div>
  );
};

// Recursively extract plain text from MDX children (strings, fragments,
// React elements). Used by FAQWrapper to turn FAQ.Item bodies into answer
// strings for the FAQPage JSON-LD + the visible answer text.
function extractText(node: any): string {
  if (node == null || node === false) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join(' ').replace(/\s+/g, ' ').trim();
  if (typeof node === 'object' && node.props) return extractText(node.props.children);
  return '';
}

// FAQ wrapper handling three source patterns:
//   1) <FAQ items={[...]}> or <FAQ questions={[...]}> — modern prop form
//   2) <FAQ><FAQ.Item question="...">answer</FAQ.Item>...</FAQ> — marker children
//   3) <FAQ><div itemScope itemType="…/FAQPage">…</div></FAQ> — legacy microdata
//      children, used by ~8 files. Passed through inside a section + heading so
//      schema.org microdata reaches the DOM and users see the FAQ heading.
const FAQWrapper = ({ questions, items, children, title, ...props }: any) => {
  if (items || questions) {
    return <FAQ items={items || questions || []} title={title} {...props} />;
  }

  if (children) {
    const childArray = Array.isArray(children) ? children : [children];
    const extractedItems = childArray
      .filter((child: any) => child?.props?.question)
      .map((child: any) => ({
        question: child.props.question,
        answer: extractText(child.props.children),
      }));
    if (extractedItems.length > 0) {
      return <FAQ items={extractedItems} title={title} {...props} />;
    }
    return (
      <section className="my-10">
        <h2 id="faq" className="text-2xl font-bold text-gray-900 mb-6">
          {title || 'Frequently Asked Questions'}
        </h2>
        {children}
      </section>
    );
  }

  return <FAQ items={[]} title={title} {...props} />;
};

// FAQ.Item marker — never renders on its own; FAQWrapper extracts its
// `question` prop + children text and passes them to <FAQ items={...}>.
FAQWrapper.Item = ({ question, children }: { question: string; children: any }) => {
  return null;
};


// Key Takeaway component
const KeyTakeaway = ({ children, ...props }: any) => {
  return (
    <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg px-6 py-4 my-8" {...props}>
      <div className="flex items-center gap-2 font-semibold text-green-800 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22,4 12,14.01 9,11.01"/>
        </svg>
        Key Takeaway
      </div>
      <div className="text-gray-700 leading-7 text-[15px]">
        {children}
      </div>
    </div>
  );
};

// ComparisonTable wrapper to handle array rows
const ComparisonTableWrapper = ({ headers, rows, ...props }: any) => {
  // Convert array rows to object rows if needed
  const processedRows = rows && rows[0] && Array.isArray(rows[0]) 
    ? rows.map((row: any[]) => {
        const obj: any = {};
        headers.forEach((header: string, index: number) => {
          obj[header] = row[index];
        });
        return obj;
      })
    : rows;
  
  return <ComparisonTable headers={headers} rows={processedRows} {...props} />;
};

export const mdxComponents = {
  BTUCalculator,
  Callout,
  CalcWrapper,
  ComparisonTable: ComparisonTableWrapper,
  FAQ: FAQWrapper,
  KeyTakeaway,
  RelatedArticles,
  SEERCalculator,
  SourceLink,
  SourcesBox,
  TableOfContents,
  EfficiencyCurve,
  ComparisonChart,
  ScaleDiagram,
  DataChart,
  RefrigerationCycle,
  CarbonMonoxideDetectorPlacement,
  DryModeVsCoolMode,
  BatteryRuntimeByLoad,
  // Add default HTML elements with Tailwind classes and IDs
  h1: (props: any) => {
    const id = props.children?.toString()?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return <h1 id={id} className="text-4xl font-bold mb-6 text-gray-900" {...props} />;
  },
  h2: (props: any) => {
    const id = props.children?.toString()?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return <h2 id={id} className="text-3xl font-semibold mt-8 mb-4 text-gray-900" {...props} />;
  },
  h3: (props: any) => {
    const id = props.children?.toString()?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return <h3 id={id} className="text-2xl font-semibold mt-6 mb-3 text-gray-900" {...props} />;
  },
  h4: (props: any) => <h4 className="text-xl font-semibold mt-4 mb-2 text-gray-900" {...props} />,
  p: (props: any) => <p className="text-gray-700 leading-relaxed mb-4" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700" {...props} />,
  li: (props: any) => <li className="ml-4" {...props} />,
  a: (props: any) => <a className="text-blue-600 hover:underline" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-700" {...props} />
  ),
  code: (props: any) => <code className="bg-gray-100 rounded px-1 py-0.5 text-sm" {...props} />,
  pre: (props: any) => <pre className="bg-gray-100 rounded p-4 overflow-x-auto my-4" {...props} />,
  table: (props: any) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-gray-200" {...props} />
    </div>
  ),
  thead: (props: any) => <thead className="bg-gray-50" {...props} />,
  tbody: (props: any) => <tbody className="bg-white divide-y divide-gray-200" {...props} />,
  th: (props: any) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props} />
  ),
  td: (props: any) => <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700" {...props} />,
};