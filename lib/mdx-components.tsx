import Callout from '@/components/ui/Callout';
import ComparisonTable from '@/components/ui/ComparisonTable';
import FAQ from '@/components/ui/FAQ';
import RelatedArticles from '@/components/ui/RelatedArticles';
import SourceLink from '@/components/ui/SourceLink';
import TableOfContents from '@/components/ui/TableOfContents';
import CalcWrapper from '@/components/calculators/CalcWrapper';
import SEERCalculator from '@/components/tools/SEERCalculator';

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

// FAQ wrapper to handle both 'questions' prop and FAQ.Item children
const FAQWrapper = ({ questions, items, children, ...props }: any) => {
  // If items or questions are provided, use them directly
  if (items || questions) {
    return <FAQ items={items || questions || []} {...props} />;
  }
  
  // If children are provided (FAQ.Item format), extract the questions and answers
  if (children) {
    const extractedItems: any[] = [];
    
    // Handle children as array or single element
    const childArray = Array.isArray(children) ? children : [children];
    
    childArray.forEach((child: any) => {
      // Look for FAQ.Item components
      if (child?.props?.mdxType === 'FAQ.Item' || child?.type?.name === 'FAQ.Item') {
        extractedItems.push({
          question: child.props.question,
          answer: typeof child.props.children === 'string' 
            ? child.props.children 
            : child.props.children?.props?.children || ''
        });
      }
    });
    
    if (extractedItems.length > 0) {
      return <FAQ items={extractedItems} {...props} />;
    }
  }
  
  return <FAQ items={[]} {...props} />;
};

// FAQ.Item component for nested syntax
FAQWrapper.Item = ({ question, children }: { question: string; children: any }) => {
  // This component is only used as a marker for extraction
  // The actual rendering is done by the parent FAQ component
  return null;
};


// BTU Calculator component
const BTUCalculator = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">BTU Calculator</h3>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Room Square Footage
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="Enter square feet"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Climate Zone
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500">
            <option>Zone 1 - Hot & Humid</option>
            <option>Zone 2 - Hot & Dry</option>
            <option>Zone 3 - Warm</option>
            <option>Zone 4 - Mixed</option>
            <option>Zone 5 - Cool</option>
            <option>Zone 6 - Cold</option>
            <option>Zone 7 - Very Cold</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ceiling Height
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500">
            <option>8 feet (standard)</option>
            <option>9 feet</option>
            <option>10 feet</option>
            <option>11+ feet (vaulted)</option>
          </select>
        </div>
        <button
          type="button"
          className="w-full py-3 px-4 bg-brand-600 text-white font-semibold rounded-md hover:bg-brand-700 transition-colors"
        >
          Calculate BTU Requirements
        </button>
      </form>
      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <p className="text-sm text-gray-600">
          <strong>Recommended BTU:</strong> Enter your details above to calculate
        </p>
      </div>
    </div>
  );
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
  table: (props: any) => <table className="min-w-full divide-y divide-gray-200 my-6" {...props} />,
  thead: (props: any) => <thead className="bg-gray-50" {...props} />,
  tbody: (props: any) => <tbody className="bg-white divide-y divide-gray-200" {...props} />,
  th: (props: any) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props} />
  ),
  td: (props: any) => <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700" {...props} />,
};