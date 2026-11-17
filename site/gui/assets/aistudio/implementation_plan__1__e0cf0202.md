# AxiomScan: Real-Time Formal Logic Scanner & OSCAL Evidence Engine

A streamlined, real-time formal verification scanner that ingests LaTeX (.tex) manuscripts, URLs, and conceptual specifications to automatically synthesize Lean 4 proofs, Rust/Kani bounded model checking harnesses, an interactive symbolic simulator, and a NIST SP 800-53 compliant OSCAL chain of evidence.

### User Review & Critical Decisions

> [!IMPORTANT]
> The core system architecture and execution boundaries have been aligned based on user preferences. Review the confirmed decisions and technical approaches below:

- **Confirmed Decision 1 (Verification Engine & Sandbox)**: Full hybrid verification combining a real-time theorem extraction engine, an interactive Lean 4 goal state prover, a Rust/Kani bounded model checking harness generator, and a live in-browser symbolic simulator with independent sandbox execution.
- **Confirmed Decision 2 (Document Ingestion)**: Multi-source input supporting raw `.tex` LaTeX files (with automated math environment parsing `\begin{theorem}`, `\begin{lemma}`, `\begin{proof}`), web paper URLs/links, and markdown conceptual ideas.
- **Confirmed Decision 3 (OSCAL Chain of Evidence)**: Interactive visual DAG (Directed Acyclic Graph) showing provenance and derivation of claims, linked directly to NIST SP 800-53 (Rev 5) security controls (such as SA-11 Developer Verification, SI-7 Software Integrity, SC-13 Cryptographic Protection), with one-click JSON/YAML export.
- **UI/UX Direction**: Focused dark theme (`#0B0F19` deep space slate canvas, `#111827` surface layers, `#38BDF8` cyan/blue accent for proofs, `#10B981` emerald for verified goals, `#F59E0B` amber for unproven obligations), streamlined top navigation bar conforming to the 3-zone contract, and high-density, distraction-free workspaces.

---

### 1. Overview & Core Concept

**AxiomScan** transforms complex informal text, academic LaTeX papers, and algorithmic specifications into mathematically verified software and certifiable assurance artifacts. 

- **What It Does**:
  1. **Document & Idea Ingestion**: Rapidly parses `.tex` documents, research links, and system specs with syntax-highlighted LaTeX rendering and formal statement extraction.
  2. **Lean 4 Proof Synthesis**: Converts natural language and LaTeX theorems into sound Lean 4 types, hypotheses, and tactic-based proofs (`intro`, `cases`, `induction`, `simp`, `omega`), with an interactive goal-stepping explorer.
  3. **Rust / Kani Model Checking**: Translates invariants and logical pre/post-conditions into idiomatic Rust code equipped with Kani verification harnesses (`kani::assume`, `kani::assert`, `kani::any`) for bounded model checking.
  4. **Interactive Symbolic Simulator & Sandbox**: Allows users to step through state transitions, test edge cases, mutate code snippets in an isolated environment, and verify counterexamples.
  5. **OSCAL Chain of Evidence**: Automatically constructs an assessment plan and proof DAG linking each verified theorem and Kani harness to NIST SP 800-53 security controls, complete with cryptographic hash attestations (SHA-256) and exportable OSCAL 1.1.0 JSON schemas.

- **Target Audience / Persona**: Formal methods engineers, security auditors, cryptographic researchers, aerospace/critical-systems software developers, and academic authors who need rapid theorem verification and compliance-ready attestations.
- **Key Value**: Collapses the manual weeks-long cycle of translating paper theorems into machine-checked proofs and compliance documentation down to real-time verification in a single focused workspace.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Document Ingestion & Scanning**:
   - User pastes a LaTeX document, selects an example manuscript (e.g. Byzantine fault consensus, cryptographic zero-knowledge circuit, or memory safety lockless queue), or enters a URL / conceptual spec.
   - The document parser decomposes the text into formal Claims, Invariants, Assumptions, and Proof sketches with real-time math notation rendering (KaTeX/LaTeX format).
