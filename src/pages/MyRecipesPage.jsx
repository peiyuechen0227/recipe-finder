import React, { useState, useEffect } from "react";
import MyRecipeCard from "../components/MyRecipeCard";
import { Search, ChartNoAxesGantt, Plus } from "lucide-react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getRandomColor } from "../lib/utils";

const db = getFirestore();

const MyRecipesPage = () => {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("User login detected:", currentUser);
        setUser(currentUser);
      } else {
        console.warn("No user logged in.");
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user || !user.uid) {
      console.warn("User UID is not ready yet.");
      return;
    }

    console.log("Current user UID:", user.uid);

    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "My_Recipes"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const userRecipes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched recipes from Firestore:", userRecipes);
        setRecipes(userRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
      setLoading(false);
    };

    fetchRecipes();
  }, [user]);

  return (
    <div className="bg-[#faf9fb] p-10 flex-1">
      <div className="max-w-screen-lg mx-auto">
        {/* 搜索栏 */}
        <form className="sticky top-4 bg-white z-50 rounded-md">
          <label className="input shadow-md flex items-center gap-2 w-full max-w-7xl mx-auto px-4 py-7 rounded-lg transition-all duration-300 hover:shadow-lg hover:bg-gray-100/50">
            <Search size={"24"} />
            <input
              type="text"
              className="text-lg md:text-md grow py-4 p-1"
              placeholder="Search your recipes..."
            />
          </label>
        </form>

        <div className="flex justify-between items-center mt-4">
          <h1 className="font-bold text-3xl md:text-4xl">My Recipes</h1>

          {/* 按钮组 */}
          <div className="flex gap-3">
            <button className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-black font-semibold py-2 px-4 rounded-lg ">
              <ChartNoAxesGantt />
              Manage
            </button>

            <button
              onClick={() => navigate("/upload-recipe")}
              className="flex items-center gap-1 bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-lg"
            >
              <Plus />
              Upload
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-lg mt-5 text-zinc-600">Loading...</p>
        ) : !user ? (
          <p className="text-center text-lg mt-5 text-zinc-600">
            You are not logged in.{" "}
            <a
              href="/login"
              className="text-pink-500 underline hover:text-pink-600"
            >
              Log in
            </a>{" "}
            to start your culinary journey!
          </p>
        ) : recipes.length === 0 ? (
          <p className="text-center text-lg mt-5 text-zinc-600">
            You haven't uploaded any recipes yet. Start uploading now!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
            {recipes.map((recipe, index) => (
              <MyRecipeCard key={index} recipe={recipe} {...getRandomColor()} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRecipesPage;
