import { Message } from '../types';

/**
 * Synthetic developer support messages for Harmonia demo
 * These are NOT real user data - all messages are manually created for demonstration purposes
 */

// Cluster 1: Environment Variable Naming Inconsistency
const envVarMessages: Omit<Message, 'keywords'>[] = [
  {
    id: 'msg-001',
    content: 'The README says to use DATABASE_URL but my .env.example has DB_CONNECTION_STRING. Which one is correct?',
    timestamp: new Date('2024-01-15T10:23:00Z'),
    author: 'dev_alex',
    channel: 'support'
  },
  {
    id: 'msg-002',
    content: 'Setup failed because I used DB_CONNECTION_STRING from the example file but the app expects DATABASE_URL',
    timestamp: new Date('2024-01-15T11:45:00Z'),
    author: 'sarah_codes',
    channel: 'onboarding'
  },
  {
    id: 'msg-003',
    content: 'Documentation is inconsistent about environment variables. README mentions DATABASE_URL, .env.example shows DB_CONNECTION_STRING',
    timestamp: new Date('2024-01-15T14:12:00Z'),
    author: 'mike_dev',
    channel: 'support'
  },
  {
    id: 'msg-004',
    content: 'Getting "DATABASE_URL is not defined" error even though I copied everything from .env.example',
    timestamp: new Date('2024-01-16T09:30:00Z'),
    author: 'jen_builds',
    channel: 'support'
  },
  {
    id: 'msg-005',
    content: 'The config loader in src/config/database.ts looks for DATABASE_URL but our example file uses a different name',
    timestamp: new Date('2024-01-16T10:15:00Z'),
    author: 'code_reviewer_bob',
    channel: 'support'
  },
  {
    id: 'msg-006',
    content: 'New team member spent 2 hours debugging this env var mismatch. Can we standardize the naming?',
    timestamp: new Date('2024-01-16T15:20:00Z'),
    author: 'team_lead_chris',
    channel: 'support'
  },
  {
    id: 'msg-007',
    content: 'I think the issue is in the README at line 47 where it says DATABASE_URL but .env.example line 3 has DB_CONNECTION_STRING',
    timestamp: new Date('2024-01-17T08:45:00Z'),
    author: 'detail_oriented_dana',
    channel: 'support'
  },
  {
    id: 'msg-008',
    content: 'This is confusing for onboarding. We should pick one name and use it everywhere',
    timestamp: new Date('2024-01-17T11:00:00Z'),
    author: 'onboarding_lead',
    channel: 'onboarding'
  }
];

// Cluster 2: Missing Dependency in Setup Instructions
const setupMessages: Omit<Message, 'keywords'>[] = [
  {
    id: 'msg-101',
    content: 'Followed the setup guide but getting "command not found: npm" error',
    timestamp: new Date('2024-01-14T09:15:00Z'),
    author: 'new_contributor',
    channel: 'onboarding'
  },
  {
    id: 'msg-102',
    content: 'The README setup steps don\'t mention installing Node.js. Should that be a prerequisite?',
    timestamp: new Date('2024-01-14T10:30:00Z'),
    author: 'setup_helper',
    channel: 'onboarding'
  },
  {
    id: 'msg-103',
    content: 'npm install works fine but then npm run dev fails with "node: command not found"',
    timestamp: new Date('2024-01-14T13:45:00Z'),
    author: 'frustrated_dev',
    channel: 'support'
  },
  {
    id: 'msg-104',
    content: 'Error message just says "ENOENT" but doesn\'t explain that Node.js 18+ is required',
    timestamp: new Date('2024-01-15T08:20:00Z'),
    author: 'error_reporter',
    channel: 'support'
  },
  {
    id: 'msg-105',
    content: 'The prerequisites section should list Node.js version requirement more prominently',
    timestamp: new Date('2024-01-15T09:50:00Z'),
    author: 'doc_reader',
    channel: 'onboarding'
  },
  {
    id: 'msg-106',
    content: 'Three people on my team hit this Node.js version issue today. The setup guide needs to be clearer',
    timestamp: new Date('2024-01-15T14:30:00Z'),
    author: 'team_manager',
    channel: 'support'
  },
  {
    id: 'msg-107',
    content: 'I upgraded to Node.js 18 and now it works, but this should be in step 1 of the README',
    timestamp: new Date('2024-01-16T10:00:00Z'),
    author: 'problem_solver',
    channel: 'onboarding'
  },
  {
    id: 'msg-108',
    content: 'The error message in vite.config.ts could mention checking Node.js version',
    timestamp: new Date('2024-01-16T11:15:00Z'),
    author: 'code_inspector',
    channel: 'support'
  },
  {
    id: 'msg-109',
    content: 'Maybe add a validation script that checks Node.js version before starting the dev server?',
    timestamp: new Date('2024-01-16T15:45:00Z'),
    author: 'automation_fan',
    channel: 'support'
  }
];

