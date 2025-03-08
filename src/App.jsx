import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { auth, db } from "./lib/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import LoginPage from "./pages/LoginPage";
import MyRecipesPage from "./pages/MyRecipesPage";
import UploadRecipePage from "./pages/UploadRecipePage";
import RecipeGenPage from "./pages/RecipeGenPage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log("User login:", currentUser);
      } else {
        setUser(null);
        console.log("User logout");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const testFirebaseConnection = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "recipes"));
        const recipeList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Connected to Firestore：", recipeList);
      } catch (error) {
        console.error("Failed to connect Firestore：", error);
      }
    };

    testFirebaseConnection();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar user={user} />

      <div className="flex-1 ml-0 sm:ml-24 md:ml-64">
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route
            path="/favorites"
            element={user ? <FavoritesPage /> : <LoginPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/myrecipes" element={<MyRecipesPage user={user} />} />
          <Route
            path="/upload-recipe"
            element={<UploadRecipePage user={user} />}
          />
          <Route path="/recipe/:recipeLabel" element={<RecipeGenPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
