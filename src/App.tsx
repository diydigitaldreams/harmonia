import { useState } from 'react';
import { Cluster, EngineeringTicket } from './types';
import { allSyntheticMessages } from './data/synthetic-messages';
import { processMessages } from './utils/processor';
import { generateTicket } from './utils/ticket-generation';
import { generateBobPrompt, copyBobPromptToClipboard } from './utils/bob-prompt-generation';

type Step = 'input' | 'analysis' | 'output';

function App() {
  const [step, setStep] = useState<Step>('input');
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);
  const [ticket, setTicket] = useState<EngineeringTicket | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleLoadData = () => {
    const processedClusters = processMessages(allSyntheticMessages);
    setClusters(processedClusters);
    setStep('analysis');
  };

  const handleSelectCluster = (cluster: Cluster) => {
    setSelectedCluster(cluster);
    const generatedTicket = generateTicket(cluster);
    const bobPrompt = generateBobPrompt(generatedTicket, cluster);
    generatedTicket.bobPrompt = bobPrompt;
    setTicket(generatedTicket);
    setStep('output');
  };

  const handleCopyPrompt = async () => {
    if (ticket?.bobPrompt) {
      const success = await copyBobPromptToClipboard(ticket.bobPrompt);
      setCopySuccess(success);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleReset = () => {
    setStep('input');
    setClusters([]);
    setSelectedCluster(null);
    setTicket(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Harmonia
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Turn developer support chatter into repo-aware engineering action
              </p>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Built with IBM Bob IDE
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <StepIndicator number={1} label="Load Data" active={step === 'input'} completed={step !== 'input'} />
            <div className="w-16 h-1 bg-gray-300 dark:bg-gray-600"></div>
            <StepIndicator number={2} label="Analyze Clusters" active={step === 'analysis'} completed={step === 'output'} />
            <div className="w-16 h-1 bg-gray-300 dark:bg-gray-600"></div>
            <StepIndicator number={3} label="Generate Ticket" active={step === 'output'} completed={false} />
          </div>
        </div>

        {/* Step 1: Input */}
        {step === 'input' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Step 1: Load Synthetic Support Messages
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              This demo uses synthetic developer support messages. No real user data, PII, or confidential information is included.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Dataset Info</h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• 27 synthetic support messages</li>
                <li>• 3 distinct issue patterns</li>
                <li>• Environment variable inconsistency</li>
                <li>• Missing setup prerequisites</li>
                <li>• Unclear validation errors</li>
              </ul>
            </div>
            <button
              onClick={handleLoadData}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Load Synthetic Data & Analyze
            </button>
          </div>
        )}

        {/* Step 2: Analysis */}
        {step === 'analysis' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Step 2: Issue Clusters Detected
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Found {clusters.length} issue cluster{clusters.length !== 1 ? 's' : ''} with confidence scores. Select one to generate an engineering ticket.
              </p>
            </div>

            {clusters.map((cluster) => (
              <div
                key={cluster.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => handleSelectCluster(cluster)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {cluster.summary}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <CategoryBadge category={cluster.category} />
                      <SeverityBadge severity={cluster.severity} />
                      <ReviewStatusBadge status={cluster.reviewStatus} />
                    </div>
                  </div>
                  <ConfidenceScore score={cluster.confidence} />
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Evidence ({cluster.messages.length} messages):
                  </p>
                  <ul className="space-y-1">
                    {cluster.evidence.map((evidence, idx) => (
                      <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 pl-4 border-l-2 border-gray-300 dark:border-gray-600">
                        "{evidence}"
                      </li>
                    ))}
                  </ul>
                </div>

                {cluster.affectedFiles.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Likely Affected Files:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {cluster.affectedFiles.map((file, idx) => (
                        <code key={idx} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          {file}
                        </code>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium text-sm">
                    Generate Ticket →
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={handleReset}
              className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              ← Start Over
            </button>
          </div>
        )}

        {/* Step 3: Output */}
        {step === 'output' && ticket && selectedCluster && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Step 3: Engineering Ticket Generated
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Complete ticket with IBM Bob IDE prompt, acceptance criteria, test plan, and documentation updates.
              </p>
            </div>

            {/* Ticket Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {ticket.title}
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <CategoryBadge category={ticket.category} />
                <SeverityBadge severity={ticket.severity} />
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {ticket.summary}
              </p>

              {/* Affected Files */}
              {ticket.affectedFiles.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Affected Files:</h4>
                  <div className="flex flex-wrap gap-2">
                    {ticket.affectedFiles.map((file, idx) => (
                      <code key={idx} className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded">
                        {file}
                      </code>
                    ))}
                  </div>
                </div>
              )}

              {/* Acceptance Criteria */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Acceptance Criteria:</h4>
                <ul className="space-y-1">
                  {ticket.acceptanceCriteria.map((ac, idx) => (
                    <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                      <span className="mr-2">✓</span>
                      <span>{ac}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Test Plan */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Test Plan:</h4>
                {ticket.testPlan.unitTests.length > 0 && (
                  <div className="mb-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Unit Tests:</p>
                    <ul className="ml-4 space-y-1">
                      {ticket.testPlan.unitTests.map((test, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">• {test}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {ticket.testPlan.integrationTests.length > 0 && (
                  <div className="mb-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Integration Tests:</p>
                    <ul className="ml-4 space-y-1">
                      {ticket.testPlan.integrationTests.map((test, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">• {test}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {ticket.testPlan.manualTests.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Manual Tests:</p>
                    <ul className="ml-4 space-y-1">
                      {ticket.testPlan.manualTests.map((test, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">• {test}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Documentation Update Plan */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Documentation Updates:</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{ticket.docsUpdatePlan.rationale}</p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Files to update:</p>
                <ul className="ml-4 mb-2">
                  {ticket.docsUpdatePlan.filesToUpdate.map((file, idx) => (
                    <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">• {file}</li>
                  ))}
                </ul>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Sections:</p>
                <ul className="ml-4">
                  {ticket.docsUpdatePlan.sections.map((section, idx) => (
                    <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">• {section}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bob Prompt */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-lg shadow-lg p-6 border-2 border-indigo-200 dark:border-indigo-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  IBM Bob IDE Task Prompt
                </h3>
                <button
                  onClick={handleCopyPrompt}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  {copySuccess ? '✓ Copied!' : 'Copy Prompt'}
                </button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                This prompt can be used directly in IBM Bob IDE to implement the solution.
              </p>
              <pre className="bg-white dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-xs border border-gray-200 dark:border-gray-700">
                <code className="text-gray-800 dark:text-gray-200">{ticket.bobPrompt}</code>
              </pre>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep('analysis')}
                className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                ← Back to Clusters
              </button>
              <button
                onClick={handleReset}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 shadow-sm mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Harmonia - IBM Bob Hackathon 2024 | Built with IBM Bob IDE | Using synthetic data only
          </p>
        </div>
      </footer>
    </div>
  );
}

// Helper Components
function StepIndicator({ number, label, active, completed }: { number: number; label: string; active: boolean; completed: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
        active ? 'bg-indigo-600 text-white' : completed ? 'bg-green-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
      }`}>
        {completed ? '✓' : number}
      </div>
      <span className="text-xs mt-2 text-gray-600 dark:text-gray-400">{label}</span>
    </div>
  );
}

function ConfidenceScore({ score }: { score: number }) {
  const color = score >= 75 ? 'text-green-600 dark:text-green-400' : score >= 50 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400';
  return (
    <div className="text-right">
      <div className={`text-3xl font-bold ${color}`}>{score}%</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">confidence</div>
    </div>
  );
}

function CategoryBadge({ category }: { category: string }) {
  const colors: Record<string, string> = {
    documentation: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    configuration: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    validation: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    onboarding: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'error-messaging': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    api: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    performance: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    other: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[category] || colors.other}`}>
      {category}
    </span>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const colors: Record<string, string> = {
    critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[severity]}`}>
      {severity}
    </span>
  );
}

function ReviewStatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    ready_for_bob: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    needs_human_review: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    insufficient_signal: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  };
  const labels: Record<string, string> = {
    ready_for_bob: 'Ready for Bob',
    needs_human_review: 'Needs Review',
    insufficient_signal: 'Low Signal'
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {labels[status]}
    </span>
  );
}

export default App;

// Made with Bob
