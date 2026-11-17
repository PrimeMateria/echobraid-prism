# Student Portal Overhaul: Analyze, Verify & Create Workflows

A dedicated, multi-step overhaul of the Student Portal restructuring the platform into three primary formal workflows: **Analyze**, **Verify**, and **Create**. The entry way presents **Analyze** and **Verify** side by side with **Create** situated underneath. Each workflow operates across dedicated pages with specialized state management, maintaining the platform's signature deep slate and teal aesthetic, JetBrains Mono tabular figures, and responsive layout.

### User Review & Critical Decisions

> [!IMPORTANT]
> The architectural directions and user answers confirmed in Phase 1 have been locked in:

- **Confirmed Decision 1 (Analyze Logic Simulator)**: Interactive state machine featuring step-by-step invariant monitoring, dynamic state transitions, guard condition evaluation, and execution trace logging.
- **Confirmed Decision 2 (Verify Screen Format)**: Stark, high-contrast binary indicator displaying either a stark green "PIPELINE CERTIFIED" or stark slate/amber "UNREGISTERED DOCUMENT" audit stamp, accompanied by canonical SHA-256 hash digests and ingestion timestamps.
- **Confirmed Decision 3 (Create Multi-Step Pipeline)**: Structured 4-stage sequential workflow:
  1. *Stage 1: Problem Formulation* (Context, thesis, domain model)
  2. *Stage 2: Proof Obligations* (Invariant specifications, formal predicates)
  3. *Stage 3: Edge Simulation* (State perturbation, fault injection, stress checks)
  4. *Stage 4: Certification Export* (Cryptographic seal, OSCAL/NIST alignment, attestation download)
- **Confirmed Decision 4 (Layout & Aesthetic Discipline)**: Portal home presents Analyze and Verify in a balanced 2-column grid, with Create positioned below as an expansive full-width pipeline banner. Each step within each workflow renders as its own dedicated full-page view with intuitive breadcrumb navigation and progress indicators.

---

### 1. Overview & Core Concept

The overhauled Student Portal transitions from a general navigation landing page into an intentional formal verification station divided into three purposeful engines:

1. **Analyze Engine (Document Ingestion $\to$ Logic Simulator)**: Ingests research manuscripts, LaTeX specifications, or paper URLs, decomposes them into formal invariants and state transition rules, and loads them into a step-by-step symbolic state machine where users can test state transitions, trigger guard mutations, and observe invariant preservation.
2. **Verify Engine (Document Ingestion $\to$ Stark Verification Screen)**: Ingests documents or links to perform an instant pipeline lookup against the canonical registry, rendering an uncompromising, distraction-free binary verdict screen ("PIPELINE CERTIFIED" vs "UNREGISTERED DOCUMENT") with cryptographic proof hashes.
3. **Create Engine (Idea Validation & Certification Pipeline)**: A dedicated 4-stage pipeline guiding researchers and students from a nascent problem statement through formal proof obligations, automated edge stress testing, to an exportable, tamper-evident certificate of formal soundess.

---

### 2. User Experience & Visual Design

#### Structural Layout & Flow Hierarchy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          STUDENT PORTAL ENTRY WAY                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────────────┐     ┌─────────────────────────────────┐  │
│  │   ANALYZE WORKFLOW            │     │   VERIFY WORKFLOW               │  │
│  │   • Ingest LaTeX / URL / Doc  │     │   • Ingest URL / DOI / Doc Hash │  │
│  │   • Extract State Variables   │     │   • Pipeline Registry Check     │  │
│  │   • Launch Logic Simulator ───┼──┐  │   • Stark Binary Verdict ───────┼──┐
│  └───────────────────────────────┘  │  └─────────────────────────────────┘  │
│                                     │                                       │
│  ┌──────────────────────────────────┴────────────────────────────────────┐  │
│  │   CREATE WORKFLOW (Idea Validation & Formal Certification)            │  │
│  │   Stage 1: Problem  ──> Stage 2: Obligations ──> Stage 3: Edge ──> 4  │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
              ┌───────────────────────┴────────────────────────┐
              ▼                                                ▼
