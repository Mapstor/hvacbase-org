import { ExternalLink } from 'lucide-react';

interface SourceLinkProps {
  href: string;
  text: string;
  source?: string;
}

export default function SourceLink({ href, text, source }: SourceLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-800 underline decoration-brand-300 hover:decoration-brand-500 transition-colors"
    >
      {text}
      {source && <span className="text-xs text-gray-400 ml-1">({source})</span>}
      <ExternalLink size={12} className="flex-shrink-0" />
    </a>
  );
}

interface SourcesBoxProps {
  sources: { text: string; href: string; org: string }[];
}

export function SourcesBox({ sources }: SourcesBoxProps) {
  return (
    <div className="mt-10 pt-6 border-t border-gray-200">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
        Sources & References
      </h3>
      <ol className="list-decimal list-inside space-y-1.5">
        {sources.map((s, i) => (
          <li key={i} className="text-sm text-gray-600">
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:text-brand-800 underline"
            >
              {s.text}
            </a>
            <span className="text-gray-400 ml-1">— {s.org}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
