"use client";
import { useState } from "react";
import Dashboard from "./dashboard/Dashboard";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (password === "1234") {
      setIsLoggedIn(true);
    } else {
      alert("Fel lösenord!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!isLoggedIn ? (
        <>
          <h1 className="text-2xl font-bold">Logga in</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 my-2"
          />
          <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2">
            Logga in
          </button>
        </>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}