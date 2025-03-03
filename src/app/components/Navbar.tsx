import React from "react";

interface NavbarProps {
  setCurrentView: (view: string) => void; // Funktion för att uppdatera vy
}

const Navbar: React.FC<NavbarProps> = ({ setCurrentView }) => {
  return (
    <nav className="w-1/4 bg-gray-200 p-4 text-black">
    <button onClick={() => setCurrentView("dashboard")}>Dashboard</button>
      <button onClick={() => setCurrentView("calendar")}>Kalender</button>
      <button onClick={() => setCurrentView("calories")}>Calories</button>
      <button onClick={() => setCurrentView("weight")}>Weight</button>
    </nav>
  );
};

export default Navbar;