// Cluster 3: Unclear Validation Error Messages
const validationMessages: Omit<Message, 'keywords'>[] = [
  {
    id: 'msg-201',
    content: 'Getting "Validation failed" error but no details about what field is invalid',
    timestamp: new Date('2024-01-13T11:20:00Z'),
    author: 'api_user',
    channel: 'support'
  },
  {
    id: 'msg-202',
    content: 'The API returns 400 with just "invalid input" - can we get more specific error messages?',
    timestamp: new Date('2024-01-13T14:35:00Z'),
    author: 'frontend_dev',
    channel: 'support'
  },
  {
    id: 'msg-203',
    content: 'Users are confused by the generic validation errors. They don\'t know what to fix',
    timestamp: new Date('2024-01-14T09:00:00Z'),
    author: 'ux_designer',
    channel: 'support'
  },
  {
    id: 'msg-204',
    content: 'The validation logic in src/api/validators.ts should return field-specific error messages',
    timestamp: new Date('2024-01-14T10:45:00Z'),
    author: 'backend_dev',
    channel: 'support'
  },
  {
    id: 'msg-205',
    content: 'Example: instead of "invalid email", say "email must be in format user@domain.com"',
    timestamp: new Date('2024-01-14T11:30:00Z'),
    author: 'helpful_dev',
    channel: 'support'
  },
  {
    id: 'msg-206',
    content: 'Support tickets are piling up because users can\'t figure out what\'s wrong with their input',
    timestamp: new Date('2024-01-15T08:15:00Z'),
    author: 'support_lead',
    channel: 'support'
  },
  {
    id: 'msg-207',
    content: 'The error response should include which field failed and what the valid format is',
    timestamp: new Date('2024-01-15T13:20:00Z'),
    author: 'api_designer',
    channel: 'support'
  },
  {
    id: 'msg-208',
    content: 'I looked at the code - we\'re using a validation library but not exposing the detailed errors',
    timestamp: new Date('2024-01-15T15:40:00Z'),
    author: 'code_archaeologist',
    channel: 'support'
  },
  {
    id: 'msg-209',
    content: 'This affects the user registration form, profile update, and settings pages',
    timestamp: new Date('2024-01-16T09:25:00Z'),
    author: 'qa_tester',
    channel: 'support'
  },
  {
    id: 'msg-210',
    content: 'Better error messages would reduce support load by at least 30%',
    timestamp: new Date('2024-01-16T14:50:00Z'),
    author: 'metrics_analyst',
    channel: 'support'
  }
];

// Export all synthetic messages
export const syntheticMessages = {
  envVarCluster: envVarMessages,
  setupCluster: setupMessages,
  validationCluster: validationMessages
};

// Combined array of all messages for processing
export const allSyntheticMessages: Omit<Message, 'keywords'>[] = [
  ...envVarMessages,
  ...setupMessages,
  ...validationMessages
];

// Made with Bob
