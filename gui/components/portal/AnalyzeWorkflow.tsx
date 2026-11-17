import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Terminal, 
  Activity, 
  FileCode, 
  Cpu, 
  Workflow,
  Sparkles,
  Layers
} from 'lucide-react';

interface AnalyzeWorkflowProps {
  onNavigate?: (view: any) => void;
  isDarkMode: boolean;
  theme?: 'light' | 'dark' | 'dim';
}

interface SimulatorScenario {
  id: string;
  title: string;
  sourceType: 'LaTeX Manuscript' | 'Formal Spec' | 'Algorithmic Blueprint';
  initialState: Record<string, any>;
  invariants: Array<{
    id: string;
    name: string;
    predicate: string;
    check: (s: any) => boolean;
    description: string;
  }>;
  events: Array<{
    name: string;
    description: string;
    apply: (s: any) => any;
  }>;
}

const ANALYZE_SCENARIOS: SimulatorScenario[] = [
  {
    id: 'byzantine',
    title: 'Byzantine Fault Consensus State Machine',
    sourceType: 'LaTeX Manuscript',
    initialState: {
      epoch: 1,
      totalNodes: 7,
      faultsMax: 2,
      activeQuorumSize: 5,
      overlappingNodes: 3,
      honestVotes: 5,
      maliciousVotes: 0,
      phase: 'PROPOSAL_COMMIT'
    },
    invariants: [
      {
        id: 'INV-1',
        name: 'Quorum Overlap Lower Bound',
        predicate: 'overlap >= f + 1',
        check: (s) => s.overlappingNodes >= s.faultsMax + 1,
        description: 'Intersection between any two quorums must strictly exceed fault budget f.'
      },
      {
        id: 'INV-2',
        name: 'Non-Equivocation Safety',
        predicate: 'honestVotes >= 2f + 1',
        check: (s) => s.honestVotes >= (2 * s.faultsMax + 1),
        description: 'Decision requires a verified supermajority of honest votes.'
      },
      {
        id: 'INV-3',
        name: 'Epoch Monotonicity',
        predicate: 'epoch > 0',
        check: (s) => s.epoch > 0,
        description: 'Cluster progress only moves forward in strictly positive epochs.'
      }
    ],
    events: [
      {
        name: 'Step Epoch Forward (Normal Round)',
        description: 'Honest quorum reaches agreement and increments epoch.',
        apply: (s) => ({
          ...s,
          epoch: s.epoch + 1,
          honestVotes: s.activeQuorumSize,
          maliciousVotes: 0,
          phase: 'COMMIT_SUCCESS'
        })
      },
      {
        name: 'Inject 2 Byzantine Fault Equivocations',
        description: 'Adversary attempts to broadcast dual proposals to split voters.',
        apply: (s) => ({
          ...s,
          maliciousVotes: 2,
          honestVotes: 5,
          overlappingNodes: 3,
          phase: 'FAULT_CONTAINED'
        })
      },
      {
        name: 'Shrink Quorum to Boundary (5 nodes)',
        description: 'Test lowest permissible voting group size 2f + 1.',
        apply: (s) => ({
          ...s,
          activeQuorumSize: 2 * s.faultsMax + 1,
          overlappingNodes: s.faultsMax + 1,
          phase: 'BOUNDARY_TEST'
        })
      }
    ]
  },
  {
    id: 'ring_buffer',
    title: 'Lockless Ring Buffer Memory Orderings',
    sourceType: 'Formal Spec',
    initialState: {
      capacity: 8,
      writeSeq: 0,
      readSeq: 0,
      itemsInQueue: 0,
      droppedWrites: 0,
      lastAction: 'INITIALIZED'
    },
    invariants: [
      {
        id: 'INV-1',
        name: 'Non-Negative Occupancy',
        predicate: 'writeSeq >= readSeq',
        check: (s) => s.writeSeq >= s.readSeq,
        description: 'Consumer thread can never read past what producer thread has published.'
      },
      {
        id: 'INV-2',
        name: 'Capacity Boundedness',
        predicate: 'writeSeq - readSeq <= capacity',
        check: (s) => (s.writeSeq - s.readSeq) <= s.capacity,
        description: 'Unread items cannot exceed allocated ring buffer memory slot count.'
      },
      {
        id: 'INV-3',
        name: 'Zero In-Memory Overwrite',
        predicate: 'itemsInQueue <= capacity',
        check: (s) => s.itemsInQueue <= s.capacity,
        description: 'Existing buffer elements are safely retained until consumption.'
      }
    ],
    events: [
      {
        name: 'Producer Push (Single Item)',
        description: 'Producer writes 1 item if capacity allows.',
        apply: (s) => {
          if (s.itemsInQueue < s.capacity) {
            return {
              ...s,
              writeSeq: s.writeSeq + 1,
              itemsInQueue: s.itemsInQueue + 1,
              lastAction: 'PRODUCER_PUSH_OK'
            };
          }
          return { ...s, droppedWrites: s.droppedWrites + 1, lastAction: 'PUSH_REJECTED_FULL' };
        }
      },
      {
        name: 'Consumer Pop (Single Item)',
        description: 'Consumer reads 1 item if buffer is non-empty.',
        apply: (s) => {
          if (s.itemsInQueue > 0) {
            return {
              ...s,
              readSeq: s.readSeq + 1,
              itemsInQueue: s.itemsInQueue - 1,
              lastAction: 'CONSUMER_POP_OK'
            };
          }
          return { ...s, lastAction: 'POP_REJECTED_EMPTY' };
        }
      },
      {
        name: 'High-Throughput Burst (4 Pushes)',
        description: 'Simulates fast producer pushing 4 messages back-to-back.',
        apply: (s) => {
          const added = Math.min(4, s.capacity - s.itemsInQueue);
          return {
            ...s,
            writeSeq: s.writeSeq + added,
            itemsInQueue: s.itemsInQueue + added,
            droppedWrites: s.droppedWrites + (4 - added),
            lastAction: `BURST_${added}_PUSHES`
          };
        }
      }
    ]
  }
];

