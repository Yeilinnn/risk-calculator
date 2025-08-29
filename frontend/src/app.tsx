import React, { useState, useEffect } from 'react';
import { Risk, CreateRiskRequest, UpdateRiskRequest, RiskFilters } from './types/risk';
import { fetchRisks, createRisk, updateRisk, deleteRisk } from './lib/api';
import { RiskForm } from './components/risk-form';
import { RiskFilters as RiskFiltersComponent } from './components/risk-filters';
import { RiskTable } from './components/risk-table';
import { RiskMatrix } from './components/risk-matrix';
import { ExportButton } from './components/export-button';
import { Plus, BarChart3, Table } from 'lucide-react';

type ViewMode = 'table' | 'matrix';

export function App() {
  const [risks, setRisks] = useState<Risk[]>([]);
  const [filters, setFilters] = useState<RiskFilters>({});
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [showForm, setShowForm] = useState(false);
  const [editingRisk, setEditingRisk] = useState<Risk | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch risks when filters change
  useEffect(() => {
    loadRisks();
  }, [filters]);

  const loadRisks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchRisks(filters);
      setRisks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load risks');
      console.error('Error loading risks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateRisk = async (riskData: CreateRiskRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      const newRisk = await createRisk(riskData);
      setRisks(prev => [newRisk, ...prev]);
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create risk');
      console.error('Error creating risk:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateRisk = async (riskData: UpdateRiskRequest) => {
    if (!editingRisk) return;

    try {
      setIsLoading(true);
      setError(null);
      const updatedRisk = await updateRisk(editingRisk.id, riskData);
      setRisks(prev => prev.map(risk => 
        risk.id === editingRisk.id ? updatedRisk : risk
      ));
      setEditingRisk(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update risk');
      console.error('Error updating risk:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRisk = async (risk: Risk) => {
    try {
      setIsLoading(true);
      setError(null);
      await deleteRisk(risk.id);
      setRisks(prev => prev.filter(r => r.id !== risk.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete risk');
      console.error('Error deleting risk:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditRisk = (risk: Risk) => {
    setEditingRisk(risk);
    setShowForm(true);
  };

  const handleViewRisk = (risk: Risk) => {
    // For now, just show in console. Could be expanded to show a modal
    console.log('Viewing risk:', risk);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingRisk(null);
  };

  const handleFormSubmit = async (data: CreateRiskRequest | UpdateRiskRequest) => {
    if (editingRisk) {
      await handleUpdateRisk(data);
    } else {
      await handleCreateRisk(data as CreateRiskRequest);
    }
  };

  return (
    <div className="min-h-screen bg-mint-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-mint-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Risk Calculator</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary flex items-center space-x-2"
                disabled={isLoading}
              >
                <Plus className="w-4 h-4" />
                <span>Add Risk</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="w-5 h-5 bg-red-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <RiskForm
                risk={editingRisk || undefined}
                onSubmit={handleFormSubmit}
                onCancel={handleCancelForm}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <RiskFiltersComponent
              filters={filters}
              onFiltersChange={setFilters}
            />
            
            <div className="card">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Actions</h3>
              <div className="space-y-3">
                <ExportButton risks={risks} disabled={isLoading} />
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      viewMode === 'table'
                        ? 'bg-mint-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    aria-label="Switch to table view"
                  >
                    <Table className="w-4 h-4 inline mr-2" />
                    Table
                  </button>
                  <button
                    onClick={() => setViewMode('matrix')}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      viewMode === 'matrix'
                        ? 'bg-mint-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    aria-label="Switch to matrix view"
                  >
                    <BarChart3 className="w-4 h-4 inline mr-2" />
                    Matrix
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {viewMode === 'table' ? (
              <RiskTable
                risks={risks}
                onEdit={handleEditRisk}
                onDelete={handleDeleteRisk}
                onView={handleViewRisk}
                isLoading={isLoading}
              />
            ) : (
              <RiskMatrix risks={risks} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
