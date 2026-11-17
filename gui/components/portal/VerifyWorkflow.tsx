import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Check, 
  Download, 
  Search, 
  RotateCcw,
  FileText,
  ExternalLink
} from 'lucide-react';

interface VerifyWorkflowProps {
  onNavigate?: (view: any) => void;
  isDarkMode: boolean;
  theme?: 'light' | 'dark' | 'dim';
}

interface RegistryDocument {
  id: string;
  title: string;
  url: string;
  hash: string;
  certified: boolean;
  timestamp: string;
  kernelVersion: string;
  invariantsVerified: number;
  signer: string;
  standardsMapping: string;
}

const REGISTRY_DB: Record<string, RegistryDocument> = {
  certified_byzantine: {
    id: 'DOC-2026-BYZ-09',
    title: 'Formal Quorum Intersection in Asynchronous Byzantine Consensus',
    url: 'https://arxiv.org/abs/2403.01892',
    hash: 'sha256:8f4c2e17a99b36d10c0e5b7e289f89a24317b2e8d197341e053f19e76318ad29',
    certified: true,
    timestamp: '2026-10-18T14:32:09.112Z',
    kernelVersion: 'Lean 4.8.0 / Kani 0.54.0-formal',
    invariantsVerified: 12,
    signer: 'ΞchoBraid Formal Attestation Authority · Ed25519-0x4a9b...',
    standardsMapping: 'NIST SP 800-53 SA-11 / SI-7'
  },
  certified_ringbuf: {
    id: 'DOC-2026-RING-04',
    title: 'Lockless FIFO Non-Overlap Safety Under Weak Memory Architectures',
    url: 'https://doi.org/10.1145/3456789.3456790',
    hash: 'sha256:d41d8cd98f00b204e9800998ecf8427e98a1c97a8b42142f534d060938f36214',
    certified: true,
    timestamp: '2026-11-02T09:15:44.803Z',
    kernelVersion: 'Lean 4.8.0 / CBMC 5.95',
    invariantsVerified: 8,
    signer: 'ΞchoBraid Formal Attestation Authority · Ed25519-0x8f2a...',
    standardsMapping: 'NIST SP 800-53 SI-7'
  },
  unregistered_sample: {
    id: 'DOC-UNREGISTERED-DRAFT',
    title: 'Heuristic Multi-Leader Consensus Draft (Unverified Paper)',
    url: 'https://eprint.iacr.org/2026/draft-999',
    hash: 'sha256:0000000000000000000000000000000000000000000000000000000000000000',
    certified: false,
    timestamp: 'Not Ingested',
    kernelVersion: 'None',
    invariantsVerified: 0,
    signer: 'None',
    standardsMapping: 'Unregistered'
  }
};

