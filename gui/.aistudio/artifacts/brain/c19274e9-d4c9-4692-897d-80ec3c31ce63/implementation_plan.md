# AxiomScan Formal Verification & OSCAL Evidence Suite

Integrate AxiomScan as an institutional high-assurance formal verification service within ΞchoBraid, featuring a summary card in the Institutional Infrastructure section of the Services page linking directly to a dedicated, clutter-free full-page workspace with isolated, single-purpose tabs.

### User Review & Critical Decisions

> [!IMPORTANT]
> The architectural approach and layout structure have been aligned based on confirmed user answers. Review the confirmed decisions below:

- **Confirmed Decision 1 (Primary Focus)**: The new page implements the **AxiomScan formal verification and OSCAL evidence suite**, translating informal specifications and academic manuscripts into verified Lean 4 goals, Rust/Kani bounded model checking harnesses, an interactive symbolic state simulator, and a NIST SP 800-53 OSCAL chain of evidence.
- **Confirmed Decision 2 (Services Page Integration)**: Placed under the **Institutional Infrastructure** section on the Services page as an enterprise high-assurance capability ("05. High-Assurance Formal Verification & OSCAL Evidence") with a summary card and one-click launch affordance.
- **Confirmed Decision 3 (Visual Space & Component Isolation)**: Primary components are isolated into a dedicated full-page view (`axiom_scan` view in `App.tsx`) with focused, single-purpose tabs (`Scanner`, `Lean 4 Prover`, `Rust & Kani`, `Symbolic Simulator`, `OSCAL Chain`). This preserves the 60-30-10 palette and typography ratios of the theme while preventing dashboard clutter.

---

### 1. Overview & Core Concept

- **What It Does**:
  1. **Institutional Service Summary**: A structured institutional feature on the Services page detailing high-assurance algorithmic verification, verifiable state machines, and cryptographic evidence generation for regulated environments.
  2. **Dedicated Workspace (`AxiomScanView`)**: An isolated, full-page technical studio providing four specialized, distraction-free workspaces:
     - **Scanner & Ingestion**: Select or input mathematical claims, system invariants, or LaTeX propositions with instant syntax and claim decomposition.
     - **Lean 4 Goal Explorer**: Interactive step-by-step goal state explorer showing hypotheses, tactic execution (`intro`, `cases`, `induction`, `simp`, `omega`), and verified state transitions.
     - **Rust / Kani Model Checking**: Bounded model checking console inspecting verification harnesses, loop unwind limits, and memory safety checks.
     - **Symbolic Simulator & Sandbox**: Interactive state-machine stepping engine allowing real-time parameter tweaking and counterexample detection.
     - **OSCAL Evidence DAG**: Visual provenance graph mapping claims to NIST SP 800-53 controls (SA-11, SI-7, SC-13) with SHA-256 evidence digests and JSON export.
- **Target Audience / Persona**: Institutional leaders, formal methods researchers, compliance officers, and software engineers deploying safety-critical or neurodivergent-support algorithms in audited contexts.
- **Key Value**: Provides mathematical proof of algorithmic invariants and automated compliance documentation while keeping the interface uncluttered and cognitively soothing.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Discovery & Launch Flow**:
   - The user visits the **Services** page (`services` view) and scrolls to the **Institutional Infrastructure** section.
   - A clean summary section introduces **AxiomScan: High-Assurance Formal Verification & Evidence**.
   - Clicking **"Launch AxiomScan Console"** transitions seamlessly to the dedicated full-screen `axiom_scan` workspace.
2. **Document Ingestion & Claim Extraction**:
   - The user selects a pre-configured sample manuscript (e.g., *Byzantine Fault Consensus Invariants*, *Cryptographic Zero-Knowledge Circuit*, or *Lockless State Machine*) or enters custom logic.
   - Claims are cleanly decomposed into theorems, lemmas, and invariants without visual clutter.
3. **Focused Verification Exploration**:
   - Switching to the **Lean 4 Prover** tab reveals a focused proof tree where each tactic step can be inspected or stepped through.
   - Switching to the **Rust & Kani** tab inspects bounded model checking harnesses with real-time check results.
   - Switching to the **Symbolic Simulator** tab allows interactive step-by-step state manipulation with live invariant badges.
   - Switching to the **OSCAL Evidence** tab visualizes the cryptographic proof DAG linked to NIST SP 800-53 controls with one-click JSON export.
4. **Return Flow**:
   - A quiet top breadcrumb (`Services / AxiomScan`) allows instant return to the Services page without losing verification context.

#### Visual Identity & Theme Integration
- **Theme & Atmosphere**: Seamlessly matches the existing ΞchoBraid dark/light/dim styling.
  - *Dark Canvas*: Deep zinc-950 (`bg-zinc-950`), stone-900 panels (`bg-stone-900/60`), and hairline dividers (`border-stone-800`).
  - *Light Canvas*: Clean stone-50 / white panels (`bg-white`), stone-200 borders (`border-stone-200`), and dark stone typography (`text-stone-800`).
