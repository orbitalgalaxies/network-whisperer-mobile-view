// Minimal types for LLM guardrails
export type Severity = "low" | "medium" | "high";

export interface HeuristicFinding {
  rule: string;
  severity: Severity;
  snippet?: string;
}

export interface RiskReport {
  score: number; // 0..1
  findings: HeuristicFinding[];
  blocked: boolean;
}

export interface GuardOptions {
  threshold?: number; // block if score >= threshold (default 0.6)
  attachCanary?: boolean; // default true
}

export interface Canary {
  token: string; // random token
  phrase: string; // human-readable canary phrase containing the token
}
