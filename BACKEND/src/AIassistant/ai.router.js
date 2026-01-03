import express from "express";
import fetch from "node-fetch";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();


router.post("/gemini",authMiddleware, async (req, res) => {
  try {
    const { prompt } = req.body;
     const API_KEY = process.env.GEMINI_API_KEY;
    const response=await fetchWithFallback(prompt, API_KEY);
    res.json(response);

   } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({
      output:
        " AI service is currently busy...",
    });
  }
});


async function fetchWithFallback(prompt, API_KEY) {
 const models = [
  "gemini-2.5-flash"
];
  // fallback listtt
  const BASE_URL=process.env.GEMINI_BASE_URL;
  for (const model of models) {
    try {

      const res = await fetch(
        `${BASE_URL}/models/${model}:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user"
              , parts: [{ text: prompt }] }
            ],
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        const output =
          data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No response from Gemini.";
        return { output };
      }
      if ([503, 429].includes(data?.error?.code)) {
        console.warn(`Model ${model} overloaded. Trying next...`);
        continue;
      }

      throw new Error(data?.error?.message || "Unknown API error");
    } catch (err) {
      console.error(`Error with ${model}:`, err.message);
    }
  }

  throw new Error("All models failed.");
}



export default router;
