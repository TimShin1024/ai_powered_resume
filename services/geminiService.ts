import { GoogleGenAI, Type } from "@google/genai";
import type { AIGeneratedContent, GenerationOptions, Language, Tone } from '../types';

const buildSchemaAndPrompt = (options: GenerationOptions, tone: Tone, language: Language) => {
  const properties: { [key: string]: any } = {};
  const required: string[] = [];
  const instructions: string[] = [];
  
  const languageInstruction = language === 'ko' ? "in Korean" : "in English";

  if (options.resume) {
    properties.optimizedResume = {
      type: Type.STRING,
      description: `The optimized resume text, tailored to the job description ${languageInstruction}.`,
    };
    required.push("optimizedResume");
    instructions.push(`1.  **Optimize Resume**: Rewrite the user's resume ${languageInstruction}. Focus on highlighting aspects that match the job description. Use strong action verbs and quantify achievements. The tone should be ${tone}.`);
  }

  if (options.coverLetter) {
    properties.coverLetter = {
      type: Type.STRING,
      description: `The generated cover letter, tailored to the job description and resume ${languageInstruction}.`,
    };
    required.push("coverLetter");
    instructions.push(`2.  **Write Cover Letter**: Draft a compelling cover letter ${languageInstruction}. Connect the candidate's experience to job requirements and end with a call to action. The tone should be ${tone}.`);
  }

  if (options.script) {
    properties.interviewScript = {
      type: Type.STRING,
      description: `A 1-minute self-introduction script for an interview, ${languageInstruction}.`,
    };
    required.push("interviewScript");
    instructions.push(`3.  **Create Interview Script**: Write a concise and impactful 1-minute self-introduction script for a phone or initial interview ${languageInstruction}. It should summarize key strengths and express strong interest in the role. The tone should be ${tone}.`);
  }

  const responseSchema = {
    type: Type.OBJECT,
    properties,
    required,
  };

  const prompt = `
    You are an expert career coach and professional resume writer.
    Your task is to generate career application materials based on a user's resume and a specific job description.

    The user's resume is under "[RESUME]" and the job description under "[JOB_DESCRIPTION]".
    The user has requested the output to be ${languageInstruction} with a ${tone} tone.

    Follow these instructions:
    ${instructions.join('\n    ')}

    The final output MUST be a JSON object that adheres to the provided schema.

    [RESUME]
    ${"```"}
    {{resume}}
    ${"```"}

    [JOB_DESCRIPTION]
    ${"```"}
    {{jobDescription}}
    ${"```"}
  `;
  
  return { responseSchema, prompt };
};

export const generateContent = async (
  resume: string, 
  jobDescription: string, 
  tone: Tone, 
  options: GenerationOptions,
  language: Language,
  apiKey: string
): Promise<AIGeneratedContent> => {

  if (!apiKey) {
    throw new Error("API Key is missing.");
  }
  const ai = new GoogleGenAI({ apiKey });

  const { responseSchema, prompt } = buildSchemaAndPrompt(options, tone, language);
  const finalPrompt = prompt.replace('{{resume}}', resume).replace('{{jobDescription}}', jobDescription);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: finalPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const parsedJson: AIGeneratedContent = JSON.parse(jsonText);
    return parsedJson;

  } catch (error) {
    console.error("Error generating content from Gemini API:", error);
    throw new Error("Failed to generate content from AI. Please check the console for more details.");
  }
};
