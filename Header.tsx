import React from 'react';
import type { Language } from '../types';

const BoltIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
  </svg>
);

interface HeaderProps {
  t: { [key: string]: string };
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ t, currentLanguage, setLanguage }) => {
  return (
    <header className="text-center relative">
      <div className="flex items-center justify-center gap-3">
        <BoltIcon className="w-8 h-8 text-indigo-400" />
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
          {t.title}
        </h1>
      </div>
      <p className="mt-3 text-lg text-slate-400 max-w-2xl mx-auto">
        {t.description}
      </p>
      <div className="absolute top-0 right-0 flex space-x-2">
        <button 
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${currentLanguage === 'en' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
        >
          EN
        </button>
        <button 
          onClick={() => setLanguage('ko')}
          className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${currentLanguage === 'ko' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
        >
          KO
        </button>
      </div>
    </header>
  );
};