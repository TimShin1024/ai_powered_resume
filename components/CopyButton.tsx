import React, { useState, useCallback } from 'react';

interface CopyButtonProps {
  textToCopy: string;
  t: { [key: string]: string };
}

export const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy, t }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }, [textToCopy]);

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 z-10 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold py-1 px-3 rounded-md text-xs flex items-center transition-colors"
    >
      {copied ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {t.copyButtonCopied}
        </>
      ) : (
        <>
         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
         </svg>
          {t.copyButton}
        </>
      )}
    </button>
  );
};