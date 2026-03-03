import React from 'react';
import { Stethoscope, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

// Mock data type representing a Claim in an Event
export interface MockClaim {
  id: string;
  providerName: string;
  serviceDate: string;
  cptCode: string;
  status: 'PENDING' | 'VERIFIED' | 'DISPUTED' | 'PAID';
}

interface JourneyViewProps {
  eventName: string;
  claims: MockClaim[];
}

export function JourneyView({ eventName, claims }: JourneyViewProps) {
  return (
    <div className="relative border-l-2 border-primary/20 ml-4 py-2">
      <div className="mb-6 ml-6 relative">
        <span className="absolute -left-[37px] bg-primary text-white p-1 rounded-full shadow-md">
          <Stethoscope className="w-5 h-5" />
        </span>
        <h4 className="text-xl font-bold text-gray-800">{eventName}</h4>
        <p className="text-sm text-gray-500">Event timeline clustering based on semantic diagnosis grouping.</p>
      </div>

      <div className="space-y-4 ml-6">
        {claims.map((claim, index) => (
          <div key={claim.id} className="relative bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <span className="absolute -left-[33px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-accent ring-4 ring-white" />
            
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <div className="bg-blue-50 text-accent p-2 rounded-md">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800">{claim.providerName}</h5>
                  <p className="text-xs text-gray-500 font-mono">Date: {claim.serviceDate} • CPT: {claim.cptCode}</p>
                </div>
              </div>
              
              <div>
                {claim.status === 'VERIFIED' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                    <CheckCircle2 className="w-3 h-3" /> VERIFIED
                  </span>
                )}
                {claim.status === 'DISPUTED' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                    <AlertCircle className="w-3 h-3" /> DISPUTED
                  </span>
                )}
                {claim.status === 'PENDING' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200">
                    PENDING
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}