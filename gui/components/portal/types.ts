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
  author: string;
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

export const VERIFIED_REGISTRY_DATABASE: VerificationRegistryItem[] = [
  {
    hash: 'sha256:8f4c2e17a99b36d10c0e5b7e289f89a24317b2e8d197341e053f19e76318ad29',
    title: 'Byzantine Fault Quorum Intersection Invariants',
    url: 'https://arxiv.org/abs/2301.09842',
    certified: true,
    timestamp: '2026-10-18T14:22:09Z',
    pipelineVersion: 'AxiomScan Kernel v4.8.2-CBMC',
    signature: 'sig:ed25519:7e4a91c89f02b314d85a11c8e9b421a084c2e19d7b2354',
    checkedInvariantsCount: 4,
    author: 'Formal Distributed Systems Group'
  },
  {
    hash: 'sha256:d41d8cd98f00b204e9800998ecf8427e98a1c97a8b42142f534d060938f36214',
    title: 'Lockless FIFO Head/Tail Non-Overlap Safety Proof',
    url: 'https://doi.org/10.1145/3456789.3456790',
    certified: true,
    timestamp: '2026-09-04T09:15:33Z',
    pipelineVersion: 'AxiomScan Kernel v4.8.0-Kani',
    signature: 'sig:ed25519:3b991a0c71e2849d102e7b4512a890ef238917ac419b22',
    checkedInvariantsCount: 3,
    author: 'Systems Reliability Lab'
  },
  {
    hash: 'sha256:7b91d2ef34c9802871239851726a451e01829471638192847162938172948172',
    title: 'Zero-Knowledge Pedersen Range Bounding Constraints',
    url: 'https://eprint.iacr.org/2026/892',
    certified: true,
    timestamp: '2026-11-01T18:40:02Z',
    pipelineVersion: 'AxiomScan Kernel v4.8.4-Lean4',
    signature: 'sig:ed25519:9f8a12e34b5c6d7e8f901a2b3c4d5e6f7a8b9c0d1e2f3a',
    checkedInvariantsCount: 5,
    author: 'Cryptographic Protocol Auditing Node'
  }
];
