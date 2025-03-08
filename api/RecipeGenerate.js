import React, { useState } from "react";

const RecipeGenerate = ({ recipe }) => {
  const [aiRecipe, setAiRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateRecipeSteps = async () => {
    if (!recipe || !recipe.ingredients) {
      console.error("Recipe data is missing!");
      return;
    }

    setLoading(true);
    try {
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
            messages: [
              {
                role: "user",
                content: `Generate step-by-step cooking instructions for: ${
                  recipe.label
                }\nIngredients: ${recipe.ingredients
                  .map((i) => i.text)
                  .join(", ")}`,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      setAiRecipe(
        data.choices?.[0]?.message?.content || "AI generation failed."
      );
    } catch (error) {
      console.error("Error generating recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recipe-generate">
      <h2>AI-Generated Recipe</h2>
      <button
        onClick={generateRecipeSteps}
        disabled={loading}
        className="mt-4 w-full bg-[#fa98a0] text-white px-6 py-2 rounded-md text-lg font-semibold shadow-md hover:bg-[#ef6a75] transition"
      >
        {loading ? "Generating..." : "Generate Recipe"}
      </button>
      {aiRecipe && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold">Generated Cooking Steps</h3>
          <p>{aiRecipe}</p>
        </div>
      )}
    </div>
  );
};

export default RecipeGenerate;
