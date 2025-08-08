import { assessInputRisk, sanitizeInput, injectCanary, detectCanaryLeak, type generateCanary } from "./security";
import type { GuardOptions, RiskReport, Canary } from "./types";

export interface GuardResult {
  allowed: boolean;
  prompt: string; // sanitized (and possibly canary-augmented) prompt
  report: RiskReport;
  canary?: Canary;
}

// Frontend-only guard. Intended to wrap any future LLM call.
export function guardPrompt(prompt: string, options: GuardOptions = {}): GuardResult {
  const threshold = options.threshold ?? 0.6;
  const attach = options.attachCanary ?? true;

  const report = assessInputRisk(prompt, threshold);
  if (report.blocked) {
    // Block but return sanitized prompt for potential UX messaging
    return { allowed: false, prompt: sanitizeInput(prompt), report };
  }

  let safePrompt = sanitizeInput(prompt);
  let canary: Canary | undefined = undefined;
  if (attach) {
    const injected = injectCanary(safePrompt);
    safePrompt = injected.prompt;
    canary = injected.canary;
  }

  return { allowed: true, prompt: safePrompt, report, canary };
}

export function detectLeak(response: string, canary?: Canary): boolean {
  if (!canary) return false;
  return detectCanaryLeak(response, canary);
}
