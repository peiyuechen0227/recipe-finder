import { useState } from "react";
import { auth } from "../lib/firebase.config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate("/"); // Go to home page if login successfully
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="bg-[#faf9fb] flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-100">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isLogin ? "Welcome to Login" : "Welcome to Register"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#ee8a93]"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#ee8a93]"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-[#fa98a0] hover:bg-[#ea7780] text-white font-semibold py-2 rounded-lg transition duration-300"
          onClick={handleAuth}
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p className="text-center text-gray-600 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="text-pink-400 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Create an account" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
