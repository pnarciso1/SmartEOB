'use client';

import { Suspense, useEffect, useState, useRef } from 'react';
import {
  ShieldAlert, CheckCircle, FileText, Loader2, UploadCloud,
  ArrowRight, UserCircle, Building2, Users, BookOpen, X,
  PlusCircle, Sparkles, BadgeCheck,
} from 'lucide-react';
import Link from 'next/link';

// --- Types ---

interface DashboardMetrics {
  openEvents: number;
  actionRequired: number;
  totalSaved: number;
}

interface DiscrepancyQueueItem {
  id: string;
  memberId: string;
  memberName: string;
  providerName: string;
  serviceDate: string;
  varianceAmount: number;
  varianceNote: string;
  status: string;
}

interface MemberData {
  id: string;
  firstName: string;
  lastName: string;
  externalId: string | null;
}

interface EmployerData {
  id: string;
  name: string;
  planDocUrl: string | null;
  planRules: any;
  memberCount: number;
  members: MemberData[];
}

// --- Main Component ---

function AdminDashboardContent({ params }: { params: { tenantId: string } }) {
  const tenantSlug = params.tenantId;

  // Tab state
  const [activeTab, setActiveTab] = useState<'operations' | 'setup'>('operations');

  // Operations tab state
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [queue, setQueue] = useState<DiscrepancyQueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resolvedTenantId, setResolvedTenantId] = useState<string | null>(null);
  const [resolvedEmployerGroupId, setResolvedEmployerGroupId] = useState<string | null>(null);
  const memberId = 'demo-member-id';

  // Plan Setup tab state
  const [employers, setEmployers] = useState<EmployerData[]>([]);
  const [planLoading, setPlanLoading] = useState(false);
  const [isPlanUploading, setIsPlanUploading] = useState<string | null>(null); // holds employerId being processed
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [isMemberImporting, setIsMemberImporting] = useState(false);
  const [activeEmployerForImport, setActiveEmployerForImport] = useState<EmployerData | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const planFileInputRef = useRef<HTMLInputElement>(null);
  const memberFileInputRef = useRef<HTMLInputElement>(null);

  // --- Effects ---

  useEffect(() => {
    document.documentElement.setAttribute('data-tenant', tenantSlug);
  }, [tenantSlug]);

  useEffect(() => {
    fetchDashboard();
  }, [tenantSlug]);

  useEffect(() => {
    if (activeTab === 'setup' && employers.length === 0) {
      fetchPlanSetup();
    }
  }, [activeTab]);

  useEffect(() => {
    if (successToast) {
      const t = setTimeout(() => setSuccessToast(null), 4000);
      return () => clearTimeout(t);
    }
  }, [successToast]);

  // --- API Calls ---

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/v1/admin/dashboard?tenantSlug=${tenantSlug}`);
      if (!res.ok) throw new Error('Failed to fetch dashboard metrics');
      const json = await res.json();
      setMetrics(json.data.metrics);
      setQueue(json.data.queue || []);
      if (json.data.tenantId) setResolvedTenantId(json.data.tenantId);
      if (json.data.employerGroupId) setResolvedEmployerGroupId(json.data.employerGroupId);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlanSetup = async () => {
    try {
      setPlanLoading(true);
      const res = await fetch(`/api/v1/admin/plan-setup?tenantSlug=${tenantSlug}`);
      if (!res.ok) throw new Error('Failed to fetch plan setup data');
      const json = await res.json();
      setEmployers(json.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setPlanLoading(false);
    }
  };

  // --- Claim Upload Handler (real) ---

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      setError(null);
      if (!resolvedTenantId || !resolvedEmployerGroupId) {
        throw new Error('Tenant configuration not loaded. Please refresh and try again.');
      }
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tenantId', resolvedTenantId);
      formData.append('memberId', memberId);
      formData.append('employerGroupId', resolvedEmployerGroupId);
      const res = await fetch('/api/v1/claims/ingest', { method: 'POST', body: formData });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to process document');
      await fetchDashboard();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // --- Simulated Plan Document Upload ---

  const handlePlanDocUpload = (e: React.ChangeEvent<HTMLInputElement>, employerId: string) => {
    if (!e.target.files?.[0]) return;
    setIsPlanUploading(employerId);
    setTimeout(() => {
      setIsPlanUploading(null);
      setSuccessToast('Plan document processed — 14 coverage rules extracted by AI.');
      if (planFileInputRef.current) planFileInputRef.current.value = '';
    }, 2200);
  };

  // --- Simulated Member CSV Import ---

  const handleMemberCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setIsMemberImporting(true);
    setTimeout(() => {
      setIsMemberImporting(false);
      setShowMemberModal(false);
      setSuccessToast(`3 members imported and linked to ${activeEmployerForImport?.name || 'the employer'} plan.`);
      if (memberFileInputRef.current) memberFileInputRef.current.value = '';
    }, 2000);
  };

  // --- Helpers ---

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  const renderPlanRule = (key: string, value: any): string => {
    if (typeof value === 'number') return formatCurrency(value);
    if (typeof value === 'string') return value;
    return JSON.stringify(value);
  };

  // --- Render ---

  return (
    <div className="min-h-screen pb-12 bg-gray-50/50">

      {/* Success Toast */}
      {successToast && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg animate-fade-in">
          <BadgeCheck className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">{successToast}</span>
          <button onClick={() => setSuccessToast(null)} className="ml-2 opacity-70 hover:opacity-100">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Member Import Modal */}
      {showMemberModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Import Member Roster</h3>
                <p className="text-sm text-gray-500 mt-0.5">{activeEmployerForImport?.name}</p>
              </div>
              <button
                onClick={() => setShowMemberModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-5 text-sm text-blue-700">
                Upload a CSV file with columns: <strong>first_name, last_name, member_id, dob, plan_tier</strong>
              </div>
              <input
                type="file"
                accept=".csv"
                className="hidden"
                ref={memberFileInputRef}
                onChange={handleMemberCsvUpload}
              />
              {isMemberImporting ? (
                <div className="flex flex-col items-center gap-3 py-6">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  <p className="text-sm text-gray-600 font-medium">Importing members and linking to plan...</p>
                </div>
              ) : (
                <button
                  onClick={() => memberFileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                >
                  <UploadCloud className="w-5 h-5" />
                  Select CSV File to Upload
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-md transition-colors duration-300">
        <div className="container mx-auto flex justify-between items-center max-w-6xl">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-accent" />
            <h1 className="text-xl font-bold">
              SmartEOB <span className="opacity-75 font-normal ml-1">| TPA Command Center</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="opacity-80 uppercase tracking-widest text-xs font-semibold">[{tenantSlug}]</span>
            <div>
              <input
                type="file"
                accept="application/pdf,image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileUpload}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50"
              >
                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                {isUploading ? 'Simulating Clearinghouse Feed...' : 'Simulate Claim Upload'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6 max-w-6xl mt-4">

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('operations')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'operations'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            Operations
          </button>
          <button
            onClick={() => setActiveTab('setup')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'setup'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Plan Setup
          </button>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-md flex items-center justify-between">
            <div><strong className="font-semibold">Error: </strong><span>{error}</span></div>
            <button onClick={() => setError(null)} className="text-red-700 hover:text-red-900 font-bold">✕</button>
          </div>
        )}

        {/* ── OPERATIONS TAB ── */}
        {activeTab === 'operations' && (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-2 text-gray-800">Tenant Dashboard</h2>
              <p className="text-secondary">Aggregate metrics and discrepancy resolution queue across all employer groups.</p>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : (
              <>
                {/* Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 border-l-4 border-l-primary">
                    <h3 className="font-medium text-gray-500 text-sm uppercase tracking-wider">Open Medical Events</h3>
                    <p className="text-4xl font-bold text-primary mt-2">{metrics?.openEvents || 0}</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 border-l-4 border-l-accent relative overflow-hidden">
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-accent/5" />
                    <h3 className="font-medium text-gray-500 text-sm uppercase tracking-wider">Action Required (Disputes)</h3>
                    <p className="text-4xl font-bold text-accent mt-2">{metrics?.actionRequired || 0}</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 border-l-4 border-l-green-500">
                    <h3 className="font-medium text-gray-500 text-sm uppercase tracking-wider">Total Dollars Saved</h3>
                    <p className="text-4xl font-bold text-green-500 mt-2">{formatCurrency(metrics?.totalSaved || 0)}</p>
                  </div>
                </div>

                {/* Discrepancy Queue */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Discrepancy Resolution Queue</h3>
                      <p className="text-sm text-gray-500 mt-1">Claims flagged by the AI engine requiring Human-in-the-Loop review.</p>
                    </div>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {queue.length} Pending
                    </span>
                  </div>

                  {queue.length === 0 ? (
                    <div className="p-12 text-center">
                      <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                      <h4 className="text-lg font-medium text-gray-700">All clear!</h4>
                      <p className="text-gray-500">There are no disputed claims requiring review at this time.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-white border-b border-gray-200 text-gray-500 uppercase text-xs">
                          <tr>
                            <th className="px-6 py-4 font-semibold">Member</th>
                            <th className="px-6 py-4 font-semibold">Service Date</th>
                            <th className="px-6 py-4 font-semibold">Provider</th>
                            <th className="px-6 py-4 font-semibold text-red-600">Variance Amount</th>
                            <th className="px-6 py-4 font-semibold">AI Flag Note</th>
                            <th className="px-6 py-4 font-semibold text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                          {queue.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                                <UserCircle className="w-4 h-4 text-gray-400" />
                                {item.memberName}
                              </td>
                              <td className="px-6 py-4 text-gray-500">{item.serviceDate}</td>
                              <td className="px-6 py-4">{item.providerName}</td>
                              <td className="px-6 py-4 font-bold text-red-600">{formatCurrency(item.varianceAmount)}</td>
                              <td className="px-6 py-4">
                                <span className="line-clamp-2 text-xs" title={item.varianceNote}>
                                  {item.varianceNote}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <Link
                                  href={`/member/${tenantSlug}/${item.memberId}`}
                                  className="inline-flex items-center gap-1 text-primary hover:text-accent font-medium text-xs uppercase tracking-wider transition-colors"
                                >
                                  Review <ArrowRight className="w-3 h-3" />
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}

        {/* ── PLAN SETUP TAB ── */}
        {activeTab === 'setup' && (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-2 text-gray-800">Plan Setup</h2>
              <p className="text-secondary">Manage employer groups, upload plan documents, and maintain member rosters.</p>
            </div>

            {planLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : employers.length === 0 ? (
              <div className="bg-white rounded-lg border border-dashed border-gray-300 p-16 text-center">
                <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h4 className="text-lg font-medium text-gray-600">No employer groups configured</h4>
                <p className="text-gray-400 text-sm mt-1">Add an employer group to get started.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {employers.map((employer) => (
                  <div key={employer.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

                    {/* Employer Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <Building2 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{employer.name}</h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {employer.memberCount} enrolled {employer.memberCount === 1 ? 'member' : 'members'}
                          </p>
                        </div>
                      </div>
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Active Plan
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">

                      {/* Plan Document Section */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-primary" />
                            <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wider">Plan Document</h4>
                          </div>
                          <div>
                            <input
                              type="file"
                              accept="application/pdf"
                              className="hidden"
                              ref={planFileInputRef}
                              onChange={(e) => handlePlanDocUpload(e, employer.id)}
                            />
                            <button
                              onClick={() => planFileInputRef.current?.click()}
                              disabled={isPlanUploading === employer.id}
                              className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-accent border border-primary/30 hover:border-accent/50 px-3 py-1.5 rounded-md transition-colors disabled:opacity-60"
                            >
                              {isPlanUploading === employer.id ? (
                                <>
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <UploadCloud className="w-3.5 h-3.5" />
                                  Upload New Version
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* AI-Extracted Rules Display */}
                        {employer.planRules && typeof employer.planRules === 'object' ? (
                          <div className="space-y-3">
                            <div className="flex items-center gap-1.5 text-xs text-purple-700 bg-purple-50 border border-purple-200 rounded-md px-3 py-2">
                              <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                              <span className="font-medium">AI-extracted coverage rules — active source of truth</span>
                            </div>
                            <div className="space-y-2">
                              {Object.entries(employer.planRules).map(([key, value]) => {
                                if (key === 'copays' && typeof value === 'object') {
                                  return (
                                    <div key={key}>
                                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-3 mb-2">Copays</p>
                                      {Object.entries(value as Record<string, number>).map(([service, amount]) => (
                                        <div key={service} className="flex justify-between items-center py-1.5 border-b border-gray-50">
                                          <span className="text-sm text-gray-600">{service}</span>
                                          <span className="text-sm font-semibold text-gray-800">
                                            {amount === 0 ? <span className="text-green-600">$0 (Covered 100%)</span> : formatCurrency(amount)}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  );
                                }
                                if (key === 'notes') {
                                  return (
                                    <div key={key} className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
                                      <span className="font-semibold">Note: </span>{String(value)}
                                    </div>
                                  );
                                }
                                return (
                                  <div key={key} className="flex justify-between items-center py-1.5 border-b border-gray-50">
                                    <span className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                    <span className="text-sm font-semibold text-gray-800">{renderPlanRule(key, value)}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                            <FileText className="w-8 h-8 text-gray-300 mb-2" />
                            <p className="text-sm text-gray-500 text-center">No plan document uploaded yet.</p>
                            <p className="text-xs text-gray-400 mt-1">Upload a PDF to extract coverage rules via AI.</p>
                          </div>
                        )}
                      </div>

                      {/* Member Roster Section */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-primary" />
                            <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wider">Member Roster</h4>
                          </div>
                          <button
                            onClick={() => {
                              setActiveEmployerForImport(employer);
                              setShowMemberModal(true);
                            }}
                            className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-accent border border-primary/30 hover:border-accent/50 px-3 py-1.5 rounded-md transition-colors"
                          >
                            <PlusCircle className="w-3.5 h-3.5" />
                            Add Members
                          </button>
                        </div>

                        {employer.members.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                            <Users className="w-8 h-8 text-gray-300 mb-2" />
                            <p className="text-sm text-gray-500">No members enrolled yet.</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {employer.members.map((member) => (
                              <div
                                key={member.id}
                                className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-gray-50 transition-colors group"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                                    {member.firstName[0]}{member.lastName[0]}
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-800">
                                      {member.firstName} {member.lastName}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                      ID: {member.externalId || member.id.slice(0, 8) + '...'}
                                    </p>
                                  </div>
                                </div>
                                <Link
                                  href={`/member/${tenantSlug}/${member.id}`}
                                  className="text-xs text-gray-400 group-hover:text-primary transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100"
                                >
                                  View Portal <ArrowRight className="w-3 h-3" />
                                </Link>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </main>
    </div>
  );
}

export default function AdminDashboard({ params }: { params: { tenantId: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminDashboardContent params={params} />
    </Suspense>
  );
}
