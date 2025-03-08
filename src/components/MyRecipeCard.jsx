import React from "react";
import { Heart, HeartPulse } from "lucide-react";
import { useState } from "react";

const getTwoValuesFromArray = (arr) => {
  return arr && arr.length >= 2 ? [arr[0], arr[1]] : arr || [];
};

const MyRecipeCard = ({ recipe, bg, badge }) => {
  const healthLabels = getTwoValuesFromArray(recipe.labels || []);
  const [isFavorite, setIsFavorite] = useState(
    localStorage.getItem("favorites")?.includes(recipe.recipeTitle)
  );

  const addRecipeToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isRecipeAlreadyInFavorites = favorites.some(
      (fav) => fav.recipeTitle === recipe.recipeTitle
    );

    if (isRecipeAlreadyInFavorites) {
      favorites = favorites.filter(
        (fav) => fav.recipeTitle !== recipe.recipeTitle
      );
      setIsFavorite(false);
    } else {
      favorites.push(recipe);
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <div
      className={`flex flex-col rounded-md ${bg} overflow-hidden p-3 relative transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 shadow-md hover:shadow-xl`}
    >
      <div className="relative block h-32">
        <div className="skeleton absolute inset-0 rounded-md" />
        <img
          src={recipe.imageUrl || "https://via.placeholder.com/150"}
          alt="recipe img"
          className="rounded-md w-full h-full object-cover cursor-pointer opacity-0 transition-opacity duration-500"
          onLoad={(e) => {
            e.currentTarget.style.opacity = 1;
            e.currentTarget.previousElementSibling.style.display = "none";
          }}
        />

        {/* Heart */}
        <div
          className="absolute top-3 right-3 bg-white rounded-full p-1 cursor-pointer shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
          onClick={(e) => {
            e.preventDefault();
            addRecipeToFavorites();
          }}
        >
          {!isFavorite && (
            <Heart
              size={20}
              className="hover:fill-red-500 hover:text-red-500"
            />
          )}
          {isFavorite && (
            <Heart size={20} className="fill-red-500 text-red-500" />
          )}
        </div>
      </div>

      {/* Title */}
      <div className="mt-3">
        <p className="font-bold tracking-wide">{recipe.recipeTitle}</p>
      </div>

      {/* Labels */}
      <div className="flex flex-wrap gap-2 mt-2">
        {healthLabels.map((label, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-1 ${badge} px-2 py-1 rounded-md`}
          >
            <HeartPulse size={16} />
            <span className="text-sm tracking-tighter font-semibold">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRecipeCard;
