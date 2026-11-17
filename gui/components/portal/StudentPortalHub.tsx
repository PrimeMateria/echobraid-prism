import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Workflow, 
  ShieldCheck, 
  FileText, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Search, 
  Terminal,
  Activity,
  Code2
} from 'lucide-react';

interface StudentPortalHubProps {
  onSelectWorkflow: (workflow: 'analyze' | 'verify' | 'create') => void;
  onNavigateHome: () => void;
  isDarkMode: boolean;
}

export const StudentPortalHub: React.FC<StudentPortalHubProps> = ({
  onSelectWorkflow,
  onNavigateHome,
  isDarkMode
}) => {
  return (
    <div className="space-y-12">
      {/* Top Header & Breadcrumb */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-8">
        <div className="flex items-center gap-3 text-xs font-semibold text-stone-500 mb-3">
          <button 
            onClick={onNavigateHome}
            className="hover:text-brand-accent flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Platform Overview</span>
          </button>
          <span aria-hidden="true">/</span>
          <span className="text-stone-700 dark:text-stone-300">Formal Verification Station</span>
          <span aria-hidden="true">/</span>
          <span className="text-brand-accent">Student Portal Workflows</span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-brand-accent font-bold block mb-2">
              AxiomScan Verification Station
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              Analyze, Verify & Create
            </h1>
          </div>
          <p className="text-sm text-stone-500 max-w-md font-medium leading-relaxed">
            A three-engine formal studio designed for mathematical verification, pipeline certification checks, and rigorous idea validation.
          </p>
        </div>
      </div>

      {/* TOP ROW: ANALYZE AND VERIFY SIDE BY SIDE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* WORKFLOW 1: ANALYZE */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className={`p-8 md:p-10 rounded-[2.5rem] border flex flex-col justify-between transition-all ${
            isDarkMode 
              ? 'bg-zinc-900/40 border-stone-800 hover:border-brand-accent/50' 
              : 'bg-white border-stone-200 hover:border-brand-accent/50 shadow-sm'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="w-14 h-14 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
                <Workflow size={28} />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-sky-500 font-bold">
                Engine 01 · Simulation
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-4">
              Analyze Workflow
            </h2>

            <p className="text-sm md:text-base text-stone-500 dark:text-stone-400 font-medium leading-relaxed mb-6">
              Ingest LaTeX manuscripts, research URLs, or formal specifications. The engine automatically extracts state variables and loads them into an interactive logic simulator to test invariants and guard transitions.
            </p>

            <div className="space-y-3 mb-8">
              {[
                { title: 'LaTeX & URL Ingestion', desc: 'Decompose propositions into verifiable state variables.' },
                { title: 'Interactive State Machine', desc: 'Step through state transitions with live guard evaluation.' },
                { title: 'Invariant Assertion Dials', desc: 'Monitor safety, liveness, and non-reentrancy properties in real time.' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs">
                  <span className="w-5 h-5 rounded-md bg-sky-500/10 text-sky-500 flex items-center justify-center font-mono font-bold shrink-0 mt-0.5">
                    0{idx + 1}
                  </span>
                  <div>
                    <strong className="text-stone-800 dark:text-stone-200 block">{item.title}</strong>
                    <span className="text-stone-500">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onSelectWorkflow('analyze')}
            className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm transition-all shadow-sm"
          >
            <span>Launch Analyze Simulator</span>
            <ArrowRight size={16} />
          </button>
        </motion.div>

        {/* WORKFLOW 2: VERIFY */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className={`p-8 md:p-10 rounded-[2.5rem] border flex flex-col justify-between transition-all ${
            isDarkMode 
              ? 'bg-zinc-900/40 border-stone-800 hover:border-emerald-500/50' 
              : 'bg-white border-stone-200 hover:border-emerald-500/50 shadow-sm'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <ShieldCheck size={28} />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-500 font-bold">
                Engine 02 · Registry Check
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-4">
              Verify Workflow
            </h2>

            <p className="text-sm md:text-base text-stone-500 dark:text-stone-400 font-medium leading-relaxed mb-6">
              Instantly check if an article or specification has already passed through the formal pipeline. Leads to a stark, high-contrast binary audit verdict screen with canonical cryptographic proof hashes.
            </p>

            <div className="space-y-3 mb-8">
              {[
                { title: 'Instant Registry Lookup', desc: 'Search by article title, arXiv link, DOI, or SHA-256 hash.' },
                { title: 'Stark Binary Verdict Screen', desc: 'Direct, unambiguous "PIPELINE CERTIFIED" or "UNREGISTERED" stamp.' },
                { title: 'Cryptographic Receipts', desc: 'Inspect verified timestamps, verified invariant counts, and signer signatures.' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs">
                  <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-mono font-bold shrink-0 mt-0.5">
                    0{idx + 1}
                  </span>
                  <div>
                    <strong className="text-stone-800 dark:text-stone-200 block">{item.title}</strong>
                    <span className="text-stone-500">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onSelectWorkflow('verify')}
            className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-sm"
          >
            <span>Run Pipeline Verification Lookup</span>
            <ArrowRight size={16} />
          </button>
        </motion.div>

      </div>

      {/* BOTTOM ROW: CREATE SITUATED UNDERNEATH AS FULL-WIDTH BANNER */}
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
        className={`p-8 md:p-12 rounded-[3rem] border transition-all ${
          isDarkMode 
            ? 'bg-zinc-900/30 border-stone-800 hover:border-brand-accent/40' 
            : 'bg-white border-stone-200 hover:border-brand-accent/40 shadow-sm'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-8 pb-8 border-b border-stone-200 dark:border-stone-800">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/10 text-brand-accent flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-brand-accent font-bold">
                Engine 03 · Creation & Certification
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">
              Create Workflow: Idea Validation Pipeline
            </h2>
            <p className="text-sm text-stone-500 max-w-2xl font-medium leading-relaxed">
              Take an unproven conceptual thesis through a structured 4-stage pipeline: formulate the problem, synthesize formal proof obligations, stress-test boundary edges, and generate a certified NIST OSCAL attestation.
            </p>
          </div>

          <button
            onClick={() => onSelectWorkflow('create')}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm transition-all whitespace-nowrap shrink-0 shadow-sm hover:scale-105 ${
              isDarkMode 
                ? 'bg-brand-accent text-zinc-950 hover:brightness-110' 
                : 'bg-stone-900 text-stone-100 hover:bg-stone-800'
            }`}
          >
            <span>Launch 4-Stage Creation Pipeline</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* 4-Stage Sequential Preview Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { step: 'Stage 1', title: 'Problem Formulation', desc: 'Draft context, target domain, and operating assumptions.' },
            { step: 'Stage 2', title: 'Proof Obligations', desc: 'Synthesize formal invariants and mathematical predicates.' },
            { step: 'Stage 3', title: 'Edge Simulation', desc: 'Perturb state and stress-test boundary failure cases.' },
            { step: 'Stage 4', title: 'Certification Export', desc: 'Generate cryptographic seal & export NIST SP 800-53 OSCAL file.' }
          ].map((stage, idx) => (
            <div 
              key={idx}
              className={`p-5 rounded-2xl border ${
                isDarkMode ? 'bg-zinc-950/60 border-stone-800' : 'bg-stone-50 border-stone-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent font-bold">
                  {stage.step}
                </span>
                <span className="text-stone-400 font-mono text-xs">
                  0{idx + 1}/04
                </span>
              </div>
              <h4 className="text-sm font-bold text-stone-800 dark:text-stone-200 mb-1">
                {stage.title}
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed font-medium">
                {stage.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
