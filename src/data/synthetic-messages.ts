import { Message } from '../types';

/**
 * Synthetic developer support messages for Harmonia demo.
 * These are not real user logs. They are manually created demonstration data.
 */

// Cluster 1: Environment Variable Naming Inconsistency
const envVarMessages: Omit<Message, 'keywords'>[] = [
  {
    id: 'msg-001',
    content: 'README says to use DATABASE_URL, but .env.example has DB_CONNECTION_STRING. Which one should I use?',
    timestamp: new Date('2026-05-10T10:23:00Z'),
    author: 'dev-001',
    channel: 'support'
  },
  {
    id: 'msg-002',
    content: 'Setup failed because I copied DB_CONNECTION_STRING from the example file, but the app is looking for DATABASE_URL.',
    timestamp: new Date('2026-05-10T11:45:00Z'),
    author: 'dev-002',
    channel: 'onboarding'
  },
  {
    id: 'msg-003',
    content: 'The setup docs and example env file disagree on the database variable name.',
    timestamp: new Date('2026-05-10T14:12:00Z'),
    author: 'dev-003',
    channel: 'support'
  },
  {
    id: 'msg-004',
    content: 'I get "DATABASE_URL is not defined" even after copying the sample .env values.',
    timestamp: new Date('2026-05-11T09:30:00Z'),
    author: 'dev-004',
    channel: 'support'
  },
  {
    id: 'msg-005',
    content: 'Looks like the config loader expects DATABASE_URL, while the sample env file uses DB_CONNECTION_STRING.',
    timestamp: new Date('2026-05-11T10:15:00Z'),
    author: 'dev-005',
    channel: 'support'
  },
  {
    id: 'msg-006',
    content: 'This env var mismatch cost our team time during onboarding. Can we standardize the name?',
    timestamp: new Date('2026-05-11T15:20:00Z'),
    author: 'dev-006',
    channel: 'support'
  },
  {
    id: 'msg-007',
    content: 'The README mentions DATABASE_URL, but the example file still shows DB_CONNECTION_STRING.',
    timestamp: new Date('2026-05-12T08:45:00Z'),
    author: 'dev-007',
    channel: 'support'
  },
  {
    id: 'msg-008',
    content: 'For onboarding, we should pick one database env variable name and use it everywhere.',
    timestamp: new Date('2026-05-12T11:00:00Z'),
    author: 'dev-008',
    channel: 'onboarding'
  }
];

// Cluster 2: Missing Dependency in Setup Instructions
const setupMessages: Omit<Message, 'keywords'>[] = [
  {
    id: 'msg-101',
    content: 'I followed the setup guide but got "command not found: npm" on the first install step.',
    timestamp: new Date('2026-05-09T09:15:00Z'),
    author: 'dev-101',
    channel: 'onboarding'
  },
  {
    id: 'msg-102',
    content: 'The setup steps do not clearly say that Node.js needs to be installed first.',
    timestamp: new Date('2026-05-09T10:30:00Z'),
    author: 'dev-102',
    channel: 'onboarding'
  },
  {
    id: 'msg-103',
    content: 'npm install worked on another machine, but this one fails because node is missing.',
    timestamp: new Date('2026-05-09T13:45:00Z'),
    author: 'dev-103',
    channel: 'support'
  },
  {
    id: 'msg-104',
    content: 'The error only says ENOENT. It should explain that Node.js 18 or newer is required.',
    timestamp: new Date('2026-05-10T08:20:00Z'),
    author: 'dev-104',
    channel: 'support'
  },
  {
    id: 'msg-105',
    content: 'Node.js version requirements should be more visible before the install command.',
    timestamp: new Date('2026-05-10T09:50:00Z'),
    author: 'dev-105',
    channel: 'onboarding'
  },
  {
    id: 'msg-106',
    content: 'Multiple people hit the Node.js version issue today. The setup guide needs a clearer prerequisite section.',
    timestamp: new Date('2026-05-10T14:30:00Z'),
    author: 'dev-106',
    channel: 'support'
  },
  {
    id: 'msg-107',
    content: 'After upgrading to Node.js 18, the app started. That requirement should be step one.',
    timestamp: new Date('2026-05-11T10:00:00Z'),
    author: 'dev-107',
    channel: 'onboarding'
  },
  {
    id: 'msg-108',
    content: 'Could the startup check tell users to verify their Node.js version?',
    timestamp: new Date('2026-05-11T11:15:00Z'),
    author: 'dev-108',
    channel: 'support'
  },
  {
    id: 'msg-109',
    content: 'Maybe add a preflight script that checks Node.js before starting the dev server.',
    timestamp: new Date('2026-05-11T15:45:00Z'),
    author: 'dev-109',
    channel: 'support'
  }
];

// Cluster 3: Unclear Validation Error Messages
const validationMessages: Omit<Message, 'keywords'>[] = [
  {
    id: 'msg-201',
    content: 'The app says "Validation failed" but does not tell me which field is wrong.',
    timestamp: new Date('2026-05-08T11:20:00Z'),
    author: 'dev-201',
    channel: 'support'
  },
  {
    id: 'msg-202',
    content: 'The API returns 400 with "invalid input". Can the response include field-level details?',
    timestamp: new Date('2026-05-08T14:35:00Z'),
    author: 'dev-202',
    channel: 'support'
  },
  {
    id: 'msg-203',
    content: 'Users are confused by generic validation errors because they do not know what to fix.',
    timestamp: new Date('2026-05-09T09:00:00Z'),
    author: 'dev-203',
    channel: 'support'
  },
  {
    id: 'msg-204',
    content: 'The validator should return the field name and the expected format when input fails.',
    timestamp: new Date('2026-05-09T10:45:00Z'),
    author: 'dev-204',
    channel: 'support'
  },
  {
    id: 'msg-205',
    content: 'For email errors, it would help to show a valid example instead of only saying invalid email.',
    timestamp: new Date('2026-05-09T11:30:00Z'),
    author: 'dev-205',
    channel: 'support'
  },
  {
    id: 'msg-206',
    content: 'Support keeps getting tickets from users who cannot tell what is wrong with their form input.',
    timestamp: new Date('2026-05-10T08:15:00Z'),
    author: 'dev-206',
    channel: 'support'
  },
  {
    id: 'msg-207',
    content: 'The error response should include failed field, reason, and valid format.',
    timestamp: new Date('2026-05-10T13:20:00Z'),
    author: 'dev-207',
    channel: 'support'
  },
  {
    id: 'msg-208',
    content: 'We seem to collect detailed validation errors internally but return only a generic message to the client.',
    timestamp: new Date('2026-05-10T15:40:00Z'),
    author: 'dev-208',
    channel: 'support'
  },
  {
    id: 'msg-209',
    content: 'This affects registration, profile update, and settings forms.',
    timestamp: new Date('2026-05-11T09:25:00Z'),
    author: 'dev-209',
    channel: 'support'
  },
  {
    id: 'msg-210',
    content: 'Clearer validation messages would reduce avoidable support tickets.',
    timestamp: new Date('2026-05-11T14:50:00Z'),
    author: 'dev-210',
    channel: 'support'
  }
];

export const syntheticMessages = {
  envVarCluster: envVarMessages,
  setupCluster: setupMessages,
  validationCluster: validationMessages
};

export const allSyntheticMessages: Omit<Message, 'keywords'>[] = [
  ...envVarMessages,
  ...setupMessages,
  ...validationMessages
];

// Made with Bob
