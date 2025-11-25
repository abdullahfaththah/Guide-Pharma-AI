import { GoogleGenAI, Type } from "@google/genai";
import { Medicine } from "../types";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const checkAndRequestApiKey = async (): Promise<boolean> => {
  if (window.aistudio && window.aistudio.hasSelectedApiKey) {
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      try {
        await window.aistudio.openSelectKey();
        return true;
      } catch (e) {
        console.error("API Key selection failed", e);
        return false;
      }
    }
    return true;
  }
  return !!process.env.API_KEY;
};

export const filterMedicinesByQuery = async (
  query: string,
  medicines: Medicine[]
): Promise<string[]> => {
  try {
    const ai = getAIClient();
    
    // We pass the simplified medicine list to the model
    const inventoryList = medicines.map(m => ({
      id: m.id,
      name: m.name,
      category: m.category
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert pharmacist AI for GUIDE-PHARMA.
      
      User Query: "${query}"
      
      Inventory: ${JSON.stringify(inventoryList)}
      
      Task: Identify which medicines from the Inventory are used to treat the condition or relate to the organ mentioned in the User Query.
      Return ONLY a JSON array containing the 'id' strings of the matching medicines.
      If no medicines match, return an empty array [].
      Do not include any explanation, only the JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING
          }
        }
      }
    });

    const resultText = response.text;
    if (!resultText) return [];
    
    const ids = JSON.parse(resultText) as string[];
    return ids;

  } catch (err) {
    console.error("Gemini Search Error:", err);
    return [];
  }
};

export const generateMarketingImage = async (
  prompt: string,
  size: '1K' | '2K' | '4K'
): Promise<{ imageUrl?: string; error?: string }> => {
  try {
    // Create a new client to ensure the latest API key is used
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: size
        }
      },
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString: string = part.inlineData.data;
          const imageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${base64EncodeString}`;
          return { imageUrl };
        }
      }
    }
    
    return { error: "No image content generated." };
  } catch (err: any) {
    console.error("Gemini Image Generation Error:", err);
    return { error: err.message || "Failed to generate image." };
  }
};