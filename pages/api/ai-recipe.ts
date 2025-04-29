import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { preferences } = req.body;

    const prompt = `
    You are a professional chef. Based on the user's preferences: "${preferences}", generate a new recipe.
    Return ONLY valid JSON with this structure, without any markdown formatting or code blocks:
    
    {
      "title": "Recipe Title",
      "description": "Short description",
      "ingredients": [{name: "Flour", quantity: "300g"}, {name: "Strawberry", quantity: "50g"}],
      "steps": ["Step 1", "Step 2"],
    }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
      temperature: 0.7,
    });

    const aiMessage = response.choices[0]?.message?.content;
    console.log("AI response:", aiMessage);

    if (!aiMessage) {
      return res.status(500).json({ message: "No response from AI" });
    }

    // Clean the response by removing markdown code blocks if they exist
    const cleanedMessage = aiMessage
      .replace(/```json\s*/g, "") // Remove opening ```json
      .replace(/```\s*$/g, "") // Remove closing ```
      .trim();

    try {
      const recipe = JSON.parse(cleanedMessage);
      return res.status(200).json({ recipe });
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      console.log("Raw AI response:", aiMessage);
      return res.status(500).json({
        message: "Failed to parse AI response",
        rawResponse: aiMessage,
      });
    }
  } catch (error) {
    console.error("Error generating recipe:", error);
    return res.status(500).json({ message: "Failed to generate recipe" });
  }
}
