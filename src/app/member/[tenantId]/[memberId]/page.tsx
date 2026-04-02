'use client';

import { Suspense, useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ShieldAlert, CheckCircle, FileText, Loader2, Info, Activity,
  X, Send, CalendarPlus, Stethoscope, UploadCloud, ScanSearch, Sparkles,
  AlertTriangle, TrendingDown, Heart, DollarSign, Lightbulb, BarChart3,
  Clock, ChevronRight,
} from 'lucide-react';
import { JourneyView, MockClaim } from '@/components/JourneyView';
import { ReconTable, ReconRow } from '@/components/ReconTable';
import { CostNavigatorChat } from '@/components/CostNavigatorChat';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

interface MedicalEventData {
  id: string;
  name: string;
  status: string;
  totalSaved: string;
  claims: MockClaim[];
  reconRows: ReconRow[];
}

interface NextAction {
  title: string;
  description: string;
  actionButtonText: string;
}

interface DisputeItem {
  eventId: string;
  eventName: string;
  createdAt: string;
  status: string;
  claims: {
    claimId: string;
    providerName: string;
    serviceDate: string;
    cptCode: string;
    providerBilled: number;
    discrepancyNote: string;
    status: string;
  }[];
}

interface OptimizeInsight {
  id: string;
  category: string;
  title: string;
  description: string;
  potentialSavings: string | null;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  actionLabel: string;
  actionDetail: string;
}

