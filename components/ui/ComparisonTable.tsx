'use client';

import { useState } from 'react';
import { ArrowUpDown, Award } from 'lucide-react';

interface ComparisonRow {
  [key: string]: string | number;
}

interface ComparisonTableProps {
  headers: string[];
  rows: ComparisonRow[];
  highlightBest?: { column: string; direction: 'high' | 'low' }[];
  caption?: string;
  winnerLabel?: string;
}

export default function ComparisonTable({
  headers = [],
  rows = [],
  highlightBest = [],
  caption,
  winnerLabel = 'Best Value',
}: ComparisonTableProps) {
  if (!headers || headers.length === 0 || !rows || rows.length === 0) {
    return null;
  }
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const sortedRows = [...rows].sort((a, b) => {
    if (!sortColumn) return 0;
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
    }
    return sortDir === 'asc'
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const bestValues: Record<string, number | string> = {};
  highlightBest.forEach(({ column, direction }) => {
    const vals = rows.map((r) => r[column]).filter((v) => typeof v === 'number') as number[];
    if (vals.length > 0) {
      bestValues[column] = direction === 'high' ? Math.max(...vals) : Math.min(...vals);
    }
  });

  const handleSort = (col: string) => {
    if (sortColumn === col) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(col);
      setSortDir('asc');
    }
  };

  return (
    <div className="my-8 overflow-x-auto">
      {caption && (
        <p className="text-sm text-gray-500 mb-2 font-medium">{caption}</p>
      )}
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                onClick={() => handleSort(h)}
                className="bg-brand-700 text-white px-4 py-3 text-left font-semibold cursor-pointer hover:bg-brand-800 transition-colors select-none"
              >
                <span className="flex items-center gap-1">
                  {h}
                  <ArrowUpDown size={14} className="opacity-50" />
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, i) => (
            <tr key={i} className="border-b border-gray-200 hover:bg-brand-50 transition-colors">
              {headers.map((h) => {
                const isBest = bestValues[h] !== undefined && row[h] === bestValues[h];
                return (
                  <td
                    key={h}
                    className={`px-4 py-3 ${isBest ? 'comparison-winner' : ''} ${
                      i % 2 === 0 ? '' : 'bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      {isBest && <Award size={14} className="text-green-600" />}
                      {row[h]}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
