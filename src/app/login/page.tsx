'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, ArrowRight, User } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<'MEMBER' | 'ADMIN'>('MEMBER');
  const [tenantSlug, setTenantSlug] = useState('tpa_a');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'ADMIN') {
      router.push(`/admin/${tenantSlug}`);
    } else {
      // Hardcoding the seeded demo member ID for the POC
      router.push(`/member/${tenantSlug}/demo-member-id`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary/10 p-3 rounded-full mb-4">
            <ShieldAlert className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">SmartEOB Platform</h1>
          <p className="text-gray-500 text-sm mt-1">Multi-Tenant Healthcare AI Engine</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Select Persona</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('MEMBER')}
                className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${
                  role === 'MEMBER' 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                <User className="w-6 h-6" />
                <span className="text-sm font-semibold">Patient / Member</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('ADMIN')}
                className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${
                  role === 'ADMIN' 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                <ShieldAlert className="w-6 h-6" />
                <span className="text-sm font-semibold">TPA Admin</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Select Network</label>
            <select 
              value={tenantSlug}
              onChange={(e) => setTenantSlug(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="tpa_a">Northwest HSA Admin</option>
              <option value="tpa_b">Southern Benefits Group</option>
            </select>
          </div>

          <button 
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium p-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            Access Portal <ArrowRight className="w-4 h-4" />
          </button>
          
        </form>

      </div>
    </div>
  );
}