export const AnalyzeWorkflow: React.FC<AnalyzeWorkflowProps> = ({ onNavigate, isDarkMode }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('byzantine');
  
  const activeScenario = ANALYZE_SCENARIOS.find(s => s.id === selectedScenarioId) || ANALYZE_SCENARIOS[0];
  const [state, setState] = useState<any>(activeScenario.initialState);
  const [traceLogs, setTraceLogs] = useState<Array<{ step: number; action: string; time: string; valid: boolean }>>([
    { step: 1, action: 'Simulator Initialized', time: '00:00.000', valid: true }
  ]);

  const handleSelectScenario = (id: string) => {
    setSelectedScenarioId(id);
    const scen = ANALYZE_SCENARIOS.find(s => s.id === id);
    if (scen) {
      setState(scen.initialState);
      setTraceLogs([
        { step: 1, action: 'Simulator Initialized', time: '00:00.000', valid: true }
      ]);
    }
  };

  const handleApplyEvent = (event: typeof activeScenario.events[0]) => {
    const nextState = event.apply(state);
    const allValid = activeScenario.invariants.every(inv => inv.check(nextState));
    
    setState(nextState);
    setTraceLogs(prev => [
      ...prev,
      {
        step: prev.length + 1,
        action: event.name,
        time: new Date().toLocaleTimeString().slice(3),
        valid: allValid
      }
    ]);
  };

  const handleReset = () => {
    setState(activeScenario.initialState);
    setTraceLogs([
      { step: 1, action: 'Simulator State Reset', time: '00:00.000', valid: true }
    ]);
  };

  return (
    <div className={`min-h-screen pt-24 pb-20 px-4 md:px-8 transition-colors duration-300 ${isDarkMode ? 'bg-zinc-950 text-stone-200' : 'bg-stone-50 text-stone-800'}`}>
      <div className="max-w-6xl mx-auto space-y-8">
        
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
              <span className="text-brand-accent font-bold">Analyze Engine</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-3">
              <span>Analyze Engine</span>
              <span className="text-xs font-mono font-medium px-2.5 py-1 rounded bg-sky-500/10 text-sky-500 border border-sky-500/20">
                Interactive Logic Simulator
              </span>
            </h1>
          </div>

          {/* Quick Scenario Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 font-medium whitespace-nowrap">Ingested Spec:</span>
            <select
              value={selectedScenarioId}
              onChange={(e) => handleSelectScenario(e.target.value)}
              className="px-3 py-2 text-xs font-medium rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-brand-accent transition-colors"
            >
              {ANALYZE_SCENARIOS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Invariant Health Dials Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeScenario.invariants.map((inv) => {
            const isPassing = inv.check(state);
            return (
              <div 
                key={inv.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isPassing 
                    ? 'border-emerald-500/30 bg-emerald-500/5' 
                    : 'border-rose-500/40 bg-rose-500/10'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase text-brand-accent font-bold">
                    {inv.id}
                  </span>
                  <span className={`text-xs font-mono font-bold flex items-center gap-1 ${
                    isPassing ? 'text-emerald-500' : 'text-rose-500'
                  }`}>
                    {isPassing ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                    <span>{isPassing ? 'INVARIANT HOLDS' : 'VIOLATION'}</span>
                  </span>
                </div>
                <h4 className="text-xs font-bold text-stone-800 dark:text-stone-200 mb-1">
                  {inv.name}
                </h4>
                <div className="text-[11px] font-mono text-sky-600 dark:text-sky-400 mb-2">
                  {inv.predicate}
                </div>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  {inv.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Simulator Studio Layout: Events & State Vectors */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left 2 Cols: Interactive Transition Controls */}
          <div className="lg:col-span-2 p-8 rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
              <div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                  State Machine Transition Triggers
                </h3>
                <p className="text-xs text-stone-500 font-medium">
                  Step forward through execution rounds or inject perturbation events.
                </p>
              </div>

              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 text-xs font-semibold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
              >
                <RotateCcw size={14} />
                <span>Reset State</span>
              </button>
            </div>

            <div className="space-y-3">
              {activeScenario.events.map((evt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleApplyEvent(evt)}
                  className="w-full flex items-center justify-between p-4 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-brand-accent bg-stone-50/50 dark:bg-stone-950/40 text-left transition-all group"
                >
                  <div>
                    <div className="text-xs font-bold text-stone-800 dark:text-stone-200 group-hover:text-brand-accent transition-colors">
                      {evt.name}
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      {evt.description}
                    </div>
                  </div>
                  <Play size={14} className="text-stone-400 group-hover:text-brand-accent group-hover:translate-x-1 transition-all shrink-0 ml-4" />
                </button>
              ))}
            </div>

            {/* Execution Trace Log */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Step Execution Trace
                </span>
                <span className="text-[11px] font-mono text-stone-500">
                  {traceLogs.length} events logged
                </span>
              </div>

              <div className="max-h-48 overflow-y-auto space-y-1.5 p-3 rounded-2xl bg-stone-50 dark:bg-stone-950/80 border border-stone-200 dark:border-stone-800 font-mono text-xs">
                {traceLogs.slice().reverse().map((log) => (
                  <div key={log.step} className="flex items-center justify-between py-1 px-2 rounded hover:bg-stone-200/50 dark:hover:bg-stone-900/50">
                    <div className="flex items-center gap-3">
                      <span className="text-stone-400 font-bold">#{log.step}</span>
                      <span className="text-stone-700 dark:text-stone-300">{log.action}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-stone-400">{log.time}</span>
                      <span className={`text-[10px] font-bold ${log.valid ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {log.valid ? 'OK' : 'ERR'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Active State Vector Matrix */}
          <div className="p-6 rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Live State Vectors
            </h4>

            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950/80 border border-stone-200 dark:border-stone-800 font-mono text-xs space-y-2.5">
              {Object.entries(state).map(([k, v]) => (
                <div key={k} className="flex justify-between items-center py-0.5 border-b border-stone-200/50 dark:border-stone-800/50 last:border-0">
                  <span className="text-stone-500">{k}:</span>
                  <span className="text-sky-600 dark:text-sky-400 font-bold font-mono">{String(v)}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-brand-accent/5 border border-brand-accent/20 space-y-1">
              <span className="text-[10px] uppercase font-bold text-brand-accent">Verification Engine</span>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Deterministic step execution logs state mutations against active safety predicates in real time.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnalyzeWorkflow;
