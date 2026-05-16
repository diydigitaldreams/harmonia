// Core type definitions for Harmonia

export type IssueCategory = 
  | "documentation"
  | "configuration"
  | "validation"
  | "onboarding"
  | "error-messaging"
  | "api"
  | "performance"
  | "other";

export type Severity = "low" | "medium" | "high" | "critical";

export type ReviewStatus = 
  | "ready_for_bob"
  | "needs_human_review"
  | "insufficient_signal";

export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  author: string;
  channel: string;
  keywords: string[];
}

export interface Cluster {
  id: string;
  messages: Message[];
  category: IssueCategory;
  severity: Severity;
  confidence: number;
  reviewStatus: ReviewStatus;
  summary: string;
  evidence: string[];
  affectedFiles: string[];
  createdAt: Date;
}

export interface TestPlan {
  unitTests: string[];
  integrationTests: string[];
  manualTests: string[];
}

export interface DocsUpdatePlan {
  filesToUpdate: string[];
  sections: string[];
  rationale: string;
}

export interface EngineeringTicket {
  id: string;
  clusterId: string;
  title: string;
  summary: string;
  category: IssueCategory;
  severity: Severity;
  evidence: string[];
  affectedFiles: string[];
  acceptanceCriteria: string[];
  testPlan: TestPlan;
  docsUpdatePlan: DocsUpdatePlan;
  bobPrompt: string;
  createdAt: Date;
}

export interface BobPrompt {
  mode: "plan" | "code" | "review";
  context: string;
  task: string;
  constraints: string[];
  expectedOutput: string[];
}

// Made with Bob
