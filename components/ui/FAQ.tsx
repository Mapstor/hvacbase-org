'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Script from 'next/script';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export default function FAQ({ items = [], title = 'Frequently Asked Questions' }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items || items.length === 0) {
    return null;
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className="my-10">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <h2 id="faq" className="text-2xl font-bold text-gray-900 mb-6">
        {title}
      </h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="faq-item">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="faq-question"
              aria-expanded={openIndex === i}
            >
              <span>{item.question}</span>
              <ChevronDown
                size={20}
                className={`transform transition-transform flex-shrink-0 ml-3 ${
                  openIndex === i ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === i && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
