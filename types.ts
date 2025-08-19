export interface AIGeneratedContent {
  optimizedResume?: string;
  coverLetter?: string;
  interviewScript?: string;
}

export type Tone = 'Professional' | 'Enthusiastic' | 'Creative';

export interface GenerationOptions {
  resume: boolean;
  coverLetter: boolean;
  script: boolean;
}

export type Language = 'en' | 'ko';
