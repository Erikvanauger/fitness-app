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
    
    // Simulate loading time
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
        <div className="min-h-screen bg-gradient-to-br from-emerald-800 via-teal-900 to-green-900 flex items-center justify-center p-4">
          {/* Extra background color fill */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-themegreen/40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500"></div>
            <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-1000"></div>
            <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 w-72 h-72 bg-emerald-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse delay-300"></div>
          </div>

          {/* Login card */}
          <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md shadow-2xl border border-black/40">
            {/* Glassmorphism effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-themegreen/20 to-teal-400/5 rounded-3xl"></div>

            <div className="relative z-10">
              {/* Logo*/}
              <div className="text-center mb-8">
                <div className="mb-4 flex items-center justify-center">
                  <Image
                    src="/FBicon.png"
                    alt="Logotyp"
                    className="object-contain"
                    width={100}
                    height={100}
                  />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome Back
                </h1>
                <p className="text-themegreen/80">Enter your password to continue</p>
              </div>

              {/* Form */}
              <div className="space-y-10">
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter password"
                    className={`w-full bg-white/10 border ${
                      showError ? "border-red-400" : "border-themegreen/40"
                    } rounded-xl px-4 py-4 text-white placeholder-themegreen/60 focus:outline-none focus:border-themegreen focus:ring-2 focus:ring-themegreen/50 transition-all duration-300 backdrop-blur-sm`}
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
                  className={`w-full bg-gradient-to-r from-themegreen to-teal-400 hover:from-themegreen/90 hover:to-teal-300 disabled:from-gray-400 disabled:to-gray-500 text-emerald-900 font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-themegreen/25 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${
                    isLoading ? "animate-pulse" : ""
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-emerald-900"
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

              {/* Small bottom bar */}
              <div className="mt-8 flex justify-center">
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-themegreen/60 to-transparent rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Background particles*/}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute w-2 h-2 bg-themegreen/40 rounded-full top-10 left-10 animate-pulse"></div>
            <div className="absolute w-2 h-2 bg-teal-300/40 rounded-full top-20 left-1/2 animate-pulse delay-200"></div>
            <div className="absolute w-2 h-2 bg-emerald-300/40 rounded-full top-1/3 right-10 animate-pulse delay-400"></div>
            <div className="absolute w-2 h-2 bg-themegreen/30 rounded-full bottom-20 left-1/4 animate-pulse delay-600"></div>
            <div className="absolute w-2 h-2 bg-teal-400/40 rounded-full bottom-10 right-1/3 animate-pulse delay-800"></div>
            <div className="absolute w-2 h-2 bg-emerald-400/30 rounded-full top-1/4 right-1/4 animate-pulse delay-1000"></div>
          </div>
        </div>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}