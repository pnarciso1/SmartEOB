import React from 'react';
import { AlertCircle, FilePenLine } from 'lucide-react';

export interface ReconRow {
  id: string;
  service: string;
  providerBilled: number;
  insuranceAllowed: number;
  planRuleAmount: number;
  memberOwes: number;
  varianceNote?: string;
  status: 'PENDING' | 'VERIFIED' | 'DISPUTED' | 'PAID';
}

interface ReconTableProps {
  rows: ReconRow[];
  onGenerateAppeal?: (rowId: string) => void;
}

const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

export function ReconTable({ rows, onGenerateAppeal }: ReconTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-left text-sm text-gray-600">
        <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-3 font-semibold">Service</th>
            <th className="px-4 py-3 font-semibold">Provider Billed</th>
            <th className="px-4 py-3 font-semibold">Insurance Allowed</th>
            <th className="px-4 py-3 font-semibold text-primary">Plan Rule (Truth)</th>
            <th className="px-4 py-3 font-semibold border-l border-gray-200">Member Owes</th>
            <th className="px-4 py-3 font-semibold">Verdict</th>
            <th className="px-4 py-3 font-semibold text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50/50 bg-white">
              <td className="px-4 py-4 font-medium text-gray-900">{row.service}</td>
              <td className="px-4 py-4">{formatCurrency(row.providerBilled)}</td>
              <td className="px-4 py-4">{formatCurrency(row.insuranceAllowed)}</td>
              <td className="px-4 py-4 font-semibold text-primary">{formatCurrency(row.planRuleAmount)}</td>
              <td className="px-4 py-4 font-bold border-l border-gray-200">
                {formatCurrency(row.memberOwes)}
              </td>
              <td className="px-4 py-4">
                {row.status === 'DISPUTED' ? (
                  <div className="flex flex-col gap-1">
                    <span className="inline-flex w-fit items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                      Discrepancy Found
                    </span>
                    {row.varianceNote && (
                      <p className="text-xs text-red-600 flex items-start gap-1 mt-1">
                        <AlertCircle className="w-3 h-3 mt-0.5 shrink-0" />
                        <span className="line-clamp-2" title={row.varianceNote}>{row.varianceNote}</span>
                      </p>
                    )}
                  </div>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    Verified
                  </span>
                )}
              </td>
              <td className="px-4 py-4 text-right">
                {row.status === 'DISPUTED' && onGenerateAppeal && (
                  <button 
                    onClick={() => onGenerateAppeal(row.id)}
                    className="inline-flex items-center gap-1.5 bg-white border border-accent text-accent hover:bg-accent hover:text-white px-3 py-1.5 rounded text-xs font-medium transition-colors whitespace-nowrap"
                  >
                    <FilePenLine className="w-3.5 h-3.5" /> Draft Appeal
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}