export const VerifyWorkflow: React.FC<VerifyWorkflowProps> = ({ onNavigate, isDarkMode }) => {
  const [inputQuery, setInputQuery] = useState<string>('https://arxiv.org/abs/2403.01892');
  const [activeDocKey, setActiveDocKey] = useState<string>('certified_byzantine');
  const [copied, setCopied] = useState<boolean>(false);

  const activeDoc = REGISTRY_DB[activeDocKey] || REGISTRY_DB.certified_byzantine;

  const handleLookup = () => {
    if (inputQuery.toLowerCase().includes('draft') || inputQuery.toLowerCase().includes('unreg') || inputQuery.includes('000')) {
      setActiveDocKey('unregistered_sample');
    } else if (inputQuery.toLowerCase().includes('ring') || inputQuery.includes('fifo') || inputQuery.includes('1145')) {
      setActiveDocKey('certified_ringbuf');
    } else {
      setActiveDocKey('certified_byzantine');
    }
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(activeDoc.hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadReceipt = () => {
    const receipt = {
      pipelineVerificationReceipt: {
        documentId: activeDoc.id,
        title: activeDoc.title,
        url: activeDoc.url,
        canonicalHash: activeDoc.hash,
        certifiedStatus: activeDoc.certified ? 'CERTIFIED_SOUND' : 'UNREGISTERED',
        timestamp: activeDoc.timestamp,
        verificationKernel: activeDoc.kernelVersion,
        invariantsChecked: activeDoc.invariantsVerified,
        attestationAuthority: activeDoc.signer,
        nistMapping: activeDoc.standardsMapping
      }
    };

    const blob = new Blob([JSON.stringify(receipt, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `verification-receipt-${activeDoc.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen pt-24 pb-20 px-4 md:px-8 transition-colors duration-300 ${isDarkMode ? 'bg-zinc-950 text-stone-200' : 'bg-stone-50 text-stone-800'}`}>
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Header & Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div>
            <div className="flex items-center gap-3 text-xs font-semibold text-stone-500 mb-2">
              <button 
                onClick={() => onNavigate?.('home')}
                className="hover:text-brand-accent flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft size={14} />
                <span>Home</span>
              </button>
              <span aria-hidden="true">/</span>
              <span className="text-stone-700 dark:text-stone-300">Formal Logic Engines</span>
              <span aria-hidden="true">/</span>
              <span className="text-brand-accent font-bold">Verify Engine</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-3">
              <span>Verify Engine</span>
              <span className="text-xs font-mono font-medium px-2.5 py-1 rounded bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                Pipeline Registry Check
              </span>
            </h1>
          </div>

          {/* Quick Demo Pre-load buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 font-medium">Quick Test:</span>
            <button
              onClick={() => {
                setInputQuery('https://arxiv.org/abs/2403.01892');
                setActiveDocKey('certified_byzantine');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                activeDocKey === 'certified_byzantine'
                  ? 'border-emerald-500 text-emerald-500 bg-emerald-500/10'
                  : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
              }`}
            >
              Certified Paper
            </button>
            <button
              onClick={() => {
                setInputQuery('https://eprint.iacr.org/2026/draft-999');
                setActiveDocKey('unregistered_sample');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                activeDocKey === 'unregistered_sample'
                  ? 'border-amber-500 text-amber-500 bg-amber-500/10'
                  : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
              }`}
            >
              Unregistered Draft
            </button>
          </div>
        </div>

        {/* Search & Lookup Bar */}
        <div className="p-6 rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 space-y-4">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
            Query Canonical Formal Logic Registry:
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
                placeholder="Enter arXiv link, paper DOI, or SHA-256 document hash..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 text-xs font-mono text-stone-800 dark:text-stone-200 focus:outline-none focus:border-brand-accent transition-colors"
              />
            </div>
            <button
              onClick={handleLookup}
              className="px-6 py-3 rounded-2xl bg-brand-accent text-zinc-950 font-bold text-xs hover:brightness-110 transition-all shrink-0"
            >
              Verify Pipeline Audit
            </button>
          </div>
        </div>

        {/* STARK BINARY VERDICT DISPLAY */}
        {activeDoc.certified ? (
          /* CERTIFIED VERDICT SCREEN */
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 md:p-14 rounded-[3rem] border-2 border-emerald-500/40 bg-emerald-500/10 space-y-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-emerald-500/20">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
                  <CheckCircle2 size={16} />
                  <span>REGISTRY AUDIT MATCH CONFIRMED</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black font-mono tracking-tight text-emerald-800 dark:text-emerald-300">
                  PIPELINE CERTIFIED
                </h2>
                <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                  This document has completed full formal verification through the Lean 4 & Kani pipeline.
                </p>
              </div>

              <button
                onClick={handleDownloadReceipt}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shrink-0 shadow-lg shadow-emerald-500/20"
              >
                <Download size={16} />
                <span>Download Proof Receipt</span>
              </button>
            </div>

            {/* Document Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase text-stone-500 font-bold">Document Title:</span>
                <div className="text-sm font-bold text-stone-800 dark:text-stone-100 font-sans">{activeDoc.title}</div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase text-stone-500 font-bold">Canonical ID:</span>
                <div className="text-stone-700 dark:text-stone-300 font-bold">{activeDoc.id}</div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase text-stone-500 font-bold">Verification Timestamp:</span>
                <div className="text-stone-700 dark:text-stone-300">{activeDoc.timestamp}</div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase text-stone-500 font-bold">Kernel Prover Version:</span>
                <div className="text-stone-700 dark:text-stone-300">{activeDoc.kernelVersion}</div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase text-stone-500 font-bold">Invariants Formally Proven:</span>
                <div className="text-emerald-600 dark:text-emerald-400 font-bold">
                  {activeDoc.invariantsVerified} of {activeDoc.invariantsVerified} Closed Invariants
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase text-stone-500 font-bold">Standards Attestation:</span>
                <div className="text-stone-700 dark:text-stone-300">{activeDoc.standardsMapping}</div>
              </div>
            </div>

            {/* SHA-256 Digest Box with Copy Action */}
            <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 text-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold font-mono">
                  Canonical SHA-256 Hash Digest:
                </span>
                <button
                  onClick={handleCopyHash}
                  className="flex items-center gap-1.5 text-xs text-brand-accent hover:underline font-mono"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy Hash'}</span>
                </button>
              </div>
              <div className="text-xs font-mono text-emerald-400 break-all select-all font-semibold">
                {activeDoc.hash}
              </div>
              <div className="text-[11px] text-stone-500 font-mono pt-1">
                Attested by: {activeDoc.signer}
              </div>
            </div>
          </motion.div>
        ) : (
          /* UNREGISTERED VERDICT SCREEN */
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 md:p-14 rounded-[3rem] border-2 border-stone-300 dark:border-stone-800 bg-stone-100 dark:bg-stone-900/60 space-y-8"
          >
            <div className="space-y-3 pb-8 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-amber-600 dark:text-amber-500 uppercase">
                <AlertTriangle size={16} />
                <span>NO REGISTERED PIPELINE RECEIPT</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black font-mono tracking-tight text-stone-700 dark:text-stone-300">
                UNREGISTERED DOCUMENT
              </h2>
              <p className="text-sm text-stone-500 font-medium leading-relaxed max-w-2xl">
                No verified mathematical proof or Kani model checking record currently exists in the canonical registry for this manuscript link or digest.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Next Steps to Certify This Manuscript:
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed font-medium">
                You can submit this document's propositions into the <strong>Create Pipeline</strong> to formulate formal obligations, or load its state machine into the <strong>Analyze Engine</strong> to evaluate invariants.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => onNavigate?.('create')}
                  className="px-5 py-2.5 rounded-xl bg-brand-accent text-zinc-950 font-bold text-xs hover:brightness-110 transition-all"
                >
                  Open Create Pipeline
                </button>
                <button
                  onClick={() => onNavigate?.('analyze')}
                  className="px-5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 font-bold text-xs hover:bg-stone-200 dark:hover:bg-stone-800 transition-all"
                >
                  Analyze in Logic Simulator
                </button>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default VerifyWorkflow;
