import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HeartPulse, ChevronsLeft } from "lucide-react";
import { getRandomColor } from "../lib/utils";
import RecipeGenerator from "../components/RecipeGenerator";
const RecipeGenPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.recipe) {
    return <p className="text-center text-red-500">Recipe not found.</p>;
  }

  const { label, ingredients, cuisineType, image, healthLabels } = state.recipe;
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${label} recipe`;

  return (
    <div className="w-full min-h-screen bg-[#faf9fb] flex flex-col items-center px-8 py-10">
      {/* Back */}
      <div className="w-full max-w-5xl mb-6">
        <button
          className="text-gray-600 hover:text-black text-lg font-medium flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ChevronsLeft size={20} /> Back
        </button>
      </div>

      {/* Content */}
      <div className="w-full max-w-5xl bg-white shadow-sm rounded-lg p-10">
        {/* Label + Image */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Title */}
          <div className="flex-1">
            <h1 className="text-5xl font-bold text-gray-900">{label}</h1>

            {/* Cuisine Type */}
            <p className="text-gray-600 text-lg mt-4">
              <strong className="text-gray-700">Cuisine Type:</strong>{" "}
              {cuisineType[0].charAt(0).toUpperCase() + cuisineType[0].slice(1)}{" "}
              Kitchen
            </p>

            {/* Ingredients */}
            <h3 className="text-xl font-semibold text-gray-700 mt-4">
              Ingredients
            </h3>
            <ul className="list-disc ml-6 mt-2 text-gray-700 text-lg">
              {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.text}</li>
              ))}
            </ul>

            {/* YouTube */}
            <p className="mt-4 text-md text-[#fa98a0] underline hover:text-[#ef6a75]">
              <a
                href={youtubeSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                🎥 Watch on YouTube
              </a>
            </p>

            {/* Health Labels */}
            <div className="flex flex-wrap gap-2 mt-4">
              {healthLabels.slice(0, 3).map((label, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1 bg-[#F7E0B8] px-3 py-1 rounded-md"
                >
                  <HeartPulse size={16} />
                  <span
                    className="text-sm tracking-tighter font-semibold"
                    {...getRandomColor()}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="w-full md:w-1/3">
            <img
              src={image}
              alt={label}
              className="rounded-lg w-full h-auto md:h-72 aspect-[21/9] object-cover shadow-md"
            />
          </div>
        </div>
        <hr className="w-full max-w-5xl border-gray-300 my-10" />

        {/* AI 生成部分 */}
        <RecipeGenerator ingredients={ingredients} />
      </div>
    </div>
  );
};

export default RecipeGenPage;
