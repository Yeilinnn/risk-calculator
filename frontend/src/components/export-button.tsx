import React from 'react';
import { Risk } from '../types/risk';
import { Download } from 'lucide-react';
import { formatDate } from '../lib/risk';

interface ExportButtonProps {
  risks: Risk[];
  disabled?: boolean;
}

export function ExportButton({ risks, disabled = false }: ExportButtonProps) {
  const exportToCSV = () => {
    if (risks.length === 0) {
      alert('No risks to export');
      return;
    }

    // CSV headers
    const headers = ['Hazard', 'Likelihood', 'Severity', 'Score', 'Level', 'CreatedAt'];
    
    // CSV data rows
    const csvData = risks.map(risk => [
      `"${risk.hazard.replace(/"/g, '""')}"`, // Escape quotes in hazard
      risk.likelihood,
      risk.severity,
      risk.score,
      risk.level,
      formatDate(risk.createdAt)
    ]);

    // Combine headers and data
    const csvContent = [headers, ...csvData]
      .map(row => row.join(','))
      .join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `risk-assessment-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <button
      onClick={exportToCSV}
      disabled={disabled || risks.length === 0}
      className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label={`Export ${risks.length} risks to CSV`}
    >
      <Download className="w-4 h-4" />
      <span>Export CSV ({risks.length})</span>
    </button>
  );
}
