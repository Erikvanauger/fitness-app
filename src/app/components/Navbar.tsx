import React from "react";
import Image from "next/image";
import {House, ChartNetwork, CalendarHeart, Bell, Settings, LogOut} from "lucide-react"

interface NavbarProps {
  setCurrentView: (view: string) => void; // Funktion för att uppdatera vy
}

const Navbar: React.FC<NavbarProps> = ({ setCurrentView }) => {
  return (
    <nav className="w-[130px] flex flex-col bg-themegreen p-6 text-black rounded-tl-[40px] rounded-bl-[40px]">
      
      <div className="mb-4 flex justify-center w-full">
        <Image src="/FBicon.png" alt="Logo" width={100} height={100} /> 
      </div>
      
      <div className="flex flex-col gap-2">
        <button onClick={() => setCurrentView("dashboard")} className="flex items-center justify-center">
          <House size={40} />
        </button>
        <button onClick={() => setCurrentView("calories")} className="flex items-center justify-center">
          <ChartNetwork size={40} />
        </button>
        <button onClick={() => setCurrentView("calendar")} className="flex items-center justify-center">
          <CalendarHeart size={40} />
        </button>
      </div>

      {/* Split line */}
      <div className="border-t border-black my-4"></div>

      
      <div className="flex flex-col gap-2">
        <button onClick={() => setCurrentView("notifications")} className="flex items-center justify-center">
          <Bell size={40} />
        </button>
        <button onClick={() => setCurrentView("settings")} className="flex items-center justify-center">
          <Settings size={40} />
        </button>
      </div>

      
      <button onClick={() => setCurrentView("logout")} className="flex items-center justify-center mt-auto">
        <LogOut size={40} />
      </button>
    </nav>
  );
};

export default Navbar;