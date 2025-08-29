import React, { useMemo } from 'react';
import { Risk, Likelihood, Severity } from '../types/risk';
import { computeScore, computeLevel, getRiskLevelColor } from '../lib/risk';

interface RiskMatrixProps {
  risks: Risk[];
}

interface MatrixCell {
  likelihood: Likelihood;
  severity: Severity;
  score: number;
  level: string;
  count: number;
  risks: Risk[];
}

export function RiskMatrix({ risks }: RiskMatrixProps) {
  const matrix = useMemo(() => {
    const cells: MatrixCell[][] = [];
    
    // Initialize 5x5 matrix
    for (let l = 1; l <= 5; l++) {
      const row: MatrixCell[] = [];
      for (let s = 1; s <= 5; s++) {
        const score = computeScore(l as Likelihood, s as Severity);
        const level = computeLevel(score);
        
        // Count risks in this cell
        const cellRisks = risks.filter(risk => 
          risk.likelihood === l && risk.severity === s
        );
        
        row.push({
          likelihood: l as Likelihood,
          severity: s as Severity,
          score,
          level,
          count: cellRisks.length,
          risks: cellRisks,
        });
      }
      cells.push(row);
    }
    
    return cells;
  }, [risks]);

  const getCellBackgroundColor = (level: string): string => {
    switch (level) {
      case 'Low':
        return 'bg-mint-200';
      case 'Medium':
        return 'bg-mint-300';
      case 'High':
        return 'bg-mint-400';
      case 'Critical':
        return 'bg-mint-600';
      default:
        return 'bg-gray-100';
    }
  };

  const getCellTextColor = (level: string): string => {
    switch (level) {
      case 'Low':
      case 'Medium':
        return 'text-mint-800';
      case 'High':
      case 'Critical':
        return 'text-white';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="card">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Risk Matrix</h3>
      
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Header row with severity labels */}
          <div className="flex">
            <div className="w-20 h-8"></div> {/* Empty corner */}
            {[1, 2, 3, 4, 5].map(severity => (
              <div key={severity} className="w-20 h-8 flex items-center justify-center text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200">
                S{severity}
              </div>
            ))}
          </div>
          
          {/* Matrix rows */}
          {matrix.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {/* Likelihood label */}
              <div className="w-20 h-20 flex items-center justify-center text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200">
                L{rowIndex + 1}
              </div>
              
              {/* Matrix cells */}
              {row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-20 h-20 border border-gray-200 flex flex-col items-center justify-center text-xs relative group cursor-pointer transition-all duration-200 hover:scale-105 ${getCellBackgroundColor(cell.level)} ${getCellTextColor(cell.level)}`}
                  title={`L${cell.likelihood} × S${cell.severity} = ${cell.score} (${cell.level})\n${cell.count} risk${cell.count !== 1 ? 's' : ''}`}
                >
                  <div className="font-bold text-lg">{cell.score}</div>
                  <div className="text-xs opacity-80">{cell.level}</div>
                  {cell.count > 0 && (
                    <div className="absolute top-1 right-1 bg-white bg-opacity-90 text-gray-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      {cell.count}
                    </div>
                  )}
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    <div className="font-semibold">L{cell.likelihood} × S{cell.severity} = {cell.score}</div>
                    <div className="text-gray-300">{cell.level} Risk</div>
                    <div className="text-gray-300">{cell.count} risk{cell.count !== 1 ? 's' : ''}</div>
                    {cell.risks.length > 0 && (
                      <div className="mt-1 pt-1 border-t border-gray-700">
                        {cell.risks.slice(0, 3).map(risk => (
                          <div key={risk.id} className="text-gray-300 truncate max-w-32">
                            {risk.hazard}
                          </div>
                        ))}
                        {cell.risks.length > 3 && (
                          <div className="text-gray-400">+{cell.risks.length - 3} more</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-mint-200 rounded"></div>
          <span className="text-sm text-gray-600">Low (1-4)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-mint-300 rounded"></div>
          <span className="text-sm text-gray-600">Medium (5-9)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-mint-400 rounded"></div>
          <span className="text-sm text-gray-600">High (10-16)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-mint-600 rounded"></div>
          <span className="text-sm text-gray-600">Critical (17-25)</span>
        </div>
      </div>
    </div>
  );
}
