import { Cluster, EngineeringTicket } from '../types';

/**
 * Generate IBM Bob IDE task prompt from ticket
 */
export function generateBobPrompt(ticket: EngineeringTicket, cluster: Cluster): string {
  const mode = determineBobMode(ticket);
  const context = buildContext(ticket, cluster);
  const task = buildTask(ticket);
  const constraints = buildConstraints(ticket);
  const expectedOutput = buildExpectedOutput(ticket);

  return `# IBM Bob IDE Task Prompt

## Mode: ${mode}

## Context

${context}

## Task

${task}

## Affected Files

${ticket.affectedFiles.length > 0 ? ticket.affectedFiles.map(f => `- ${f}`).join('\n') : '- Files to be determined during implementation'}

## Constraints

${constraints.map(c => `- ${c}`).join('\n')}

## Expected Output

${expectedOutput.map(o => `- ${o}`).join('\n')}

## Acceptance Criteria

${ticket.acceptanceCriteria.map(ac => `- [ ] ${ac}`).join('\n')}

## Test Plan

### Unit Tests
${ticket.testPlan.unitTests.map(t => `- [ ] ${t}`).join('\n')}

### Integration Tests
${ticket.testPlan.integrationTests.map(t => `- [ ] ${t}`).join('\n')}

### Manual Tests
${ticket.testPlan.manualTests.map(t => `- [ ] ${t}`).join('\n')}

## Documentation Updates

Files to update:
${ticket.docsUpdatePlan.filesToUpdate.map(f => `- ${f}`).join('\n')}

Sections to update:
${ticket.docsUpdatePlan.sections.map(s => `- ${s}`).join('\n')}

Rationale: ${ticket.docsUpdatePlan.rationale}
`;
}

/**
 * Determine appropriate Bob mode for the task
 */
function determineBobMode(ticket: EngineeringTicket): string {
  // Most issues are code changes
  if (ticket.category === 'documentation') {
    return 'Code'; // Even docs changes go through code mode for file edits
  }
  
  if (ticket.severity === 'critical' || ticket.affectedFiles.length > 5) {
    return 'Plan'; // Complex changes need planning first
  }

  return 'Code'; // Default to code mode for implementation
}

/**
 * Build context section
 */
function buildContext(ticket: EngineeringTicket, cluster: Cluster): string {
  const lines: string[] = [];
  
  lines.push(`Issue cluster detected from developer support messages:`);
  lines.push(`- Category: ${ticket.category}`);
  lines.push(`- Severity: ${ticket.severity}`);
  lines.push(`- Confidence: ${cluster.confidence}%`);
  lines.push(`- Messages: ${cluster.messages.length} related reports`);
  lines.push('');
  lines.push('Evidence:');
  
  ticket.evidence.forEach(evidence => {
    lines.push(`- "${evidence}"`);
  });

  return lines.join('\n');
}

/**
 * Build task description
 */
function buildTask(ticket: EngineeringTicket): string {
  return ticket.title;
}

/**
 * Build constraints list
 */
function buildConstraints(ticket: EngineeringTicket): string[] {
  const constraints: string[] = [];

  // Category-specific constraints
  switch (ticket.category) {
    case 'documentation':
      constraints.push('Maintain consistent terminology across all documentation');
      constraints.push('Ensure examples are tested and working');
      constraints.push('Keep documentation clear and beginner-friendly');
      break;

    case 'configuration':
      constraints.push('Maintain backward compatibility where possible');
      constraints.push('Provide clear migration guide if breaking changes');
      constraints.push('Add validation for configuration values');
      constraints.push('Update all references consistently');
      break;

    case 'validation':
      constraints.push('Error messages must be user-friendly');
      constraints.push('Include specific field names in error messages');
      constraints.push('Provide actionable guidance in error messages');
      constraints.push('Maintain consistent error response format');
      break;

    case 'onboarding':
      constraints.push('Prerequisites must be clearly listed');
      constraints.push('Steps must be in correct order');
      constraints.push('Include troubleshooting for common issues');
      constraints.push('Test on fresh system if possible');
      break;

    default:
      constraints.push('Maintain existing functionality');
      constraints.push('Follow project coding standards');
      constraints.push('Add appropriate tests');
  }

  // Severity-based constraints
  if (ticket.severity === 'high' || ticket.severity === 'critical') {
    constraints.push('Prioritize stability and safety');
    constraints.push('Include rollback plan');
  }

  return constraints;
}

/**
 * Build expected output list
 */
function buildExpectedOutput(ticket: EngineeringTicket): string[] {
  const outputs: string[] = [];

  // File changes
  if (ticket.affectedFiles.length > 0) {
    outputs.push(`Updated files: ${ticket.affectedFiles.join(', ')}`);
  }

  // Category-specific outputs
  switch (ticket.category) {
    case 'documentation':
      outputs.push('Consistent documentation across all files');
      outputs.push('Working code examples');
      outputs.push('Clear setup instructions');
      break;

    case 'configuration':
      outputs.push('Standardized configuration naming');
      outputs.push('Updated configuration documentation');
      outputs.push('Configuration validation');
      outputs.push('Migration guide (if needed)');
      break;

    case 'validation':
      outputs.push('Improved error messages with field names');
      outputs.push('Clear validation rules documentation');
      outputs.push('User-friendly error responses');
      break;

    case 'onboarding':
      outputs.push('Complete prerequisites list');
      outputs.push('Step-by-step setup instructions');
      outputs.push('Troubleshooting guide');
      break;

    default:
      outputs.push('Working implementation');
      outputs.push('Updated documentation');
      outputs.push('Test coverage');
  }

  return outputs;
}

/**
 * Copy Bob prompt to clipboard (for browser)
 */
export async function copyBobPromptToClipboard(prompt: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(prompt);
    return true;
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return false;
  }
}

// Made with Bob
