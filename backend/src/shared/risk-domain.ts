export type Likelihood = 1 | 2 | 3 | 4 | 5;
export type Severity = 1 | 2 | 3 | 4 | 5;
export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export const RISK_THRESHOLDS = { 
  LOW_MAX: 4, 
  MEDIUM_MAX: 9, 
  HIGH_MAX: 16 
} as const;

/**
 * Computes the risk score based on likelihood and severity
 * @param likelihood - The likelihood value (1-5)
 * @param severity - The severity value (1-5)
 * @returns The calculated risk score
 */
export function computeScore(likelihood: Likelihood, severity: Severity): number {
  return likelihood * severity;
}

/**
 * Determines the risk level based on the calculated score
 * @param score - The risk score to evaluate
 * @returns The corresponding risk level
 */
export function computeLevel(score: number): RiskLevel {
  if (score <= RISK_THRESHOLDS.LOW_MAX) {
    return 'Low';
  }
  if (score <= RISK_THRESHOLDS.MEDIUM_MAX) {
    return 'Medium';
  }
  if (score <= RISK_THRESHOLDS.HIGH_MAX) {
    return 'High';
  }
  return 'Critical';
}