- **60-30-10 Color Discipline**:
  - 60% Canvas: Neutral background field (`zinc-950` / `stone-50`).
  - 30% Structural Surfaces: Flat cards, step panels, and editor panes with 1px hairline borders.
  - 10% Accents: Precision cyan (`#38BDF8`) for proof goals, emerald (`#10B981`) for verified claims, and amber (`#F59E0B`) for pending obligations.
- **Zero-Pill Typography & Layout Math**:
  - Metadata rendered as clean unboxed text with typographic separators (`·`, `/`).
  - Strict tabular figures (`tabular-nums font-mono`) for line numbers, memory offsets, and SHA-256 hashes.
  - Generous spacing (minimum 24px container padding) ensuring zero visual crowding.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Full-Page View Isolation over Crowded In-Place Embed**
  - *Chosen Approach*: Implement `AxiomScanView` as an independent top-level view within `App.tsx` (`currentView === 'axiom_scan'`) accessible via the Services summary card.
  - *Why*: Eliminates cognitive overload and respects the user constraint to "maintain theme and content space ratio, isolate primary components on their own page or window, and make workflows clutter-free."
  - *Alternatives Considered*: Accordion or modal drawer inside the Services page (rejected: destroys the layout ratio and causes severe vertical crowding).

- **Decision 2: Single-Purpose Tabs for Workflows**
  - *Chosen Approach*: Segment the AxiomScan workspace into five isolated tab panes: `1. Ingestion & Claims`, `2. Lean 4 Prover`, `3. Rust/Kani Harnesses`, `4. Symbolic Simulator`, `5. OSCAL Chain`.
  - *Why*: Ensures the user never confronts overwhelming multi-column data simultaneously. Each stage has a single, distinct cognitive focus.

- **Decision 3: Realistic Client-Side Interactive Verification Engine**
  - *Chosen Approach*: Implement a deterministic, interactive formal logic evaluation engine with realistic sample proof trees, tactic state transitions, symbolic state evaluator, and compliant OSCAL 1.1.0 JSON generator.
  - *Why*: Guarantees instant sub-50ms responsiveness, zero network latency, and reliable offline demonstration while faithfully modeling Lean 4 goal reduction and Kani bounded checking.

---

### 4. Technical Architecture & Data Strategy

#### Architecture & Component Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              App.tsx Navigation                             │
│  [ Home | Copilot | Curriculum | Features | Services ] ─── [ Theme Toggle ]  │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                      ┌────────────────┴────────────────┐
                      ▼                                 ▼
         ┌─────────────────────────┐       ┌─────────────────────────┐
         │     ServicesView.tsx    │       │     AxiomScanView.tsx   │
         │ ─────────────────────── │       │ ─────────────────────── │
         │ • Home Routines Kit     │       │ • Header & Breadcrumb   │
         │ • Micro-school Support  │       │ • Document Selector     │
         │ • Low-Stimulus Mode     │       │ • Tab Navigation Strip  │
         │ • Resource Library      │       │   ├── Claims & Syntax   │
         │ • Multi-site Admin      │       │   ├── Lean 4 Prover     │
         │ • Local Node Hosting    │       │   ├── Rust / Kani       │
         │ • Advanced Reporting    │       │   ├── Symbolic Sim      │
         │ • Custom Bundles        │       │   └── OSCAL DAG & Export│
         │ • [NEW] AxiomScan Card  │──────▶│                         │
         │   (High-Assurance Proof)│       │                         │
         └─────────────────────────┘       └─────────────────────────┘
```

#### Core Data Entities

```typescript
export interface FormalClaim {
  id: string;
  name: string;
  category: 'theorem' | 'lemma' | 'invariant' | 'safety_property';
  statement: string;
  lean4: {
    theoremSignature: string;
    steps: Array<{
      tactic: string;
      goalState: string;
      verified: boolean;
    }>;
  };
  rustKani: {
    harnessName: string;
    unwindBound: number;
    code: string;
    checks: Array<{ name: string; passed: boolean }>;
  };
  oscal: {
    controlId: string;
    controlTitle: string;
    evidenceHash: string;
    status: 'satisfied' | 'planned';
  };
}
```

#### Verification Handlers & State Management
- `currentView`: Extended in `App.tsx` to include `'axiom_scan'`.
- `activeTab`: Switches between `claims`, `lean4`, `kani`, `simulator`, and `oscal`.
- `activeClaimId`: Tracks the selected mathematical claim across the prover, Kani runner, and simulator.
- `stepIndex`: Interactive step counter for the Lean 4 tactic progression.
- `simulatorState`: Reactive state machine variables with step, reset, and invariant validation controls.
- `exportOscalJson()`: Serializes NIST SP 800-53 OSCAL assessment results with SHA-256 evidence digests and initiates direct file download.