2. **Dual-Proof Inspection (Lean 4 & Rust/Kani)**:
   - **Lean 4 Panel**: Step through the proof tree tactic by tactic. Inspect active goals, hypotheses in context, and tactic states.
   - **Rust/Kani Panel**: Inspect generated Rust verification functions and Kani harnesses. Click "Verify with Kani" to run bounded model checking, analyze unwinding bounds, and detect assertion failures or memory bounds violations.
3. **Interactive Simulator & Logic Sandbox**:
   - Execute symbolic simulations of the state machine or invariant checks with customizable inputs, edge case generators, and step-by-step invariant monitoring.
   - A dedicated Sandbox tab provides a live REPL/editor where developers can tweak predicates, inject counterexamples, and re-verify soundness instantly.
4. **OSCAL Chain of Evidence & Compliance Export**:
   - View an interactive node-and-edge DAG connecting Document Source $\to$ Extracted Claims $\to$ Formal Lean 4 Proof $\to$ Rust/Kani Test Harness $\to$ NIST Control Assessment.
   - Export fully compliant OSCAL JSON / YAML assessment results with cryptographic evidence hashes for compliance pipelines.

#### Visual Identity & Theme
- **Theme & Atmosphere**: Immersive, utilitarian dark theme tailored for deep technical work. Deep canvas (`#090D16`), structural panels (`#111827`), subtle borders (`#1F2937`), and monospace accents.
- **Color Palette & Discipline**:
  - *Canvas (60%)*: Dark slate `#090D16` and dark neutral `#0F172A`.
  - *Structural Surfaces (30%)*: Deep obsidian `#111827` and slate cards `#1E293B`, with 1px hairline dividers (`rgba(255,255,255,0.08)`).
  - *Accent Budget (10%)*: Proof verification cyan (`#38BDF8`), verified status emerald (`#10B981`), obligation amber (`#F59E0B`), and counterexample coral (`#F43F5E`).
- **Typography & Hierarchy**:
  - *Display / Headings*: Plus Jakarta Sans for crisp clarity and architectural density.
  - *Body / Labels*: DM Sans for high-legibility document reading.
  - *Code & Proofs*: JetBrains Mono with tabular figures (`tabular-nums`) for line numbers, tactic goals, memory offsets, and hash digests.
- **Top Bar Contract**:
  - Left Zone: Single text wordmark `AxiomScan` with a subtle formal logic symbol $\vdash$.
  - Middle Zone: 4 clean, single-line navigation links: `Scanner`, `Proof Explorer`, `Simulator & Sandbox`, `OSCAL Evidence`.
  - Right Zone: Primary CTA: `New Scan` with rapid document sample selector.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Full-Stack Gemini 3.8 Flash Engine for Sound Proof Synthesis**
  - *Chosen Approach*: Implement an Express server proxy (`/api/verify`, `/api/simulate`, `/api/oscal`) using `@google/genai` with `gemini-3.8-flash` on the backend, enforcing strict JSON schemas for AST parsing, Lean 4 tactic decomposition, Kani harness generation, and NIST control mapping.
  - *Why*: Provides near-instant parsing and reliable structured formal synthesis while keeping the API key strictly on the server.
  - *Alternatives Considered*: Client-side Gemini calls (violates security and architecture guidelines) or pure regex parsing (incapable of complex logical inference from informal text and .tex documents).

- **Decision 2: Built-in In-Browser Symbolic Simulator & Sandbox REPL**
  - *Chosen Approach*: Build a deterministic, client-side symbolic state evaluator and AST interpreter that executes the formal state transitions and allows real-time mutation of inputs and properties, accompanied by server-side verification synthesis for deep proof checking.
  - *Why*: Instant $<50\text{ms}$ interactive response for stepping through state variables, visualizing invariants, and testing boundary counterexamples without waiting on network hops.

- **Decision 3: Standards-Compliant OSCAL 1.1.0 Model**
  - *Chosen Approach*: Structure the evidence chain according to the NIST OSCAL (Open Security Controls Assessment Language) `assessment-results` schema, including `assessment-plan`, `finding`, `observation`, and `control-implementation` with SHA-256 evidence digests.
  - *Why*: Makes the generated evidence immediately usable by enterprise compliance tools (GovReady, FedRAMP, NIST compliance suites) rather than keeping it as an isolated UI graphic.

---

### 4. Technical Architecture & Data Strategy

