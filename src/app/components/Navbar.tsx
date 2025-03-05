import React, { useState } from "react";
import Image from "next/image";
import {House, ChartNetwork, CalendarHeart, Bell, Settings, LogOut} from "lucide-react"

interface NavbarProps {
  setCurrentView: (view: string) => void; // Funktion för att uppdatera vy
}

const Navbar: React.FC<NavbarProps> = ({ setCurrentView }) => {
  
  const [activeView, setActiveView] = useState<string>("dashboard"); // Spårar vilken knapp som är vald

  const handleViewChange = (view: string) => {
    setActiveView(view);
    setCurrentView(view);
  };



  return (
    <nav className="w-[130px] flex flex-col bg-themegreen text-black rounded-tl-[60px] rounded-bl-[60px]">
      
      <div className=" flex justify-center w-full px-6 pt-6 ">
        <Image src="/FBicon.png" alt="Logo" width={100} height={100} /> 
      </div>
      
      <div className="flex flex-col gap-2 mt-16">
      <button 
          onClick={() => handleViewChange("dashboard")} 
          className={`flex items-center justify-center p-4 transition-[width] duration-400 ease-in-out 
          ${activeView === "dashboard" ? "bg-navselect w-[140px] rounded-r-full" : "hover:bg-navselect w-full"}
          `}>
          <House size={40} />
        </button>

        <button 
          onClick={() => handleViewChange("calories")} 
          className={`flex items-center justify-center p-4 mt-4 transition-[width] duration-400 ease-in-out
          ${activeView === "calories" ? "bg-navselect w-[140px] rounded-r-full" : "hover:bg-navselect w-full"}
          `}>
          <ChartNetwork size={40} />
        </button>

        <button 
          onClick={() => handleViewChange("calendar")} 
          className={`flex items-center justify-center p-4 mt-4 transition-[width] duration-400 ease-in-out
          ${activeView === "calendar" ? "bg-navselect w-[140px] rounded-r-full" : "hover:bg-navselect w-full"}
          `}>
          <CalendarHeart size={40} />
        </button>
      </div>

      {/* Split line */}
      <div className="border border-black/40 my-12 mx-6"></div>

      
      <div className="flex flex-col gap-2">
      <button 
          onClick={() => handleViewChange("notifications")} 
          className={`flex items-center justify-center p-4 transition-[width] duration-400 ease-in-out
          ${activeView === "notifications" ? "bg-navselect w-[140px] rounded-r-full" : "hover:bg-navselect w-full"}
          `}>
          <Bell size={40} />
        </button>

        <button 
          onClick={() => handleViewChange("settings")} 
          className={`flex items-center justify-center p-4 mt-4 transition-[width] duration-400 ease-in-out
          ${activeView === "settings" ? "bg-navselect w-[140px] rounded-r-full" : "hover:bg-navselect w-full"}
          `}>
          <Settings size={40} />
        </button>
      </div>

      <button onClick={() => setCurrentView("logout")} className="flex items-center justify-center mt-auto mb-12 p-4">
        <LogOut size={40} />
      </button>
    </nav>
  );
};

export default Navbar;