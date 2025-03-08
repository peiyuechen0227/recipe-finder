import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import RecipeCard from "../components/RecipeCard";
import { getRandomColor } from "../lib/utils";

const APP_ID = import.meta.env.VITE_APP_ID;
const APP_KEY = import.meta.env.VITE_APP_KEY;

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchRef = useRef(null);

  const fetchRecipes = async (searchQuery) => {
    setLoading(true);
    setError(null);

    const cachedData = localStorage.getItem(`recipes-${searchQuery}`);
    if (cachedData) {
      setRecipes(JSON.parse(cachedData));
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `https://api.edamam.com/api/recipes/v2/?app_id=${APP_ID}&app_key=${APP_KEY}&q=${searchQuery}&type=public`
      );

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();

      if (!data.hits || data.hits.length === 0) {
        setError("No recipes found. Try another search.");
      }

      setRecipes(data.hits);
      localStorage.setItem(`recipes-${searchQuery}`, JSON.stringify(data.hits));
    } catch (error) {
      setError(error.message);
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes("chicken");
  }, []);

  const handleSearchRecipe = (e) => {
    e.preventDefault();
    const searchQuery = searchRef.current.value.trim();
    if (searchQuery) {
      fetchRecipes(searchQuery);
    }
  };

  return (
    <div className="bg-[#faf9fb] p-10 flex-1">
      <div className="max-w-screen-lg mx-auto">
        <form
          onSubmit={handleSearchRecipe}
          className="sticky top-4 bg-white z-50 rounded-md"
        >
          <label
            className="input shadow-md flex items-center gap-2 w-full max-w-7xl mx-auto px-4 py-7 rounded-lg transition-all duration-300 
               hover:shadow-lg hover:bg-gray-100/50"
          >
            <Search size={"24"} />
            <input
              ref={searchRef}
              type="text"
              className="text-lg md:text-md grow py-4 p-1"
              placeholder="What do you want to cook today?"
            />
          </label>
        </form>

        <h1 className="font-bold text-3xl md:text-4xl mt-4">
          Recommended Recipes
        </h1>
        <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">
          Popular choices
        </p>

        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {!loading &&
            recipes.map(({ recipe }, index) => (
              <RecipeCard key={index} recipe={recipe} {...getRandomColor()} />
            ))}

          {loading &&
            [...Array(9)].map((_, index) => (
              <div key={index} className="flex flex-col gap-4 w-full">
                <div className="skeleton h-32 w-full"></div>
                <div className="flex justify-between">
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-24"></div>
                </div>
                <div className="skeleton h-4 w-1/2"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
