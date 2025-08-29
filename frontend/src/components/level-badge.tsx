import React from 'react';
import { RiskLevel } from '../types/risk';
import { getRiskLevelColor } from '../lib/risk';

interface LevelBadgeProps {
  level: RiskLevel;
  className?: string;
}

export function LevelBadge({ level, className = '' }: LevelBadgeProps) {
  const colorClasses = getRiskLevelColor(level);
  
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses} ${className}`}
      role="status"
      aria-label={`Risk level: ${level}`}
    >
      {level}
    </span>
  );
}
