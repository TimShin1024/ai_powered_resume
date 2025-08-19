import React, { useState, useEffect } from 'react';
import type { AIGeneratedContent } from '../types';
import { CopyButton } from './CopyButton';

interface OutputSectionProps {
  content: AIGeneratedContent | null;
  isLoading: boolean;
  error: string | null;
  t: { [key: string]: string };
}

type TabKey = 'optimizedResume' | 'coverLetter' | 'interviewScript';

const tabConfig: Record<TabKey, { color: string; labelKey: string }> = {
  optimizedResume: { color: 'indigo', labelKey: 'resume' },
  coverLetter: { color: 'sky', labelKey: 'coverLetter' },
  interviewScript: { color: 'emerald', labelKey: 'script' },
};

const LoadingIndicator: React.FC<{ t: { [key: string]: string } }> = ({ t }) => (
  <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center bg-slate-800 rounded-xl shadow-lg border border-slate-700 h-full">
    <div className="w-16 h-16 border-4 border-t-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-lg font-semibold text-slate-300">{t.outputLoadingTitle}</p>
    <p className="text-slate-400">{t.outputLoadingDescription}</p>
  </div>
);

const ErrorDisplay: React.FC<{ message: string; t: { [key: string]: string } }> = ({ message, t }) => (
  <div className="bg-red-900/50 border border-red-600 text-red-300 p-4 rounded-lg" role="alert">
    <div className="flex">
      <div className="py-1">
        <svg className="h-6 w-6 text-red-400 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <p className="font-bold text-red-200">{t.errorTitle}</p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  </div>
);

const InitialState: React.FC<{ t: { [key: string]: string } }> = ({ t }) => (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-slate-800 rounded-xl shadow-lg border border-slate-700">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-slate-600 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5 0-2.268-2.268a3.375 3.375 0 0 1 0-4.773l2.268-2.268a3.375 3.375 0 0 1 4.773 0l2.268 2.268a3.375 3.375 0 0 1 0 4.773l-2.268 2.268a3.375 3.375 0 0 1-4.773 0Z" />
        </svg>
        <h3 className="text-xl font-semibold text-slate-300">{t.outputInitialTitle}</h3>
        <p className="mt-2 text-slate-400">{t.outputInitialDescription}</p>
    </div>
);

export const OutputSection: React.FC<OutputSectionProps> = ({ content, isLoading, error, t }) => {
  const availableTabs = content ? (Object.keys(content) as TabKey[]).filter(key => content[key]) : [];
  const [activeTab, setActiveTab] = useState<TabKey | null>(null);

  useEffect(() => {
    if (availableTabs.length > 0) {
      setActiveTab(availableTabs[0]);
    } else {
      setActiveTab(null);
    }
  }, [content]);

  if (isLoading) return <LoadingIndicator t={t} />;
  if (error) return <ErrorDisplay message={error} t={t} />;
  if (!content || availableTabs.length === 0) return <InitialState t={t} />;

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
      <div className="border-b border-slate-700">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {availableTabs.map((tabKey) => {
             const { color, labelKey } = tabConfig[tabKey];
             const isActive = activeTab === tabKey;
             return (
                <button
                    key={tabKey}
                    onClick={() => setActiveTab(tabKey)}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    isActive
                        ? `border-${color}-500 text-${color}-400`
                        : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-500'
                    }`}
                >
                    {t[labelKey]}
                </button>
             )
          })}
        </nav>
      </div>

      <div className="mt-6">
        {availableTabs.map((tabKey) => (
          activeTab === tabKey && (
            <div key={tabKey} className="space-y-4 relative">
              <CopyButton textToCopy={content[tabKey]!} t={t} />
              <div className="prose prose-sm prose-invert max-w-none p-4 bg-slate-900 rounded-lg h-96 overflow-y-auto whitespace-pre-wrap">
                {content[tabKey]}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};