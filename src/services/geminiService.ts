import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function generateArticleSummary(title: string, excerpt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Summarize this news article for a busy professional. 
      Title: ${title}
      Excerpt: ${excerpt}
      
      Format with bullet points.`,
      config: {
        temperature: 0.7,
      }
    });

    return response.text;
  } catch (error) {
    console.error("AI Summary Error:", error);
    return "Failed to generate summary. Please try again later.";
  }
}

export async function askAiAboutArticle(title: string, context: string, question: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an AI news assistant for MihirSync. 
      Context Article: "${title}"
      Full Context: ${context}
      
      User Question: ${question}
      
      Provide a concise, accurate answer based ONLY on the context. If the information isn't there, say you don't know but offer to search more general news.`,
      config: {
        temperature: 0.2,
      }
    });

    return response.text;
  } catch (error) {
    console.error("AI Chat Error:", error);
    return "I'm having trouble processing that right now. Please try another question.";
  }
}

export async function generateHeadline(topic: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 5 viral, premium, and attention-grabbing headlines for a news platform about: ${topic}. 
      Make them feel authoritative yet exciting.`,
    });

    return response.text;
  } catch (error) {
    console.error("Headline Gen Error:", error);
    return null;
  }
}
