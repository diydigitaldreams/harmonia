import { Message, IssueCategory, Severity } from '../types';

/**
 * Detect issue category based on message keywords
 */
export function detectCategory(messages: Message[]): IssueCategory {
  // Combine all keywords from cluster
  const allKeywords = messages.flatMap(msg => msg.keywords);
  const keywordSet = new Set(allKeywords.map(k => k.toLowerCase()));

  // Category detection patterns
  const patterns: Record<IssueCategory, string[]> = {
    documentation: ['readme', 'docs', 'documentation', 'guide', 'instructions', 'example', 'tutorial'],
    configuration: ['config', 'environment', 'variable', 'setup', 'settings', 'database_url', 'connection'],
    validation: ['validation', 'error', 'invalid', 'failed', 'format', 'field', 'input'],
    onboarding: ['onboarding', 'setup', 'install', 'getting', 'started', 'prerequisite', 'new'],
    'error-messaging': ['error', 'message', 'exception', 'failed', 'crash', 'undefined'],
    api: ['endpoint', 'response', 'request', 'status', 'code'],
    performance: ['slow', 'performance', 'speed', 'optimization', 'memory', 'cpu'],
    other: []
  };

  // Score each category
  const scores: Record<IssueCategory, number> = {
    documentation: 0,
    configuration: 0,
    validation: 0,
    onboarding: 0,
    'error-messaging': 0,
    api: 0,
    performance: 0,
    other: 0
  };

  // Calculate scores
  for (const [category, keywords] of Object.entries(patterns)) {
    for (const keyword of keywords) {
      if (keywordSet.has(keyword)) {
        scores[category as IssueCategory]++;
      }
    }
  }

  // Find category with highest score
  let maxScore = 0;
  let bestCategory: IssueCategory = 'other';

  for (const [category, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      bestCategory = category as IssueCategory;
    }
  }

  return bestCategory;
}

/**
 * Determine severity based on message content and frequency
 */
export function determineSeverity(messages: Message[]): Severity {
  const messageCount = messages.length;
  const allContent = messages.map(m => m.content.toLowerCase()).join(' ');

  // High severity indicators
  const criticalKeywords = ['crash', 'broken', 'critical', 'urgent', 'production', 'down'];
  const highKeywords = ['failed', 'error', 'cannot', 'unable', 'blocking'];
  const mediumKeywords = ['issue', 'problem', 'confused', 'unclear'];

  let severityScore = 0;

  // Check for severity keywords
  for (const keyword of criticalKeywords) {
    if (allContent.includes(keyword)) severityScore += 3;
  }
  for (const keyword of highKeywords) {
    if (allContent.includes(keyword)) severityScore += 2;
  }
  for (const keyword of mediumKeywords) {
    if (allContent.includes(keyword)) severityScore += 1;
  }

  // Factor in message count (more reports = higher severity)
  if (messageCount >= 10) severityScore += 2;
  else if (messageCount >= 7) severityScore += 1;

  // Determine severity
  if (severityScore >= 8) return 'critical';
  if (severityScore >= 5) return 'high';
  if (severityScore >= 2) return 'medium';
  return 'low';
}

/**
 * Infer likely affected files from message content
 */
export function inferAffectedFiles(messages: Message[]): string[] {
  const files: string[] = [];
  const allContent = messages.map(m => m.content).join(' ');

  // Common file patterns
  const filePatterns = [
    /README\.md/gi,
    /\.env\.example/gi,
    /src\/[a-zA-Z0-9/_-]+\.ts/gi,
    /src\/[a-zA-Z0-9/_-]+\.tsx/gi,
    /src\/[a-zA-Z0-9/_-]+\.js/gi,
    /docs\/[a-zA-Z0-9/_-]+\.md/gi,
    /config\/[a-zA-Z0-9/_-]+\.(ts|js|json)/gi,
  ];

  // Extract file mentions
  for (const pattern of filePatterns) {
    const matches = allContent.match(pattern);
    if (matches) {
      files.push(...matches);
    }
  }

  // Remove duplicates
  const uniqueFiles = Array.from(new Set(files));

  // If no files found, infer based on category
  if (uniqueFiles.length === 0) {
    const allKeywords = messages.flatMap(m => m.keywords);
    
    if (allKeywords.some(k => k.includes('readme') || k.includes('docs'))) {
      uniqueFiles.push('README.md', 'docs/setup.md');
    }
    if (allKeywords.some(k => k.includes('config') || k.includes('environment'))) {
      uniqueFiles.push('.env.example', 'src/config/database.ts');
    }
    if (allKeywords.some(k => k.includes('validation') || k.includes('error'))) {
      uniqueFiles.push('src/api/validators.ts', 'src/utils/validation.ts');
    }
  }

  return uniqueFiles.slice(0, 5); // Limit to 5 files
}

// Made with Bob
