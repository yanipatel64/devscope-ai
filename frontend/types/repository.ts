export interface ArchitectureNode {
  layer: string;
  reason: string;
}

export interface RepositoryInfo {
  name: string;
  owner: string;
  language: string;
  stars: number;
  forks: number;
  updated: string;
  description?: string;
}

export interface Scores {
  project_health: number;
  security: number;
  architecture: number;
  maintainability: number;
}

export interface ScoreFactors {
  project_health?: string[];
  security?: string[];
  architecture?: string[];
  maintainability?: string[];
}
export interface RepositoryMetrics {
  total_files: number;
  total_lines: number;
  languages: Record<string, number>;
  important_files: string[];
  folder_structure: string[];

  architecture_flow: ArchitectureNode[];
}

export interface AnalysisResult {
  repository_info: RepositoryInfo;
  scores: Scores;
  score_factors?: ScoreFactors;
  repository_metrics: RepositoryMetrics;
  recommendations?: string[];
  ai_analysis: string;
  complexity: string;
}