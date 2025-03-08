import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const RecipeGenerator = ({ ingredients, label }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userPrompt, setUserPrompt] = useState("");

  const handleGenerateAI = async (customPrompt) => {
    if (!ingredients || ingredients.length === 0) {
      setMessages([
        { role: "system", content: "Error: No ingredients provided." },
      ]);
      return;
    }

    setLoading(true);

    try {
      const formattedIngredients = ingredients
        .map((i) => i.text || i)
        .join(", ");

      const defaultPrompt = `Generate a quick 5-step cooking guide for "${label}" using: ${formattedIngredients}. Keep it concise (max 200 words).`;

      const chatMessages = [
        {
          role: "system",
          content:
            "You are an expert chef AI. Generate short and efficient cooking instructions.",
        },
        ...messages,
        { role: "user", content: customPrompt || defaultPrompt },
      ];

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o",
            max_tokens: 200,
            messages: chatMessages,
          }),
        }
      );

      if (!response.ok) {
        console.error("API Error:", response.status, response.statusText);
        setMessages([
          ...messages,
          { role: "system", content: `Error: ${response.statusText}` },
        ]);
        return;
      }

      const data = await response.json();
      const aiResponse =
        data.choices?.[0]?.message?.content || "AI generation failed.";

      setMessages([
        ...chatMessages,
        { role: "assistant", content: aiResponse },
      ]);
    } catch (error) {
      console.error("AI Generation Error:", error);
      setMessages([
        ...messages,
        { role: "system", content: "Error generating content." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGenerateAI();
  }, []);

  return (
    <div className="w-full max-w-5xl flex flex-col md:flex-row gap-2">
      {/* AI recipe */}
      <div className="flex-1 bg-white shadow-sm rounded-lg px-4 py-0">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          ✨ Cook with AI
        </h2>
        <div className="text-gray-700 text-lg">
          {loading ? (
            "Generating..."
          ) : (
            <ReactMarkdown>
              {messages
                .filter((msg) => msg.role === "assistant")
                .map((m) => m.content)
                .join("\n\n")}
            </ReactMarkdown>
          )}
        </div>
      </div>

      {/* User Prompt */}
      <div className="w-full h-full md:w-1/3 bg-gray-100 shadow-sm rounded-lg px-4 py-3">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Customize Your Recipe
        </h2>
        <textarea
          className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="Enter instructions for AI, e.g., 'Make it spicy'..."
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
        />
        <button
          className="mt-3 w-full bg-[#fa98a0] text-white px-6 py-2 rounded-md text-lg font-semibold shadow-md hover:bg-[#ef6a75] transition"
          onClick={() => handleGenerateAI(userPrompt)}
          disabled={loading || !userPrompt}
        >
          {loading ? "Generating..." : "Generate with AI"}
        </button>
      </div>
    </div>
  );
};

export default RecipeGenerator;