┌───────────────────────────────┐              ┌───────────────────────────────┐
│ DEDICATED ANALYZE PAGES       │              │ DEDICATED VERIFY PAGE         │
│ • Page 1: Ingestion & Claims  │              │ • Stark Binary Verdict Screen │
│ • Page 2: Logic Simulator     │              │   - Certified vs Unregistered │
│   - State machine transition  │              │   - SHA-256 Digest & Timestamp│
│   - Invariant assertion dials │              └───────────────────────────────┘
│   - Step execution trace      │                              ▲
└───────────────────────────────┘                              │
              ┌────────────────────────────────────────────────┘
              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ DEDICATED CREATE PAGES (4 Sequential Stages)                                │
│ • Step 1: Problem Definition & Domain Scope                                 │
│ • Step 2: Proof Obligations & Invariant Synthesis                           │
│ • Step 3: Edge Simulation & Invariant Stress Matrix                         │
│ • Step 4: Formal Certification & Attestation Export                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Visual Styling & Token Discipline
- **Palette & Atmosphere**: Adheres strictly to the applet's dark slate foundation (`bg-zinc-950` / `bg-stone-900` / `bg-brand-light` with smooth dark/dim/light switching).
- **Accents**: Pure Teal (`#2dd4bf`) for active controls and links, Emerald (`#10b981`) for certified verification states, Amber (`#f59e0b`) for pending obligations, and Crimson (`#ef4444`) for unregistered alerts.
- **Typography**: `Inter` for body readability, `JetBrains Mono` for formal claims, hashes, state vectors, and code, and `Instrument Serif` for editorial section titles.
- **Zero-Pill Compliance**: Clean unboxed metadata with bullet and slash separators; interactive segmented buttons for step navigation.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Side-by-Side Ingestion Cards with Bottom Full-Width Pipeline**
  - *Chosen Approach*: Analyze and Verify cards share equal 50/50 horizontal column widths on desktop, framing their shared ingestion origin with differing destinations. Create anchors the lower half with an expansive linear progression bar.
  - *Why*: Directly aligns with user prompt ("Feature Analyze and Verify side by side and put Create underneath") while giving the multi-step Create pipeline room to communicate its 4-step sequence.

- **Decision 2: Dedicated Full-Page Views for Each Step**
  - *Chosen Approach*: Instead of squeezed popups or inline accordions, each workflow step transitions to a dedicated full-page experience with breadcrumbs (`Student Portal / Analyze / Logic Simulator`), clear step progress, and full workspace canvas.
  - *Why*: Accommodates the high-density requirements of state machine controls, edge test matrices, and raw cryptographic receipts without layout cramping.

- **Decision 3: Stark Binary Verification Display**
  - *Chosen Approach*: Deliberately minimal, monolithic display featuring high-contrast typography ("PIPELINE CERTIFIED" in large emerald tabular type or "UNREGISTERED DOCUMENT" in amber/zinc), accompanied by verified pipeline timestamps, article title, and raw SHA-256 hash.
  - *Why*: Implements the exact user request ("Verify just leads to a boring screen that will show users if an article has already been through the pipeline").

- **Decision 4: Deterministic Logic Simulator with Interactive Controls**
  - *Chosen Approach*: A rich client-side state machine engine with configurable states (e.g. `IDLE`, `INGESTING`, `EVALUATING_GUARDS`, `TRANSITIONING`, `COMMITTED`, `HALTED`), interactive event buttons (`Step Forward`, `Inject Anomaly`, `Reset State`, `Mutate Invariant`), and live invariant validation indicators ($I_1: \text{Liveness}, I_2: \text{Safety}, I_3: \text{Non-reentrancy}$).

---

### 4. Technical Architecture & Component Mapping

#### Component Structure

