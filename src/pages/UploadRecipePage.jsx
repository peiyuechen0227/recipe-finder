import { useState } from "react";
import { db, storage, auth } from "../lib/firebase.config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { ToastContainer, toast } from "react-toastify";
import { ChevronsLeft, UploadCloud } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UploadRecipePage = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please log in first.");
      return;
    }
    if (!title || !ingredients || !instructions) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    let imageURL = "";
    if (image) {
      const imageRef = ref(
        storage,
        `recipes/${user.uid}/${Date.now()}_${image.name}`
      );
      const uploadTask = uploadBytesResumable(imageRef, image);
      await new Promise((resolve, reject) => {
        uploadTask.on("state_changed", null, reject, async () => {
          imageURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(imageURL);
        });
      });
    }

    try {
      await addDoc(collection(db, "recipes"), {
        title,
        ingredients,
        instructions,
        imageURL,
        userUID: user.uid,
        createdAt: serverTimestamp(),
      });
      toast.success("Recipe uploaded successfully!");
      setTitle("");
      setIngredients("");
      setInstructions("");
      setImage(null);
      setImagePreview(null);
      navigate("/my-recipes");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#faf9fb] flex flex-col items-center px-8 py-10">
      <ToastContainer />

      {/* Back Button */}
      <div className="w-full max-w-5xl mb-6">
        <button
          className="text-gray-600 hover:text-black text-lg font-medium flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ChevronsLeft size={20} /> Back
        </button>
      </div>

      {/* Upload Container */}
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-10">
        <h1 className="text-4xl font-bold text-gray-900">Upload Your Recipe</h1>

        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Left: Input Fields */}
          <div className="flex-1 space-y-4">
            <input
              type="text"
              placeholder="Recipe Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full h-14 text-lg"
            />

            <textarea
              placeholder="Ingredients (Enter multiple ingredients on new lines)"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="textarea textarea-bordered w-full h-36 text-lg"
            ></textarea>

            <textarea
              placeholder="Instructions (Step-by-step cooking process)"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="textarea textarea-bordered w-full h-48 text-lg"
            ></textarea>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full text-lg"
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn w-full flex items-center justify-center gap-2 text-white bg-[#fa98a0] hover:bg-[#ef6a75] text-lg py-3"
            >
              <UploadCloud size={20} />
              {loading ? "Uploading..." : "Submit Recipe"}
            </button>
          </div>

          {/* Right: Recipe Preview */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full md:w-1/3">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="rounded-lg w-full h-auto md:h-72 object-cover shadow-md"
              />
            ) : (
              <div className="w-full h-40 flex items-center justify-center text-gray-400 bg-gray-200 rounded-lg">
                No Image Selected
              </div>
            )}

            <h3 className="text-xl font-bold mt-4">
              {title || "Recipe Title"}
            </h3>
            <p className="text-gray-600 mt-2">
              {ingredients || "Ingredients will appear here."}
            </p>
            <p className="text-gray-600 mt-2">
              {instructions || "Instructions will appear here."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadRecipePage;
