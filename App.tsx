import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { OutputSection } from './components/OutputSection';
import { generateContent } from './services/geminiService';
import type { AIGeneratedContent, GenerationOptions, Language, Tone } from './types';
import { translations } from './locales';

const App: React.FC = () => {
  const [resumeInput, setResumeInput] = useState<string>('');
  const [jobDescriptionInput, setJobDescriptionInput] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<AIGeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [language, setLanguage] = useState<Language>('en');
  const [tone, setTone] = useState<Tone>('Professional');
  const [generationOptions, setGenerationOptions] = useState<GenerationOptions>({
    resume: true,
    coverLetter: true,
    script: true,
  });
  
  const t = translations[language];

  const handleSubmit = useCallback(async () => {
    if (!apiKey) {
      setError(t.errorApiKey);
      return;
    }
    if (!resumeInput || !jobDescriptionInput) {
      setError(t.errorBothFields);
      return;
    }
    if (!generationOptions.resume && !generationOptions.coverLetter && !generationOptions.script) {
      setError(t.errorSelectOption);
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);

    try {
      const result = await generateContent(resumeInput, jobDescriptionInput, tone, generationOptions, language, apiKey);
      setGeneratedContent(result);
    } catch (err) {
      console.error(err);
      setError(t.errorGeneration);
    } finally {
      setIsLoading(false);
    }
  }, [resumeInput, jobDescriptionInput, tone, generationOptions, language, apiKey, t]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        <Header 
          t={t} 
          currentLanguage={language}
          setLanguage={setLanguage} 
        />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
          <InputSection
            resume={resumeInput}
            setResume={setResumeInput}
            jobDescription={jobDescriptionInput}
            setJobDescription={setJobDescriptionInput}
            apiKey={apiKey}
            setApiKey={setApiKey}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            t={t}
            tone={tone}
            setTone={setTone}
            generationOptions={generationOptions}
            setGenerationOptions={setGenerationOptions}
          />
          <OutputSection
            content={generatedContent}
            isLoading={isLoading}
            error={error}
            t={t}
          />
        </main>
      </div>
    </div>
  );
};

export default App;