export type Likelihood = 1 | 2 | 3 | 4 | 5;
export type Severity = 1 | 2 | 3 | 4 | 5;
export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Risk {
  id: string;
  hazard: string;
  likelihood: Likelihood;
  severity: Severity;
  score: number;
  level: RiskLevel;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRiskRequest {
  hazard: string;
  likelihood: Likelihood;
  severity: Severity;
}

export interface UpdateRiskRequest {
  hazard?: string;
  likelihood?: Likelihood;
  severity?: Severity;
}

export interface RiskFilters {
  level?: RiskLevel;
  searchQuery?: string;
}
