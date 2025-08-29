import { Risk, CreateRiskRequest, UpdateRiskRequest, RiskFilters } from '../types/risk';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Fetches risks with optional filtering
 */
export async function fetchRisks(filters: RiskFilters = {}): Promise<Risk[]> {
  const params = new URLSearchParams();
  
  if (filters.level) {
    params.append('level', filters.level);
  }
  
  if (filters.searchQuery) {
    params.append('q', filters.searchQuery);
  }

  const response = await fetch(`${API_BASE_URL}/risks?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch risks: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Creates a new risk
 */
export async function createRisk(riskData: CreateRiskRequest): Promise<Risk> {
  const response = await fetch(`${API_BASE_URL}/risks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(riskData),
  });

  if (!response.ok) {
    throw new Error(`Failed to create risk: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Updates an existing risk
 */
export async function updateRisk(id: string, riskData: UpdateRiskRequest): Promise<Risk> {
  const response = await fetch(`${API_BASE_URL}/risks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(riskData),
  });

  if (!response.ok) {
    throw new Error(`Failed to update risk: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Deletes a risk
 */
export async function deleteRisk(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/risks/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete risk: ${response.statusText}`);
  }
}

/**
 * Fetches a single risk by ID
 */
export async function fetchRisk(id: string): Promise<Risk> {
  const response = await fetch(`${API_BASE_URL}/risks/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch risk: ${response.statusText}`);
  }

  return response.json();
}
