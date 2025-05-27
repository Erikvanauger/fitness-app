"use client";
import { useState } from "react";
import Dashboard from "./dashboard/Dashboard";
import Image from "next/image";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setShowError(false);
    
    // Simulate loading time for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (password === "1234") {
      setIsLoggedIn(true);
    } else {
      setShowError(true);
    }
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen w-full">
      {!isLoggedIn ? (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900  to-themegreen flex items-center justify-center p-4">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500"></div>
          </div>

          {/* Login card */}
          <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md shadow-2xl border border-white/20">
            {/* Glassmorphism effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl"></div>

            <div className="relative z-10">
              {/* Logo/Title section */}
              <div className="text-center mb-8">
                <div className="  mb-4 flex items-center justify-center">
                  <Image
                    src="/FBicon.png"
                    alt="Logotyp"
                    className=" object-contain"
                    width={100}
                    height={100}
                  />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome Back
                </h1>
                <p className="text-white/70">Enter your password to continue</p>
              </div>

              {/* Form */}
              <div className="space-y-6">
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter password"
                    className={`w-full bg-white/10 border ${
                      showError ? "border-red-400" : "border-white/30"
                    } rounded-xl px-4 py-4 text-white placeholder-white/60 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all duration-300 backdrop-blur-sm`}
                  />
                  {showError && (
                    <div className="absolute -bottom-6 left-0 text-red-300 text-sm animate-pulse">
                      Incorrect password. Try again.
                    </div>
                  )}
                </div>

                <button
                  onClick={handleLogin}
                  disabled={isLoading || !password}
                  className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${
                    isLoading ? "animate-pulse" : ""
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Logging in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Background particles */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute w-2 h-2 bg-white/30 rounded-full top-10 left-10"></div>
            <div className="absolute w-2 h-2 bg-white/30 rounded-full top-20 left-1/2"></div>
            <div className="absolute w-2 h-2 bg-white/30 rounded-full top-1/3 right-10"></div>
            <div className="absolute w-2 h-2 bg-white/30 rounded-full bottom-20 left-1/4"></div>
            <div className="absolute w-2 h-2 bg-white/30 rounded-full bottom-10 right-1/3"></div>
            <div className="absolute w-2 h-2 bg-white/30 rounded-full top-1/4 right-1/4"></div>
          </div>
        </div>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}