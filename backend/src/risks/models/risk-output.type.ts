import { RiskLevel } from '../../shared/risk-domain';

export type RiskOutput = {
  id: string;
  hazard: string;
  likelihood: number;
  severity: number;
  score: number;
  level: RiskLevel;
  createdAt: Date;
  updatedAt: Date;
};
