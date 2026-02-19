
import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const getHealthInsight = async (totalToday: number, totalMonth: number): Promise<string> => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User has smoked ${totalToday} cigarettes today and ${totalMonth} this month. 
      Provide a very brief (max 20 words), supportive, and non-judgmental motivational health insight or tip to help them reduce their consumption. 
      Focus on positive reinforcement.`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text || "Every small step counts. Keep tracking and stay mindful of your goals.";
  } catch (error) {
    console.error("Error fetching AI insight:", error);
    return "Stay strong. Each cigarette not smoked is a victory for your health.";
  }
};
