import { Cluster, EngineeringTicket, TestPlan, DocsUpdatePlan } from '../types';

/**
 * Generate engineering ticket from cluster
 */
export function generateTicket(cluster: Cluster): EngineeringTicket {
  const title = generateTitle(cluster);
  const acceptanceCriteria = generateAcceptanceCriteria(cluster);
  const testPlan = generateTestPlan(cluster);
  const docsUpdatePlan = generateDocsUpdatePlan(cluster);

  return {
    id: `ticket-${cluster.id}`,
    clusterId: cluster.id,
    title,
    summary: cluster.summary,
    category: cluster.category,
    severity: cluster.severity,
    evidence: cluster.evidence,
    affectedFiles: cluster.affectedFiles,
    acceptanceCriteria,
    testPlan,
    docsUpdatePlan,
    bobPrompt: '', // Will be filled by bob-prompt-generation
    createdAt: new Date()
  };
}

/**
 * Generate ticket title from cluster
 */
function generateTitle(cluster: Cluster): string {
  const categoryTitles: Record<string, string> = {
    documentation: 'Fix documentation inconsistency',
    configuration: 'Resolve configuration issue',
    validation: 'Improve validation error messages',
    onboarding: 'Fix onboarding setup issue',
    'error-messaging': 'Improve error messaging',
    api: 'Fix API issue',
    performance: 'Improve performance',
    other: 'Address reported issue'
  };

  const baseTitle = categoryTitles[cluster.category] || 'Address reported issue';
  
  // Try to make it more specific based on keywords
  const keywords = cluster.messages.flatMap(m => m.keywords);
  const keywordCounts = new Map<string, number>();
  keywords.forEach(k => keywordCounts.set(k, (keywordCounts.get(k) || 0) + 1));
  
  const topKeyword = Array.from(keywordCounts.entries())
    .sort((a, b) => b[1] - a[1])[0];

  if (topKeyword && topKeyword[1] >= 3) {
    return `${baseTitle}: ${topKeyword[0]}`;
  }

  return baseTitle;
}

/**
 * Generate acceptance criteria for documentation issues
 */
function generateDocumentationCriteria(cluster: Cluster): string[] {
  const criteria = [
    'All documentation uses consistent terminology',
    'Examples match actual implementation',
    'Setup instructions are clear and complete'
  ];
  if (cluster.affectedFiles.length > 0) {
    criteria.push(`Updated files: ${cluster.affectedFiles.join(', ')}`);
  }
  return criteria;
}

/**
 * Generate acceptance criteria for configuration issues
 */
function generateConfigurationCriteria(): string[] {
  return [
    'Configuration naming is consistent across all files',
    'Environment variables are properly documented',
    'Default values are provided where appropriate',
    'Validation errors are clear and actionable'
  ];
}

/**
 * Generate acceptance criteria for validation issues
 */
function generateValidationCriteria(): string[] {
  return [
    'Error messages specify which field failed validation',
    'Error messages explain the expected format',
    'Error messages are user-friendly and actionable',
    'All validation errors are properly handled'
  ];
}

/**
 * Generate acceptance criteria for onboarding issues
 */
function generateOnboardingCriteria(): string[] {
  return [
    'Prerequisites are clearly listed',
    'Setup steps are complete and in correct order',
    'Common errors are documented with solutions',
    'New users can complete setup without assistance'
  ];
}

/**
 * Generate default acceptance criteria
 */
function generateDefaultCriteria(): string[] {
  return [
    'Issue is resolved as described in evidence',
    'No regression in existing functionality',
    'Changes are properly documented'
  ];
}

/**
 * Generate acceptance criteria
 */
function generateAcceptanceCriteria(cluster: Cluster): string[] {
  let criteria: string[] = [];

  // Category-specific criteria
  switch (cluster.category) {
    case 'documentation':
      criteria = generateDocumentationCriteria(cluster);
      break;
    case 'configuration':
      criteria = generateConfigurationCriteria();
      break;
    case 'validation':
      criteria = generateValidationCriteria();
      break;
    case 'onboarding':
      criteria = generateOnboardingCriteria();
      break;
    default:
      criteria = generateDefaultCriteria();
  }

  // Add severity-based criteria
  if (cluster.severity === 'high' || cluster.severity === 'critical') {
    criteria.push('Fix is tested in production-like environment');
  }

  return criteria;
}

/**
 * Generate test plan for documentation issues
 */
function generateDocumentationTests(): TestPlan {
  return {
    unitTests: [],
    integrationTests: [],
    manualTests: [
      'Follow setup instructions from scratch',
      'Verify all code examples work as documented',
      'Check for broken links and references'
    ]
  };
}

/**
 * Generate test plan for configuration issues
 */
