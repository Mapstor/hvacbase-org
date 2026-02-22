'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, List } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const elements = document.querySelectorAll('article h2, article h3');
    const items: TOCItem[] = Array.from(elements).map((el) => ({
      id: el.id,
      text: el.textContent || '',
      level: el.tagName === 'H2' ? 2 : 3,
    }));
    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -70% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="bg-gray-50 border border-gray-200 rounded-xl p-5 my-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="flex items-center gap-2 font-semibold text-gray-900">
          <List size={18} />
          Table of Contents
        </span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {isOpen && (
        <ol className="mt-3 space-y-1 list-none pl-0">
          {headings.map((h) => (
            <li key={h.id} className={h.level === 3 ? 'pl-5' : ''}>
              <a
                href={`#${h.id}`}
                className={`block py-1 text-sm transition-colors hover:text-brand-600 ${
                  activeId === h.id
                    ? 'text-brand-600 font-medium'
                    : 'text-gray-600'
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
