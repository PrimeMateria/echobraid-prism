import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  Workflow, 
  ArrowRight, 
  Sparkles, 
  FileCode, 
  Search,
  Activity,
  Layers
} from 'lucide-react';

interface FormalLogicEntrywayProps {
  onNavigate?: (view: any) => void;
  isDarkMode: boolean;
  theme?: 'light' | 'dark' | 'dim';
}

export const FormalLogicEntryway: React.FC<FormalLogicEntrywayProps> = ({ 
  onNavigate, 
  isDarkMode, 
  theme 
}) => {
  return (
    <section className={`py-24 border-t transition-colors duration-700 ${
      theme === 'dark' ? 'bg-zinc-950 border-stone-800/60' : 
      theme === 'dim' ? 'bg-stone-900 border-stone-800' : 
      'bg-brand-light border-stone-200/70'
    }`}>
      <div className="container mx-auto px-8">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-brand-accent block mb-4">
            High-Assurance Verification & Certification
          </span>
          <h2 className={`text-3xl md:text-5xl font-bold leading-tight mb-6 ${
            theme === 'dark' || theme === 'dim' ? 'text-stone-100' : 'text-stone-800'
          }`}>
            Formal Logic <span className="italic font-medium text-stone-400">Engines.</span>
          </h2>
          <p className="text-lg md:text-xl text-stone-500 font-medium leading-relaxed max-w-2xl">
            Mathematical proof assistants, symbolic state simulators, and cryptographic registry checks for mission-critical systems and research manuscripts.
          </p>
        </div>

        {/* 3 Cards Container */}
        <div className="space-y-8">
          
          {/* CARD 1: CREATE (ABOVE) - Expansive Full-Width Banner */}
          <div className={`p-8 md:p-12 rounded-[2.5rem] border transition-all duration-300 hover:border-brand-accent/60 group ${
            theme === 'dark' ? 'bg-zinc-900/40 border-stone-800/80 shadow-lg shadow-black/20' : 
            theme === 'dim' ? 'bg-stone-900/60 border-stone-800 shadow-md' : 
            'bg-white border-stone-200 shadow-sm'
          }`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-brand-accent ${
                    theme === 'dark' || theme === 'dim' ? 'bg-zinc-800/80' : 'bg-stone-100'
                  }`}>
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-brand-accent font-bold">
                      Specification & Certification Engine
                    </span>
                    <h3 className={`text-2xl md:text-3xl font-bold ${
                      theme === 'dark' || theme === 'dim' ? 'text-stone-100' : 'text-stone-900'
                    }`}>
                      Create Engine
                    </h3>
                  </div>
                </div>

                <p className="text-sm md:text-base text-stone-500 font-medium leading-relaxed max-w-xl">
                  Formulate problem models, synthesize machine-checked Lean 4 obligations, stress-test boundary edges, and generate exportable cryptographic certificates of formal soundness.
                </p>

                {/* 4 Pipeline Stages Preview */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  {[
                    { num: '01', label: 'Formulation', sub: 'Model & Thesis' },
                    { num: '02', label: 'Obligations', sub: 'Lean 4 Invariants' },
                    { num: '03', label: 'Edge Stress', sub: 'Perturbation Tests' },
                    { num: '04', label: 'Certificate', sub: 'OSCAL Seal' },
                  ].map((stage, i) => (
                    <div 
                      key={i}
                      className={`p-2.5 rounded-xl border text-left ${
                        theme === 'dark' || theme === 'dim'
                          ? 'bg-zinc-950/40 border-stone-800/80'
                          : 'bg-stone-50 border-stone-200/80'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-brand-accent font-bold block">{stage.num}</span>
                      <div className={`text-xs font-bold truncate ${
                        theme === 'dark' || theme === 'dim' ? 'text-stone-200' : 'text-stone-800'
                      }`}>
                        {stage.label}
                      </div>
                      <div className="text-[10px] text-stone-500 truncate">{stage.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center items-start lg:items-end gap-6 border-t lg:border-t-0 lg:border-l border-stone-200/50 dark:border-stone-800/60 pt-6 lg:pt-0 lg:pl-8">
                <div className="space-y-2 text-left lg:text-right">
                  <div className="text-xs font-mono text-emerald-500 font-semibold flex items-center lg:justify-end gap-1.5">
                    <CheckCircle2 size={14} />
                    <span>NIST SP 800-53 ALIGNED</span>
                  </div>
                  <p className="text-xs text-stone-400 font-medium max-w-xs">
                    Guided 4-stage pipeline for researchers and engineers seeking certifiable assurance.
                  </p>
                </div>

                <button
                  onClick={() => onNavigate?.('create')}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm transition-all transform group-hover:scale-105 ${
                    theme === 'dark' 
                      ? 'bg-brand-accent text-zinc-950 hover:brightness-110' 
                      : theme === 'dim'
                      ? 'bg-brand-accent text-zinc-950 hover:brightness-110'
                      : 'bg-stone-900 text-stone-100 hover:bg-stone-800'
                  }`}
                >
                  <span>Open Create Engine</span>
                  <ArrowRight size={16} />
                </button>
              </div>

            </div>
          </div>

          {/* BOTTOM ROW: ANALYZE AND VERIFY TOGETHER (2-Column Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* CARD 2: ANALYZE (LEFT) */}
            <div className={`p-8 md:p-10 rounded-[2.5rem] border flex flex-col justify-between transition-all duration-300 hover:border-sky-500/60 group ${
              theme === 'dark' ? 'bg-zinc-900/40 border-stone-800/80 shadow-lg shadow-black/20' : 
              theme === 'dim' ? 'bg-stone-900/60 border-stone-800 shadow-md' : 
              'bg-white border-stone-200 shadow-sm'
            }`}>
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sky-500 ${
                    theme === 'dark' || theme === 'dim' ? 'bg-zinc-800/80' : 'bg-stone-100'
                  }`}>
                    <Workflow size={24} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-sky-500 font-bold">
                      Symbolic Logic Simulation
                    </span>
                    <h3 className={`text-2xl font-bold ${
                      theme === 'dark' || theme === 'dim' ? 'text-stone-100' : 'text-stone-900'
                    }`}>
                      Analyze Engine
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-stone-500 font-medium leading-relaxed">
                  Decompose LaTeX papers or algorithmic specifications into state machines. Step through execution traces and verify invariant preservation under simulated faults.
                </p>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    'State Machine Stepper',
                    'Invariant Assertion Dials',
                    'Execution Trace Log'
                  ].map((tag, i) => (
                    <span 
                      key={i}
                      className={`text-[11px] font-mono px-3 py-1 rounded-xl border ${
                        theme === 'dark' || theme === 'dim'
                          ? 'bg-zinc-950/60 border-stone-800 text-stone-400'
                          : 'bg-stone-50 border-stone-200 text-stone-600'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-stone-200/50 dark:border-stone-800/60 flex items-center justify-between">
                <span className="text-xs font-mono text-stone-400">Deterministic Evaluation</span>
                <button
                  onClick={() => onNavigate?.('analyze')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs transition-all transform group-hover:scale-105 ${
                    theme === 'dark' || theme === 'dim'
                      ? 'bg-sky-500 text-zinc-950 hover:brightness-110'
                      : 'bg-stone-900 text-stone-100 hover:bg-stone-800'
                  }`}
                >
                  <span>Launch Simulator</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* CARD 3: VERIFY (RIGHT) */}
            <div className={`p-8 md:p-10 rounded-[2.5rem] border flex flex-col justify-between transition-all duration-300 hover:border-emerald-500/60 group ${
              theme === 'dark' ? 'bg-zinc-900/40 border-stone-800/80 shadow-lg shadow-black/20' : 
              theme === 'dim' ? 'bg-stone-900/60 border-stone-800 shadow-md' : 
              'bg-white border-stone-200 shadow-sm'
            }`}>
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-emerald-500 ${
                    theme === 'dark' || theme === 'dim' ? 'bg-zinc-800/80' : 'bg-stone-100'
                  }`}>
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-500 font-bold">
                      Registry Audit & Stark Verdict
                    </span>
                    <h3 className={`text-2xl font-bold ${
                      theme === 'dark' || theme === 'dim' ? 'text-stone-100' : 'text-stone-900'
                    }`}>
                      Verify Engine
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-stone-500 font-medium leading-relaxed">
                  Instant canonical registry lookup for papers and specs. Returns an uncompromising stark binary verdict with cryptographic SHA-256 receipts.
                </p>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    'Stark Binary Verdict',
                    'Canonical Registry Lookup',
                    'SHA-256 Proof Receipt'
                  ].map((tag, i) => (
                    <span 
                      key={i}
                      className={`text-[11px] font-mono px-3 py-1 rounded-xl border ${
                        theme === 'dark' || theme === 'dim'
                          ? 'bg-zinc-950/60 border-stone-800 text-stone-400'
                          : 'bg-stone-50 border-stone-200 text-stone-600'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-stone-200/50 dark:border-stone-800/60 flex items-center justify-between">
                <span className="text-xs font-mono text-stone-400">Binary Pipeline Check</span>
                <button
                  onClick={() => onNavigate?.('verify')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs transition-all transform group-hover:scale-105 ${
                    theme === 'dark' || theme === 'dim'
                      ? 'bg-emerald-500 text-zinc-950 hover:brightness-110'
                      : 'bg-stone-900 text-stone-100 hover:bg-stone-800'
                  }`}
                >
                  <span>Verify Document</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default FormalLogicEntryway;