function generateConfigurationTests(): TestPlan {
  return {
    unitTests: [
      'Test configuration loading with valid values',
      'Test configuration validation with invalid values',
      'Test default value handling'
    ],
    integrationTests: [
      'Test application startup with new configuration'
    ],
    manualTests: [
      'Verify .env.example matches documentation'
    ]
  };
}

/**
 * Generate test plan for validation issues
 */
function generateValidationTests(): TestPlan {
  return {
    unitTests: [
      'Test validation with valid input',
      'Test validation with each type of invalid input',
      'Test error message format and content'
    ],
    integrationTests: [
      'Test API endpoints return proper validation errors'
    ],
    manualTests: [
      'Verify error messages are user-friendly'
    ]
  };
}

/**
 * Generate test plan for onboarding issues
 */
function generateOnboardingTests(): TestPlan {
  return {
    unitTests: [],
    integrationTests: [
      'Test full onboarding flow'
    ],
    manualTests: [
      'Complete setup on fresh system',
      'Verify all prerequisites are documented',
      'Test error messages for missing dependencies'
    ]
  };
}

/**
 * Generate default test plan
 */
function generateDefaultTests(): TestPlan {
  return {
    unitTests: ['Test core functionality'],
    integrationTests: ['Test integration points'],
    manualTests: ['Manual verification of fix']
  };
}

/**
 * Generate test plan
 */
function generateTestPlan(cluster: Cluster): TestPlan {
  // Category-specific tests
  switch (cluster.category) {
    case 'documentation':
      return generateDocumentationTests();
    case 'configuration':
      return generateConfigurationTests();
    case 'validation':
      return generateValidationTests();
    case 'onboarding':
      return generateOnboardingTests();
    default:
      return generateDefaultTests();
  }
}

/**
 * Generate documentation update plan for documentation issues
 */
function generateDocumentationUpdatePlan(): DocsUpdatePlan {
  return {
    filesToUpdate: ['README.md'],
    sections: ['Setup instructions', 'Configuration examples'],
    rationale: 'Ensure documentation matches implementation'
  };
}

/**
 * Generate documentation update plan for configuration issues
 */
function generateConfigurationUpdatePlan(): DocsUpdatePlan {
  return {
    filesToUpdate: ['README.md', 'docs/setup.md'],
    sections: ['Environment variables', 'Configuration reference'],
    rationale: 'Document configuration changes and standardize naming'
  };
}

/**
 * Generate documentation update plan for validation issues
 */
function generateValidationUpdatePlan(): DocsUpdatePlan {
  return {
    filesToUpdate: ['docs/api-reference.md'],
    sections: ['API error responses', 'Validation rules'],
    rationale: 'Document improved error messages and validation behavior'
  };
}

/**
 * Generate documentation update plan for onboarding issues
 */
function generateOnboardingUpdatePlan(): DocsUpdatePlan {
  return {
    filesToUpdate: ['README.md', 'docs/setup.md'],
    sections: ['Prerequisites', 'Installation steps', 'Troubleshooting'],
    rationale: 'Improve onboarding documentation based on user feedback'
  };
}

/**
 * Generate documentation update plan for API issues
 */
function generateApiUpdatePlan(): DocsUpdatePlan {
  return {
    filesToUpdate: ['docs/api-reference.md'],
    sections: ['Relevant sections based on changes'],
    rationale: 'Update documentation to reflect changes'
  };
}

/**
 * Generate default documentation update plan
 */
function generateDefaultUpdatePlan(): DocsUpdatePlan {
  return {
    filesToUpdate: [],
    sections: ['Relevant sections based on changes'],
    rationale: 'Update documentation to reflect changes'
  };
}

/**
 * Generate documentation update plan
 */
function generateDocsUpdatePlan(cluster: Cluster): DocsUpdatePlan {
  // Check for README in affected files
  const hasReadme = cluster.affectedFiles.some(f => f.includes('README'));
  
  // Get base plan based on category
  let plan: DocsUpdatePlan;
  switch (cluster.category) {
    case 'documentation':
      plan = generateDocumentationUpdatePlan();
      break;
    case 'configuration':
      plan = generateConfigurationUpdatePlan();
      break;
    case 'validation':
      plan = generateValidationUpdatePlan();
      break;
    case 'onboarding':
      plan = generateOnboardingUpdatePlan();
      break;
    case 'api':
      plan = generateApiUpdatePlan();
      break;
    default:
      plan = generateDefaultUpdatePlan();
  }

  // Add README if it's in affected files and not already included
  if (hasReadme && !plan.filesToUpdate.includes('README.md')) {
    plan.filesToUpdate.unshift('README.md');
  }

  return plan;
}

// Made with Bob
