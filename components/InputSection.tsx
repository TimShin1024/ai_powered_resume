import React from 'react';
import type { Tone, GenerationOptions } from '../types';

interface InputSectionProps {
  resume: string;
  setResume: (value: string) => void;
  jobDescription: string;
  setJobDescription: (value: string) => void;
  apiKey: string;
  setApiKey: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  t: { [key: string]: string };
  tone: Tone;
  setTone: (tone: Tone) => void;
  generationOptions: GenerationOptions;
  setGenerationOptions: (options: GenerationOptions) => void;
}

const LoadingSpinner: React.FC = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const tones: Tone[] = ['Professional', 'Enthusiastic', 'Creative'];

export const InputSection: React.FC<InputSectionProps> = ({
  resume, setResume, jobDescription, setJobDescription, apiKey, setApiKey, 
  onSubmit, isLoading, t, tone, setTone, generationOptions, setGenerationOptions
}) => {
  
  const handleOptionChange = (option: keyof GenerationOptions) => {
    setGenerationOptions({ ...generationOptions, [option]: !generationOptions[option] });
  };

  return (
    <section className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 space-y-6">
       {/* API Key */}
       <div>
        <label htmlFor="api-key" className="block text-lg font-semibold text-slate-300 mb-2">{t.apiKeyTitle}</label>
        <input
            id="api-key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder={t.apiKeyPlaceholder}
            className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out text-slate-300 placeholder-slate-500"
            disabled={isLoading}
          />
        <p className="mt-2 text-sm text-slate-400">{t.apiKeyDescription}</p>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="resume" className="block text-lg font-semibold text-slate-300 mb-2">{t.inputResumeTitle}</label>
          <textarea
            id="resume"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder={t.inputResumePlaceholder}
            className="w-full h-48 p-4 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out resize-y text-slate-300 placeholder-slate-500"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="job-description" className="block text-lg font-semibold text-slate-300 mb-2">{t.inputJobTitle}</label>
          <textarea
            id="job-description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder={t.inputJobPlaceholder}
            className="w-full h-48 p-4 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out resize-y text-slate-300 placeholder-slate-500"
            disabled={isLoading}
          />
        </div>
      </div>
      
      {/* Generation Options */}
      <div>
        <h3 className="text-lg font-semibold text-slate-300 mb-3">{t.optionsTitle}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(Object.keys(generationOptions) as Array<keyof GenerationOptions>).map((opt) => (
            <label key={opt} className="flex items-center p-3 bg-slate-700 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors">
              <input
                type="checkbox"
                checked={generationOptions[opt]}
                onChange={() => handleOptionChange(opt)}
                className="h-5 w-5 rounded text-indigo-500 bg-slate-800 border-slate-500 focus:ring-indigo-500"
                disabled={isLoading}
              />
              <span className="ml-3 text-slate-200 font-medium">{t[opt]}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tone & Manner */}
      <div>
        <h3 className="text-lg font-semibold text-slate-300 mb-3">{t.toneTitle}</h3>
        <div className="flex flex-wrap gap-3">
          {tones.map((t_option) => (
            <button
              key={t_option}
              onClick={() => setTone(t_option)}
              disabled={isLoading}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                tone === t_option 
                  ? 'bg-indigo-600 text-white ring-2 ring-offset-2 ring-offset-slate-800 ring-indigo-500' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {t[t_option.toLowerCase()]}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="w-full flex justify-center items-center py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 disabled:bg-indigo-500/50 disabled:cursor-not-allowed transition-colors duration-200 text-lg"
      >
        {isLoading ? (
          <>
            <LoadingSpinner />
            {t.buttonLoading}
          </>
        ) : (
          t.buttonSubmit
        )}
      </button>
    </section>
  );
};