function MemberPortalContent({ params }: { params: { tenantId: string; memberId: string } }) {
  const tenantSlug = params.tenantId;
  const memberId = params.memberId;
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<'journey' | 'disputes' | 'spending' | 'optimize'>(
    (searchParams.get('tab') as any) || 'journey'
  );

  const [events, setEvents] = useState<MedicalEventData[]>([]);
  const [nextAction, setNextAction] = useState<NextAction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Disputes tab state
  const [disputes, setDisputes] = useState<DisputeItem[]>([]);
  const [disputesLoading, setDisputesLoading] = useState(false);

  // Optimize tab state
  const [insights, setInsights] = useState<OptimizeInsight[]>([]);
  const [optimizeLoading, setOptimizeLoading] = useState(false);
  const [optimizeMessage, setOptimizeMessage] = useState<string | null>(null);

  // Resolved from events API — used for uploads
  const [resolvedTenantId, setResolvedTenantId] = useState<string | null>(null);
  const [resolvedEmployerGroupId, setResolvedEmployerGroupId] = useState<string | null>(null);

  // Bill upload state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const billFileInputRef = useRef<HTMLInputElement>(null);

  // Appeal modal state
  const [isAppealModalOpen, setIsAppealModalOpen] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);
  const [appealDraft, setAppealDraft] = useState('');
  const [activeClaimId, setActiveClaimId] = useState<string | null>(null);

  // Scheduling modal state
  const [isSchedulingModalOpen, setIsSchedulingModalOpen] = useState(false);

  // --- Effects ---

  useEffect(() => {
    document.documentElement.setAttribute('data-tenant', tenantSlug);
  }, [tenantSlug]);

  useEffect(() => {
    fetchData();
  }, [tenantSlug, memberId]);

  useEffect(() => {
    if (activeTab === 'disputes' && disputes.length === 0 && !disputesLoading) fetchDisputes();
    if (activeTab === 'optimize' && insights.length === 0 && !optimizeLoading) fetchOptimize();
  }, [activeTab]);

  // --- Data Fetching ---

  async function fetchData() {
    try {
      setLoading(true);
      const res = await fetch(`/api/v1/events?tenantId=${tenantSlug}&memberId=${memberId}`);
      if (!res.ok) throw new Error('Failed to fetch your medical events');
      const json = await res.json();
      setEvents(json.data || []);

      // Capture resolved IDs for the upload flow
      if (json.meta?.tenantId) setResolvedTenantId(json.meta.tenantId);
      if (json.meta?.employerGroupId) setResolvedEmployerGroupId(json.meta.employerGroupId);

      // Fetch proactive next action
      const actionRes = await fetch(`/api/v1/member/next-action?memberId=${memberId}`);
      if (actionRes.ok) {
        const actionJson = await actionRes.json();
        setNextAction(actionJson.data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchDisputes() {
    try {
      setDisputesLoading(true);
      const res = await fetch(`/api/v1/member/disputes?memberId=${memberId}`);
      if (!res.ok) throw new Error('Failed to fetch disputes');
      const json = await res.json();
      setDisputes(json.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDisputesLoading(false);
    }
  }

  async function fetchOptimize() {
    try {
      setOptimizeLoading(true);
      const res = await fetch(`/api/v1/member/optimize?memberId=${memberId}`);
      if (!res.ok) throw new Error('Failed to fetch insights');
      const json = await res.json();
      setInsights(json.data?.insights || []);
      setOptimizeMessage(json.data?.message || null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setOptimizeLoading(false);
    }
  }

  // --- Bill Upload Handler ---

  const handleBillUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!resolvedTenantId || !resolvedEmployerGroupId) {
      setError('Your account configuration is still loading. Please try again in a moment.');
      return;
    }

    try {
      setIsUploading(true);
      setUploadSuccess(false);
      setError(null);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('tenantId', resolvedTenantId);
      formData.append('memberId', memberId);
      formData.append('employerGroupId', resolvedEmployerGroupId);

      const res = await fetch('/api/v1/claims/ingest', { method: 'POST', body: formData });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to process your document');

      setUploadSuccess(true);
      // Refresh the journey view with the newly created event
      await fetchData();
      setTimeout(() => setUploadSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUploading(false);
      if (billFileInputRef.current) billFileInputRef.current.value = '';
    }
  };

  // --- Appeal Handler ---

  const handleGenerateAppeal = async (rawReconRowId: string) => {
    const claimId = rawReconRowId.replace('recon-', '');
    setActiveClaimId(claimId);
    setIsAppealModalOpen(true);
    setIsDrafting(true);
    setAppealDraft('');

    try {
      const res = await fetch('/api/v1/claims/appeal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claimId }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to draft appeal');
      setAppealDraft(json.data.draftedLetter);
    } catch (err: any) {
      setAppealDraft(`Error generating draft: ${err.message}`);
    } finally {
      setIsDrafting(false);
    }
  };

  const handleSendAppeal = () => {
    alert('Appeal officially submitted via Clearinghouse/Email integration!');
    setIsAppealModalOpen(false);
  };

  // --- Computed values ---

  const totalMemberOwes = events.reduce(
    (sum, ev) => sum + ev.reconRows.reduce((cSum, row) => cSum + row.memberOwes, 0),
    0
  );
  const totalDisputed = events.reduce(
    (sum, ev) => sum + ev.claims.filter((c) => c.status === 'DISPUTED').length,
    0
  );

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  // --- Render ---

  return (
    <div className="min-h-screen pb-12 bg-white">

      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-md transition-colors duration-300">
        <div className="container mx-auto flex justify-between items-center max-w-5xl">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-accent" />
            <h1 className="text-xl font-bold">
              SmartEOB <span className="opacity-75 font-normal ml-1">| Member Portal</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link
              href={`/admin/${tenantSlug}`}
              className="text-accent hover:text-white transition-colors underline"
            >
              Back to Command Center
            </Link>
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6 max-w-5xl mt-6">

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-8 border-b border-gray-200">
          {([
            { key: 'journey', label: 'My Journey', icon: Activity },
            { key: 'disputes', label: 'Disputes', icon: AlertTriangle },
            { key: 'spending', label: 'Spending', icon: BarChart3 },
            { key: 'optimize', label: 'Optimize', icon: Lightbulb },
          ] as const).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === key
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              {key === 'disputes' && disputes.length > 0 && (
                <span className="ml-1 bg-red-100 text-red-600 text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {disputes.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-md flex items-center justify-between">
            <div><strong className="font-semibold">Error: </strong>{error}</div>
            <button onClick={() => setError(null)} className="font-bold">✕</button>
          </div>
        )}

        {/* ── DISPUTES TAB ─────────────────────────────────────────────────── */}
        {activeTab === 'disputes' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Your Disputes</h2>
              <p className="text-gray-500 text-sm mt-1">Claims flagged for billing discrepancies and under active review.</p>
            </div>
            {disputesLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : disputes.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-100">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700">No active disputes</h3>
                <p className="text-gray-400 text-sm mt-1">Any billing discrepancies flagged from your health portal will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {disputes.map((dispute) => (
                  <div key={dispute.eventId} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="bg-amber-50 border-b border-amber-100 px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                        <div>
                          <h3 className="font-semibold text-gray-800">{dispute.eventName}</h3>
                          <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Opened {new Date(dispute.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        {dispute.status}
                      </span>
                    </div>
                    <div className="p-6 space-y-3">
                      {dispute.claims.map((claim) => (
                        <div key={claim.claimId} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-800">{claim.providerName}</p>
                              <p className="text-xs text-gray-500 mt-0.5">Claim ID: {claim.cptCode}</p>
                              {claim.discrepancyNote && (
                                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded p-2 mt-2 leading-relaxed">
                                  {claim.discrepancyNote}
                                </p>
                              )}
                            </div>
                            {claim.providerBilled > 0 && (
                              <div className="text-right flex-shrink-0">
                                <p className="text-xs text-gray-400">Disputed Amount</p>
                                <p className="text-lg font-bold text-red-600">
                                  ${claim.providerBilled.toFixed(2)}
                                </p>
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => handleGenerateAppeal(claim.claimId)}
                            className="mt-3 flex items-center gap-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            Generate Appeal Letter
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── SPENDING TAB ──────────────────────────────────────────────────── */}
        {activeTab === 'spending' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Your Spending</h2>
              <p className="text-gray-500 text-sm mt-1">Financial summary of all reviewed medical claims.</p>
            </div>
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-100">
                <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700">No spending data yet</h3>
                <p className="text-gray-400 text-sm mt-1">Upload a bill on the My Journey tab to start tracking your healthcare spending.</p>
              </div>
            ) : (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Total Billed</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {formatCurrency(events.reduce((s, e) => s + e.reconRows.reduce((rs, r) => rs + r.providerBilled, 0), 0))}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Across {events.length} medical event{events.length !== 1 ? 's' : ''}</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Insurance Paid</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(events.reduce((s, e) => s + e.reconRows.reduce((rs, r) => rs + r.insuranceAllowed, 0), 0))}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Allowed by your plan</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5 shadow-sm">
                    <p className="text-xs text-green-600 uppercase tracking-wider font-semibold mb-1">Your Verified Balance</p>
                    <p className="text-2xl font-bold text-green-700">{formatCurrency(totalMemberOwes)}</p>
                    <p className="text-xs text-green-600 mt-1">After SmartEOB audit</p>
                  </div>
                </div>
                {/* Claims Breakdown */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="font-semibold text-gray-800">Claims Breakdown</h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {events.flatMap((event) =>
                      event.reconRows.map((row, i) => (
                        <div key={`${event.id}-${i}`} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">{row.service}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{event.name}</p>
                          </div>
                          <div className="flex items-center gap-6 text-right text-sm flex-shrink-0">
                            <div>
                              <p className="text-xs text-gray-400">Billed</p>
                              <p className="font-medium text-gray-700">{formatCurrency(row.providerBilled)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400">You Owe</p>
                              <p className={`font-bold ${row.memberOwes === 0 ? 'text-green-600' : 'text-gray-800'}`}>
                                {formatCurrency(row.memberOwes)}
                              </p>
                            </div>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              row.status === 'DISPUTED' ? 'bg-amber-100 text-amber-700' :
                              row.status === 'VERIFIED' ? 'bg-green-100 text-green-700' :
                              'bg-gray-100 text-gray-500'
                            }`}>{row.status}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── OPTIMIZE TAB ──────────────────────────────────────────────────── */}
        {activeTab === 'optimize' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Health & Cost Optimization</h2>
              <p className="text-gray-500 text-sm mt-1">AI-powered insights to help you get more from your health plan.</p>
            </div>
            {optimizeLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
                <p className="text-gray-500">Analyzing your health record for opportunities...</p>
              </div>
            ) : optimizeMessage && insights.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-100">
                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 max-w-sm mx-auto">{optimizeMessage}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {insights.map((insight) => {
                  const categoryColors: Record<string, string> = {
                    COST_SAVINGS: 'bg-green-50 border-green-200 text-green-700',
                    CARE_GAP: 'bg-amber-50 border-amber-200 text-amber-700',
                    BENEFIT_UNUSED: 'bg-blue-50 border-blue-200 text-blue-700',
                    MEDICATION: 'bg-purple-50 border-purple-200 text-purple-700',
                    PREVENTIVE: 'bg-teal-50 border-teal-200 text-teal-700',
                  };
                  const categoryIcons: Record<string, any> = {
                    COST_SAVINGS: TrendingDown,
                    CARE_GAP: AlertTriangle,
                    BENEFIT_UNUSED: Sparkles,
                    MEDICATION: FileText,
                    PREVENTIVE: Heart,
                  };
                  const Icon = categoryIcons[insight.category] || Lightbulb;
                  const colorClass = categoryColors[insight.category] || 'bg-gray-50 border-gray-200 text-gray-700';
                  return (
                    <div key={insight.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                      <div className={`px-5 py-3 border-b flex items-center justify-between ${colorClass}`}>
                        <div className="flex items-center gap-2 text-sm font-semibold">
                          <Icon className="w-4 h-4" />
                          {insight.category.replace('_', ' ')}
                        </div>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          insight.priority === 'HIGH' ? 'bg-red-100 text-red-600' :
                          insight.priority === 'MEDIUM' ? 'bg-amber-100 text-amber-600' :
                          'bg-gray-100 text-gray-500'
                        }`}>{insight.priority}</span>
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-gray-800 mb-2">{insight.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">{insight.description}</p>
                        {insight.potentialSavings && (
                          <p className="text-sm font-bold text-green-600 mb-3">
                            Potential savings: {insight.potentialSavings}
                          </p>
                        )}
                        <button
                          onClick={() => alert(insight.actionDetail)}
                          className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                          {insight.actionLabel} <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── JOURNEY TAB ───────────────────────────────────────────────────── */}
        {activeTab === 'journey' && (
          <>
        {/* Upload Success Banner */}
        {uploadSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="font-semibold">Bill analyzed successfully!</p>
              <p className="text-sm text-green-700 mt-0.5">
                Your document has been processed. Your updated Medical Journey is shown below.
              </p>
            </div>
          </div>
        )}

        {/* Hidden file input — used by both upload entry points */}
        <input
          type="file"
          accept="application/pdf,image/*"
          className="hidden"
          ref={billFileInputRef}
          onChange={handleBillUpload}
        />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <span className="ml-3 text-gray-500">Loading your medical journey...</span>
          </div>
        ) : events.length === 0 ? (

          /* ── EMPTY STATE: No bills yet — upload is the primary CTA ── */
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-12 text-center shadow-sm">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm border border-blue-100">
              <ScanSearch className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Got a bill? Let us check it.</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-2 leading-relaxed">
              Upload any provider invoice or insurance EOB and our AI will instantly verify it against your
              employer plan rules — catching overcharges before you pay.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400 mb-8">
              <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-accent" /> AI-powered audit</span>
              <span>·</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> Three-way reconciliation</span>
              <span>·</span>
              <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5 text-blue-400" /> Instant appeal drafting</span>
            </div>
            <button
              onClick={() => billFileInputRef.current?.click()}
              disabled={isUploading}
              className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-semibold text-base transition-colors shadow-md disabled:opacity-60"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing your bill with AI...
                </>
              ) : (
                <>
                  <UploadCloud className="w-5 h-5" />
                  Upload a Provider Bill or EOB
                </>
              )}
            </button>
            <p className="text-xs text-gray-400 mt-4">Accepts PDF or image files. Your data is encrypted and private.</p>
          </div>

        ) : (

          /* ── ACTIVE STATE: Events exist — upload is a secondary persistent action ── */
          <>
            {/* Upload Another Bill — compact banner */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 mb-8 flex items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-lg p-2 border border-blue-100 shadow-sm">
                  <ScanSearch className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Have another bill?</p>
                  <p className="text-xs text-gray-500">
                    Upload a new provider invoice or EOB to check it against your plan rules.
                  </p>
                </div>
              </div>
              <button
                onClick={() => billFileInputRef.current?.click()}
                disabled={isUploading}
                className="flex-shrink-0 flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-60 shadow-sm"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4" />
                    Upload Bill or EOB
                  </>
                )}
              </button>
            </div>

            {/* AI Advocate Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="md:col-span-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-center md:items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-primary font-bold mb-2">
                    <ShieldAlert className="w-5 h-5 text-accent" />
                    SmartEOB AI Advocate Status
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    We have reviewed your recent medical claims.{' '}
                    {totalDisputed > 0 ? (
                      <span>
                        We detected <strong>{totalDisputed} discrepancy(s)</strong> where you were
                        over-billed or wrongfully denied by insurance. Our engine is currently
                        flagging these for review so you don't overpay.
                      </span>
                    ) : (
                      <span>All claims match your employer plan document perfectly.</span>
                    )}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-100 shadow-sm text-center min-w-[160px]">
                  <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-1">
                    Your Verified Balance
                  </h4>
                  <p className="text-3xl font-black text-primary">{formatCurrency(totalMemberOwes)}</p>
                </div>
              </div>

              {nextAction && (
                <div className="bg-white border border-green-200 rounded-xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-green-50 rounded-bl-full -z-10" />
                  <div>
                    <div className="flex items-center gap-2 text-green-700 font-bold mb-2 text-sm uppercase tracking-wider">
                      <Stethoscope className="w-4 h-4" />
                      Care Coordination
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">{nextAction.title}</h4>
                    <p className="text-xs text-gray-600 line-clamp-3 mb-4">{nextAction.description}</p>
                  </div>
                  <button
                    onClick={() => setIsSchedulingModalOpen(true)}
                    className="w-full flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    <CalendarPlus className="w-4 h-4" />
                    {nextAction.actionButtonText}
                  </button>
                </div>
              )}
            </div>

            {/* Medical Events */}
            {events.map((event) => (
              <div key={event.id} className="mb-12">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
                  <div className="flex items-center gap-2 mb-8 border-b border-gray-100 pb-4">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      Medical Event: {event.name}
                    </h3>
                  </div>
                  <div className="px-4">
                    <JourneyView eventName={event.name} claims={event.claims} />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      Financial Verification (The Truth)
                    </h3>
                  </div>
                  <ReconTable rows={event.reconRows} onGenerateAppeal={handleGenerateAppeal} />
                </div>
              </div>
            ))}
          </>
        )}
          </>
        )}
      </main>

      {/* Cost Navigator Chat Widget */}
      <CostNavigatorChat memberId={memberId} />

      {/* Appeal Modal */}
      {isAppealModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/80">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Agentic Appeal Drafter</h3>
                <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  Powered by Gemini 2.0 Flash
                </p>
              </div>
              <button
                onClick={() => setIsAppealModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              {isDrafting ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <Loader2 className="w-10 h-10 text-accent animate-spin mb-4" />
                  <h4 className="text-gray-800 font-medium">Drafting formal appeal...</h4>
                  <p className="text-sm text-gray-500 mt-2 max-w-sm">
                    Cross-referencing provider invoice, plan rules, and medical context to generate a
                    legally sound dispute.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <label className="text-sm font-semibold text-gray-700 mb-2">
                    Review &amp; Edit Draft (Human-in-the-Loop)
                  </label>
                  <textarea
                    value={appealDraft}
                    onChange={(e) => setAppealDraft(e.target.value)}
                    className="w-full flex-1 min-h-[400px] p-4 rounded-lg border border-gray-200 text-sm text-gray-700 leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent font-sans bg-white shadow-inner resize-none"
                  />
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-white">
              <button
                onClick={() => setIsAppealModalOpen(false)}
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendAppeal}
                disabled={isDrafting}
                className="flex items-center gap-2 px-5 py-2 bg-accent hover:bg-accent/90 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" /> Approve &amp; Submit Appeal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scheduling Modal */}
      {isSchedulingModalOpen && nextAction && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/80">
              <h3 className="text-lg font-bold text-gray-800">Care Orchestrator</h3>
              <button
                onClick={() => setIsSchedulingModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4 text-green-700">
                <CalendarPlus className="w-6 h-6" />
                <h4 className="font-semibold text-lg">{nextAction.title}</h4>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Our AI Care Orchestrator has prepared this action based on your recent medical events
                and plan coverage. Please confirm to proceed.
              </p>
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Provider Network Status</p>
                  <p className="text-sm font-medium text-gray-800 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" /> In-Network Tier 1
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Estimated Patient Responsibility</p>
                  <p className="text-sm font-medium text-gray-800">
                    Calculated via Employer Plan Rules
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  alert(
                    'Agentic workflow triggered! In a live environment, this would call a scheduling API or clear a prior-auth document.'
                  );
                  setIsSchedulingModalOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors"
              >
                <CheckCircle className="w-5 h-5" /> Confirm &amp; Execute
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MemberPortal({ params }: { params: { tenantId: string; memberId: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MemberPortalContent params={params} />
    </Suspense>
  );
}
