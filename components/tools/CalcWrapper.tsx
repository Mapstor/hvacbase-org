'use client';

import { ReactNode } from 'react';
import { Calculator } from 'lucide-react';

interface CalcWrapperProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function CalcWrapper({ title, description, children }: CalcWrapperProps) {
  return (
    <div className="calc-container">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-brand-600 p-2 rounded-lg">
          <Calculator size={24} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}