#### Architecture & Component Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              AxiomScan UI                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  Top Bar: [AxiomScan ⊢]  ──  [Scanner | Prover | Sandbox | OSCAL]  ── [New]  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌─────────────────┐  │
│  │ Document Ingestion    │  │ Dual Verification     │  │ Evidence & Run  │  │
│  │ ───────────────────── │  │ ───────────────────── │  │ ─────────────── │  │
│  │ • LaTeX (.tex) Parser │  │ • Lean 4 Prover       │  │ • Symbolic Sim  │  │
│  │ • URL / arXiv Ingest  │  │   - Tactic state step │  │ • Live Sandbox  │  │
│  │ • MathJax/KaTeX View  │  │ • Rust / Kani Model   │  │ • OSCAL DAG     │  │
│  │ • Claim & Invariant   │  │   - Bounded harnesses │  │ • NIST Controls │  │
│  │   Decomposition       │  │   - Memory & panic cb │  │ • Export Engine │  │
│  └───────────┬───────────┘  └───────────▲───────────┘  └────────▲────────┘  │
│              │                          │                       │           │
└──────────────┼──────────────────────────┼───────────────────────┼───────────┘
               │ HTTP POST                │ HTTP POST             │
               ▼                          ▼                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Express Backend Server                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  • /api/scan       : Ingests LaTeX/text, extracts mathematical claims       │
│  • /api/prove      : Synthesizes Lean 4 code & step-by-step goal states     │
│  • /api/kani       : Generates Rust code, invariants & Kani harnesses       │
│  • /api/simulate   : Evaluates symbolic execution & counterexample search   │
│  • /api/oscal      : Compiles NIST SP 800-53 evidence chain & SHA-256 hash │
│                                                                             │
│                    Google GenAI SDK (gemini-3.8-flash)                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Data Model & Core Entities

```typescript
// Core Verification Document
interface VerificationDocument {
  id: string;
  title: string;
  sourceType: 'latex' | 'url' | 'markdown';
  rawContent: string;
  claims: FormalClaim[];
  createdAt: string;
}

// Extracted Mathematical Claim
interface FormalClaim {
  id: string;
  name: string;
  latexStatement: string;
  category: 'theorem' | 'lemma' | 'invariant' | 'safety_property';
  assumptions: string[];
  formalLean4: {
    code: string;
    theoremSignature: string;
    tacticSteps: Array<{
      stepNumber: number;
      tactic: string;
      goalState: string;
      verified: boolean;
    }>;
    status: 'proven' | 'obligation_pending' | 'counterexample_found';
  };
  formalRustKani: {
    code: string;
    harnessName: string;
    unwindBound: number;
    propertiesChecked: string[];
    verificationResult: {
      status: 'success' | 'failure';
      checksPassed: number;
      checksTotal: number;
      counterexample?: string;
    };
  };
  oscalMapping: {
    controlId: string; // e.g. "SA-11", "SI-7", "SC-13"
    controlTitle: string;
    evidenceHash: string;
    statement: string;
  };
}

// OSCAL Evidence DAG
interface OscalEvidenceNode {
  id: string;
  type: 'document' | 'claim' | 'lean_proof' | 'kani_harness' | 'nist_control';
  label: string;
  status: 'verified' | 'warning' | 'pending';
  hash: string;
  metadata: Record<string, string>;
}
```

#### Interactive Handlers & State Management
- `activeTab`: Switches between `Scanner`, `Lean 4 Prover`, `Rust & Kani`, `Simulator & Sandbox`, and `OSCAL Evidence`.
- `handleDocumentScan(content, type)`: Sends content to `/api/scan` with streaming progress updates, populates claims and proof structures.
- `handleTacticStep(stepIdx)`: Simulates interactive Lean 4 tactic progression, revealing hypothesis transformations and goal closure.
- `handleKaniVerification(claimId)`: Triggers bounded model checking verification, runs bounded unwinding checks, and surfaces verification metrics.
- `handleSandboxRun(code, inputs)`: Executes the live sandbox interpreter, evaluating logical pre/post conditions and returning counterexamples if invariants break.
- `handleOscalExport(format: 'json' | 'yaml')`: Generates an attestation package with NIST SP 800-53 control mappings and cryptographic checksums for immediate download.
