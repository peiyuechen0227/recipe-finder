import React from "react";
import { Heart, HeartPulse, Soup } from "lucide-react";
import { useState } from "react";

const getTwoValuesFromArray = (arr) => {
  return [arr[0], arr[1]];
};

const RecipeCard = ({ recipe, bg, badge }) => {
  const healthLables = getTwoValuesFromArray(recipe.healthLabels);
  const [isFavorite, setIsFavorite] = useState(
    localStorage.getItem("favorites")?.includes(recipe.label)
  );

  const addRecipeToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isRecipeAlreadyInFavorites = favorites.some(
      (fav) => fav.label === recipe.label
    );

    if (isRecipeAlreadyInFavorites) {
      favorites = favorites.filter((fav) => fav.label !== recipe.label);
      setIsFavorite(false);
    } else {
      favorites.push(recipe);
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <div
      className={`flex flex-col rounded-md ${bg} overflow-hidden p-3 relative`}
    >
      <a
        href={`http://www.youtube.com/results?search_query=${recipe.label} recipe`}
        target="_blank"
        className="relative block h-32"
      >
        <div className="skeleton absolute inset-0 rounded-md" />
        <img
          src={recipe.image}
          alt="recipe img"
          className="rounded-md w-full h-full object-cover cursor-pointer opacity-0 transition-opacity duration-500"
          onLoad={(e) => {
            e.currentTarget.style.opacity = 1;
            e.currentTarget.previousElementSibling.style.display = "none";
          }}
        />

        <div
          className="absolute bottom-2 left-2 bg-white rounded-full p-1 shadow-md 
        cursor-pointer flex items-center gap-1 text-sm"
        >
          <Soup size={16} /> {recipe.yield} Servings
        </div>

        {/* Heart */}
        <div
          className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md cursor-pointer"
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
      </a>

      {/* Title */}
      <div className="mt-3">
        <p className="font-bold tracking-wide">{recipe.label}</p>
        <p className="text-gray-600 text-sm">
          {recipe.cuisineType[0].charAt(0).toUpperCase() +
            recipe.cuisineType[0].slice(1)}{" "}
          Kitchen
        </p>
      </div>

      {/* Label */}
      <div className="flex flex-wrap gap-2 mt-2">
        {healthLables.map((label, idx) => (
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

export default RecipeCard;
