import { Likelihood, Severity, RiskLevel } from '../types/risk';

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

/**
 * Gets the color class for a risk level
 * @param level - The risk level
 * @returns The Tailwind color class
 */
export function getRiskLevelColor(level: RiskLevel): string {
  switch (level) {
    case 'Low':
      return 'bg-mint-200 text-mint-800';
    case 'Medium':
      return 'bg-mint-300 text-mint-800';
    case 'High':
      return 'bg-mint-400 text-white';
    case 'Critical':
      return 'bg-mint-600 text-white';
    default:
      return 'bg-gray-200 text-gray-800';
  }
}

/**
 * Formats a date string for display
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
