import { Message, ReviewStatus } from '../types';

// Confidence scoring weights
const MAX_MESSAGE_SCORE = 30;
const MESSAGE_SCORE_MULTIPLIER = 3;
const MAX_CONSISTENCY_SCORE = 30;
const CONSISTENCY_SCORE_MULTIPLIER = 2;
const MAX_EVIDENCE_SCORE = 25;
const EVIDENCE_SCORE_PER_PATTERN = 2;
const TEMPORAL_SCORE_1_DAY = 15;
const TEMPORAL_SCORE_3_DAYS = 10;
const TEMPORAL_SCORE_7_DAYS = 5;

/**
 * Calculate confidence score for a cluster
 * Returns a score between 0 and 100
 *
 * Scoring algorithm:
 * - Message count: More messages = higher confidence (max 30 points)
 * - Keyword consistency: Repeated keywords across messages (max 30 points)
 * - Evidence strength: File references, error messages, paths (max 25 points)
 * - Temporal clustering: Messages close in time (max 15 points)
 */
export function calculateConfidence(messages: Message[]): number {
  let score = 0;

  // Factor 1: Message count (max 30 points)
  const messageCount = messages.length;
  const messageScore = Math.min(messageCount * MESSAGE_SCORE_MULTIPLIER, MAX_MESSAGE_SCORE);
  score += messageScore;

  // Factor 2: Keyword consistency (max 30 points)
  const allKeywords = messages.flatMap(m => m.keywords);
  const keywordCounts = new Map<string, number>();
  
  allKeywords.forEach(keyword => {
    keywordCounts.set(keyword, (keywordCounts.get(keyword) || 0) + 1);
  });

  // Calculate how many keywords appear in multiple messages
  const repeatedKeywords = Array.from(keywordCounts.values())
    .filter(count => count > 1).length;
  
  const consistencyScore = Math.min(repeatedKeywords * CONSISTENCY_SCORE_MULTIPLIER, MAX_CONSISTENCY_SCORE);
  score += consistencyScore;

  // Factor 3: Evidence strength (max 25 points)
  // Check for specific file mentions, error messages, or concrete details
  const evidencePatterns = [
    /\.(ts|tsx|js|jsx|md|json)/i,  // File extensions
    /line \d+/i,                     // Line numbers
    /error|failed|exception/i,       // Error indicators
    /src\/|docs\//i,                 // Path indicators
  ];

  let evidenceScore = 0;
  messages.forEach(msg => {
    for (const pattern of evidencePatterns) {
      if (pattern.test(msg.content)) {
        evidenceScore += EVIDENCE_SCORE_PER_PATTERN;
      }
    }
  });
  score += Math.min(evidenceScore, MAX_EVIDENCE_SCORE);

  // Factor 4: Temporal clustering (max 15 points)
  // Messages close in time indicate active issue
  if (messages.length >= 2) {
    const timestamps = messages.map(m => m.timestamp.getTime()).sort();
    const timeSpan = timestamps[timestamps.length - 1] - timestamps[0];
    const daysSpan = timeSpan / (1000 * 60 * 60 * 24);
    
    // Issues reported within a few days get higher score
    if (daysSpan <= 1) score += TEMPORAL_SCORE_1_DAY;
    else if (daysSpan <= 3) score += TEMPORAL_SCORE_3_DAYS;
    else if (daysSpan <= 7) score += TEMPORAL_SCORE_7_DAYS;
  }

  return Math.min(Math.round(score), 100);
}

/**
 * Determine review status based on confidence score
 */
export function determineReviewStatus(confidence: number): ReviewStatus {
  if (confidence >= 75) return 'ready_for_bob';
  if (confidence >= 50) return 'needs_human_review';
  return 'insufficient_signal';
}

/**
 * Generate confidence explanation
 */
export function explainConfidence(messages: Message[]): string {
  const factors: string[] = [];

  if (messages.length >= 7) {
    factors.push(`${messages.length} related messages`);
  }

  const allKeywords = messages.flatMap(m => m.keywords);
  const keywordCounts = new Map<string, number>();
  allKeywords.forEach(k => keywordCounts.set(k, (keywordCounts.get(k) || 0) + 1));
  const repeatedKeywords = Array.from(keywordCounts.values()).filter(c => c > 1).length;
  
  if (repeatedKeywords >= 5) {
    factors.push('consistent terminology');
  }

  const hasFileReferences = messages.some(m => /\.(ts|tsx|js|jsx|md)/i.test(m.content));
  if (hasFileReferences) {
    factors.push('specific file references');
  }

  if (factors.length === 0) {
    return 'Limited evidence available';
  }

  return `High confidence due to: ${factors.join(', ')}`;
}

// Made with Bob
