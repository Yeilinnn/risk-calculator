import React from 'react';
import { RiskLevel, RiskFilters as RiskFiltersType } from '../types/risk';
import { Search, Filter } from 'lucide-react';

interface RiskFiltersProps {
  filters: RiskFiltersType;
  onFiltersChange: (filters: RiskFiltersType) => void;
}

export function RiskFilters({ filters, onFiltersChange }: RiskFiltersProps) {
  const handleSearchChange = (searchQuery: string) => {
    onFiltersChange({ ...filters, searchQuery: searchQuery || undefined });
  };

  const handleLevelChange = (level: RiskLevel | '') => {
    onFiltersChange({ ...filters, level: level || undefined });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = filters.level || filters.searchQuery;

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="w-5 h-5 text-mint-600" />
        <h3 className="text-lg font-medium text-gray-800">Filters</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Hazards
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="search"
              type="text"
              value={filters.searchQuery || ''}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by hazard description..."
              className="input-field pl-10"
              aria-label="Search hazards"
            />
          </div>
        </div>

        <div>
          <label htmlFor="level-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Risk Level
          </label>
          <select
            id="level-filter"
            value={filters.level || ''}
            onChange={(e) => handleLevelChange(e.target.value as RiskLevel | '')}
            className="input-field"
            aria-label="Filter by risk level"
          >
            <option value="">All Levels</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        {hasActiveFilters && (
          <div className="pt-2">
            <button
              onClick={clearFilters}
              className="text-sm text-mint-600 hover:text-mint-700 font-medium transition-colors duration-200"
              aria-label="Clear all filters"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
