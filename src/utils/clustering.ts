import { Message } from '../types';

// Clustering configuration constants
const SIMILARITY_THRESHOLD = 0.15; // Lower threshold for demo purposes
const MIN_CLUSTER_SIZE = 3;

/**
 * Extract keywords from message content
 * Simple keyword extraction based on common words and technical terms
 */
export function extractKeywords(content: string): string[] {
  // Validate input
  if (!content || content.trim().length === 0) return [];
  
  // Convert to lowercase and split into words
  const words = content.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3);

  // Common stop words to exclude
  const stopWords = new Set([
    'this', 'that', 'with', 'from', 'have', 'been', 'were', 'said',
    'each', 'which', 'their', 'there', 'would', 'could', 'should',
    'about', 'after', 'before', 'because', 'just', 'when', 'where',
    'what', 'getting', 'using', 'works', 'fine', 'then'
  ]);

  // Filter out stop words and return unique keywords
  const keywords = words.filter(word => !stopWords.has(word));
  return Array.from(new Set(keywords));
}

/**
 * Calculate similarity between two messages based on shared keywords
 * Returns a score between 0 and 1
 */
export function calculateSimilarity(msg1: Message, msg2: Message): number {
  const keywords1 = new Set(msg1.keywords);
  const keywords2 = new Set(msg2.keywords);
  
  // Early return if both messages have no keywords
  if (keywords1.size === 0 && keywords2.size === 0) return 0;
  
  // Calculate intersection
  const intersection = new Set([...keywords1].filter(k => keywords2.has(k)));
  
  // Calculate union
  const union = new Set([...keywords1, ...keywords2]);
  
  // Jaccard similarity
  if (union.size === 0) return 0;
  return intersection.size / union.size;
}

/**
 * Detect clusters of related messages
 * Uses similarity threshold to group messages
 */
export function detectClusters(messages: Message[]): Message[][] {
  const clusters: Message[][] = [];
  const processed = new Set<string>();

  // Add keywords to messages
  const messagesWithKeywords = messages.map(msg => ({
    ...msg,
    keywords: extractKeywords(msg.content)
  }));

  // For each message, find similar messages
  for (let i = 0; i < messagesWithKeywords.length; i++) {
    if (processed.has(messagesWithKeywords[i].id)) continue;

    const cluster: Message[] = [messagesWithKeywords[i]];
    processed.add(messagesWithKeywords[i].id);

    // Find similar messages
    for (let j = i + 1; j < messagesWithKeywords.length; j++) {
      if (processed.has(messagesWithKeywords[j].id)) continue;

      const similarity = calculateSimilarity(
        messagesWithKeywords[i],
        messagesWithKeywords[j]
      );

      if (similarity >= SIMILARITY_THRESHOLD) {
        cluster.push(messagesWithKeywords[j]);
        processed.add(messagesWithKeywords[j].id);
      }
    }

    // Only keep clusters with minimum size
    if (cluster.length >= MIN_CLUSTER_SIZE) {
      clusters.push(cluster);
    }
  }

  return clusters;
}

/**
 * Generate a summary for a cluster of messages
 */
export function generateClusterSummary(messages: Message[]): string {
  // Extract most common keywords
  const keywordCounts = new Map<string, number>();
  
  messages.forEach(msg => {
    msg.keywords.forEach(keyword => {
      keywordCounts.set(keyword, (keywordCounts.get(keyword) || 0) + 1);
    });
  });

  // Get top keywords
  const topKeywords = Array.from(keywordCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([keyword]) => keyword);

  // Create summary
  return `Issue related to: ${topKeywords.join(', ')}`;
}

/**
 * Extract evidence snippets from cluster messages
 */
export function extractEvidence(messages: Message[]): string[] {
  // Take the first 3 most relevant messages as evidence
  return messages
    .slice(0, 3)
    .map(msg => msg.content.substring(0, 150) + (msg.content.length > 150 ? '...' : ''));
}

// Made with Bob
