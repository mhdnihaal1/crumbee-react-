import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
const navigate = useNavigate();

  const handleLogin = async() => {
if (!name.trim()) {
    alert("Please enter your name");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:3000/createUserORlogin",
      { name }
    );
     if(response){
      navigate("/home"); 
    }
     console.log("User logged in:", response.data);

     localStorage.setItem("user", JSON.stringify(response.data.user));

  } catch (error: any) {
    console.error(error);
    alert(error.response?.data?.message || "Something went wrong");
  }

  };

  return (
    <div className="min-h-screen bg-[#FFF4E8] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <svg
            width="200"
            height="60"
            viewBox="0 0 220 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="10" y="28" width="36" height="22" rx="4" fill="#F4C16D" />
            <path d="M10 28 C14 10, 42 10, 46 28 Z" fill="#F7A7C1" />
            <circle cx="28" cy="14" r="4" fill="#E94E77" />
            <text
              x="60"
              y="45"
              fontSize="36"
              fontFamily="cursive"
              fill="#6B2E1A"
              fontWeight="bold"
            >
              Crumbee
            </text>
          </svg>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
          Welcome Back 🍰
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your name for simple registration
        </p>

        {/* Input */}
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 mb-4"
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Login;