```
components/
├── portal/
│   ├── StudentPortalHub.tsx        # Portal entryway (Analyze & Verify side-by-side, Create underneath)
│   ├── AnalyzeWorkflow.tsx         # Dedicated Analyze workflow coordinator
│   │   ├── AnalyzeIngestion.tsx    # Step 1: Document/Link ingestion & claim extraction
│   │   └── LogicSimulator.tsx      # Step 2: Interactive state machine & invariant checker
│   ├── VerifyWorkflow.tsx          # Dedicated Verify workflow coordinator
│   │   ├── VerifyIngestion.tsx     # Step 1: Article/URL/Hash lookup input
│   │   └── StarkVerdictScreen.tsx  # Step 2: Stark binary "Certified / Unregistered" screen
│   └── CreateWorkflow.tsx          # Dedicated Create workflow coordinator (4-step wizard)
│       ├── CreateStep1Problem.tsx  # Step 1: Problem Definition & Context Intake
│       ├── CreateStep2Proof.tsx    # Step 2: Proof Obligations & Invariant Synthesis
│       ├── CreateStep3Stress.tsx   # Step 3: Edge Simulation & Fault Injection Matrix
│       └── CreateStep4Cert.tsx     # Step 4: Attestation & Formal Certificate Export
```

#### Shared Workflow State Store

```typescript
export interface IngestionPayload {
  sourceType: 'latex' | 'url' | 'text';
  title: string;
  content: string;
  extractedClaims: Array<{
    id: string;
    label: string;
    predicate: string;
    category: 'invariant' | 'safety' | 'liveness';
    status: 'holds' | 'violated' | 'evaluating';
  }>;
}

export interface VerificationRegistryItem {
  hash: string;
  title: string;
  url?: string;
  certified: boolean;
  timestamp: string;
  pipelineVersion: string;
  signature: string;
  checkedInvariantsCount: number;
}

export interface CreatePipelineModel {
  problem: {
    domain: string;
    title: string;
    thesis: string;
    assumptions: string[];
  };
  obligations: Array<{
    id: string;
    statement: string;
    formalType: string;
    proved: boolean;
  }>;
  simulation: {
    testedScenarios: number;
    passedScenarios: number;
    anomaliesFound: number;
    coveragePct: number;
  };
  certification: {
    issuedAt: string;
    certificateId: string;
    hash: string;
    signer: string;
  };
}
```

---

### 5. Step-by-Step Implementation Strategy

1. **Portal Hub (`components/portal/StudentPortalHub.tsx`)**:
   - Hero header introducing the three formal engines.
   - 2-column grid featuring **Analyze** (left) and **Verify** (right) with quick-sample buttons and file/link intake triggers.
   - Full-width hero banner underneath featuring **Create** with an interactive 4-stage preview pipeline.
2. **Analyze Dedicated Workflow**:
   - Ingestion step supporting LaTeX, arXiv URL, or markdown specifications.
   - Interactive Logic Simulator with dynamic state transition graph, invariant assertion dials, and clock tick controls.
3. **Verify Dedicated Workflow**:
   - Document lookup supporting URLs, titles, and pre-computed digests.
   - Stark Binary Verdict screen displaying the verified status, verification timestamp, cryptographic attestation seal, and registry details.
4. **Create Dedicated 4-Stage Pipeline**:
   - Multi-step header showing 4 stages with active progress.
   - Step 1 (Problem): Interactive domain selection, thesis drafting, and assumption tagging.
   - Step 2 (Proof Obligations): Formal property synthesis with mathematical predicates and Lean 4 representations.
   - Step 3 (Edge Simulation): Boundary perturbation testing, stress dials, and invariant violation checks.
   - Step 4 (Certification): Tamper-evident certificate preview, cryptographic hash generation, and exportable JSON/attestation.
5. **App Navigation Integration (`App.tsx`)**:
   - Seamless routing allowing navigation between Portal Hub, Analyze, Verify, and Create dedicated sub-pages.
   - Persistent theme adherence (Dark, Dim, Light) and font preservation.
