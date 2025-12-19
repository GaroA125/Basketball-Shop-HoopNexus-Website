
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../types';

export const getAIRecommendation = async (userPrompt: string, history: ChatMessage[]): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { role: 'user', parts: [{ text: "You are 'The Bench Coach', a basketball equipment expert at HoopNexus. You provide expert advice on shoes, balls, and gear based on playing styles. Keep responses concise, energetic, and helpful." }] },
        ...history.map(msg => ({
          role: msg.role,
          parts: [{ text: msg.text }]
        })),
        { role: 'user', parts: [{ text: userPrompt }] }
      ],
      config: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });

    return response.text || "I'm having a timeout right now. Try again in a minute!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The defensive pressure is high! I couldn't process that. Check back soon.";
  }
};
