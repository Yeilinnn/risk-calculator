import React, { useState, useEffect } from 'react';
import { Risk, CreateRiskRequest, UpdateRiskRequest, Likelihood, Severity } from '../types/risk';
import { computeScore, computeLevel } from '../lib/risk';

interface RiskFormProps {
  risk?: Risk;
  onSubmit: (data: CreateRiskRequest | UpdateRiskRequest) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function RiskForm({ risk, onSubmit, onCancel, isLoading = false }: RiskFormProps) {
  const [formData, setFormData] = useState<CreateRiskRequest>({
    hazard: '',
    likelihood: 1,
    severity: 1,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditing = !!risk;

  useEffect(() => {
    if (risk) {
      setFormData({
        hazard: risk.hazard,
        likelihood: risk.likelihood,
        severity: risk.severity,
      });
    }
  }, [risk]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.hazard.trim()) {
      newErrors.hazard = 'Hazard description is required';
    }

    if (formData.likelihood < 1 || formData.likelihood > 5) {
      newErrors.likelihood = 'Likelihood must be between 1 and 5';
    }

    if (formData.severity < 1 || formData.severity > 5) {
      newErrors.severity = 'Severity must be between 1 and 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleInputChange = (field: keyof CreateRiskRequest, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const score = computeScore(formData.likelihood, formData.severity);
  const level = computeLevel(score);

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {isEditing ? 'Edit Risk' : 'Create New Risk'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="hazard" className="block text-sm font-medium text-gray-700 mb-1">
            Hazard Description *
          </label>
          <input
            id="hazard"
            type="text"
            value={formData.hazard}
            onChange={(e) => handleInputChange('hazard', e.target.value)}
            className={`input-field ${errors.hazard ? 'border-red-500' : ''}`}
            placeholder="Describe the hazard..."
            aria-describedby={errors.hazard ? 'hazard-error' : undefined}
            disabled={isLoading}
          />
          {errors.hazard && (
            <p id="hazard-error" className="mt-1 text-sm text-red-600">
              {errors.hazard}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="likelihood" className="block text-sm font-medium text-gray-700 mb-1">
              Likelihood (1-5) *
            </label>
            <select
              id="likelihood"
              value={formData.likelihood}
              onChange={(e) => handleInputChange('likelihood', parseInt(e.target.value))}
              className={`input-field ${errors.likelihood ? 'border-red-500' : ''}`}
              disabled={isLoading}
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>
                  {num} - {num === 1 ? 'Very Low' : num === 2 ? 'Low' : num === 3 ? 'Medium' : num === 4 ? 'High' : 'Very High'}
                </option>
              ))}
            </select>
            {errors.likelihood && (
              <p className="mt-1 text-sm text-red-600">{errors.likelihood}</p>
            )}
          </div>

          <div>
            <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-1">
              Severity (1-5) *
            </label>
            <select
              id="severity"
              value={formData.severity}
              onChange={(e) => handleInputChange('severity', parseInt(e.target.value))}
              className={`input-field ${errors.severity ? 'border-red-500' : ''}`}
              disabled={isLoading}
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>
                  {num} - {num === 1 ? 'Very Low' : num === 2 ? 'Low' : num === 3 ? 'Medium' : num === 4 ? 'High' : 'Very High'}
                </option>
              ))}
            </select>
            {errors.severity && (
              <p className="mt-1 text-sm text-red-600">{errors.severity}</p>
            )}
          </div>
        </div>

        <div className="bg-mint-50 p-4 rounded-lg border border-mint-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-mint-800">Calculated Risk:</span>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-mint-700">
                Score: <span className="font-semibold">{score}</span>
              </span>
              <span className="text-sm text-mint-700">
                Level: <span className="font-semibold">{level}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : isEditing ? 'Update Risk' : 'Create Risk'}
          </button>
        </div>
      </form>
    </div>
  );
}
