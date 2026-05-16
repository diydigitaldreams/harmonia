import { Message, Cluster } from '../types';
import { detectClusters, generateClusterSummary, extractEvidence, extractKeywords } from './clustering';
import { detectCategory, determineSeverity, inferAffectedFiles } from './categorization';
import { calculateConfidence, determineReviewStatus } from './scoring';

/**
 * Process messages and create clusters with full analysis
 */
export function processMessages(messages: Omit<Message, 'keywords'>[]): Cluster[] {
  // Add keywords to messages
  const messagesWithKeywords: Message[] = messages.map(msg => ({
    ...msg,
    keywords: extractKeywords(msg.content)
  }));

  // Detect clusters
  const messageClusters = detectClusters(messagesWithKeywords);

  // Analyze each cluster
  const clusters: Cluster[] = messageClusters.map((messages, index) => {
    const category = detectCategory(messages);
    const severity = determineSeverity(messages);
    const confidence = calculateConfidence(messages);
    const reviewStatus = determineReviewStatus(confidence);
    const summary = generateClusterSummary(messages);
    const evidence = extractEvidence(messages);
    const affectedFiles = inferAffectedFiles(messages);

    return {
      id: `cluster-${index + 1}`,
      messages,
      category,
      severity,
      confidence,
      reviewStatus,
      summary,
      evidence,
      affectedFiles,
      createdAt: new Date()
    };
  });

  // Sort by confidence (highest first)
  return clusters.sort((a, b) => b.confidence - a.confidence);
}

// Made with Bob
