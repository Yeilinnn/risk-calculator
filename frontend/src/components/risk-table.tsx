import React from 'react';
import { Risk } from '../types/risk';
import { LevelBadge } from './level-badge';
import { Edit, Trash2, Eye } from 'lucide-react';
import { formatDate } from '../lib/risk';

interface RiskTableProps {
  risks: Risk[];
  onEdit: (risk: Risk) => void;
  onDelete: (risk: Risk) => void;
  onView: (risk: Risk) => void;
  isLoading?: boolean;
}

export function RiskTable({ risks, onEdit, onDelete, onView, isLoading = false }: RiskTableProps) {
  const handleDelete = (risk: Risk) => {
    if (window.confirm(`Are you sure you want to delete the risk "${risk.hazard}"?`)) {
      onDelete(risk);
    }
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint-500"></div>
        </div>
      </div>
    );
  }

  if (risks.length === 0) {
    return (
      <div className="card">
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No risks found</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or create a new risk</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-mint-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-mint-800 uppercase tracking-wider">
                Hazard
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-mint-800 uppercase tracking-wider">
                Likelihood
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-mint-800 uppercase tracking-wider">
                Severity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-mint-800 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-mint-800 uppercase tracking-wider">
                Level
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-mint-800 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-mint-800 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {risks.map((risk) => (
              <tr key={risk.id} className="hover:bg-mint-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 max-w-xs truncate" title={risk.hazard}>
                    {risk.hazard}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{risk.likelihood}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{risk.severity}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900">{risk.score}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <LevelBadge level={risk.level} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{formatDate(risk.createdAt)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onView(risk)}
                      className="text-mint-600 hover:text-mint-800 transition-colors duration-200"
                      aria-label={`View details for ${risk.hazard}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(risk)}
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      aria-label={`Edit ${risk.hazard}`}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(risk)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-200"
                      aria-label={`Delete ${risk.hazard}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
