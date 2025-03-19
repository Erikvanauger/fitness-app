import React, { useState } from "react";
import Image from "next/image";
import {
  House,
  ChartNetwork,
  CalendarHeart,
  Bell,
  Settings,
  LogOut,
  BookOpen,
  CircleUserRound,
} from "lucide-react";

interface NavbarProps {
  setCurrentView: (view: string) => void; // Funktion för att uppdatera vy
}

const Navbar: React.FC<NavbarProps> = ({ setCurrentView }) => {
  const [activeView, setActiveView] = useState<string>("dashboard");
  

  const handleViewChange = (view: string) => {
    setActiveView(view);
    setCurrentView(view);
  };

  return (
    <nav className="w-[70px] md:w-[80px] lg:w-[100px] flex flex-col bg-themegreen text-black ">
      <div className=" flex justify-center w-full px-6 pt-6 ">
        <Image
          src="/FBicon.png"
          alt="Logo"
          width={100}
          height={100}
          className="w-auto h-auto "
        />
      </div>

      <div className="flex flex-col gap-2 mt-16">
        <button
          onClick={() => handleViewChange("dashboard")}
          className={`flex items-center justify-center p-4 transition-[width] duration-400 ease-in-out 
          ${
            activeView === "dashboard"
              ? "bg-navselect md:w-[100px] lg:w-[120px] rounded-r-full"
              : "hover:bg-navselect w-full"
          }
          `}
        >
          <House className="w-6 h-6 md:w-8 md:h-8 " />
        </button>

        <button
          onClick={() => handleViewChange("calories")}
          className={`flex items-center justify-center p-4 mt-4 transition-[width] duration-400 ease-in-out
          ${
            activeView === "calories"
              ? "bg-navselect md:w-[100px] lg:w-[120px] rounded-r-full"
              : "hover:bg-navselect w-full"
          }
          `}
        >
          <ChartNetwork className="w-6 h-6 md:w-8 md:h-8 " />
        </button>

        <button
          onClick={() => handleViewChange("calendar")}
          className={`flex items-center justify-center p-4 mt-4 transition-[width] duration-400 ease-in-out
          ${
            activeView === "calendar"
              ? "bg-navselect md:w-[100px] lg:w-[120px] rounded-r-full"
              : "hover:bg-navselect w-full"
          }
          `}
        >
          <CalendarHeart className="w-6 h-6 md:w-8 md:h-8 " />
        </button>

        <button
          onClick={() => handleViewChange("recipes")}
          className={`flex items-center justify-center p-4 mt-4 transition-[width] duration-400 ease-in-out 
          ${
            activeView === "recipes"
              ? "bg-navselect md:w-[100px] lg:w-[120px] rounded-r-full"
              : "hover:bg-navselect w-full"
          }
          `}
        >
          <BookOpen className="w-6 h-6 md:w-8 md:h-8" />
        </button>
      </div>

      {/* Split line */}
      <div className="border border-black/40 my-12 mx-6"></div>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => handleViewChange("notifications")}
          className={`flex items-center justify-center p-4 transition-[width] duration-400 ease-in-out
          ${
            activeView === "notifications"
              ? "bg-navselect md:w-[100px] lg:w-[120px] rounded-r-full"
              : "hover:bg-navselect w-full"
          }
          `}
        >
          <Bell className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        <button
          onClick={() => handleViewChange("settings")}
          className={`flex items-center justify-center p-4 mt-4 transition-[width] duration-400 ease-in-out
          ${
            activeView === "settings"
              ? "bg-navselect md:w-[100px] lg:w-[120px] rounded-r-full"
              : "hover:bg-navselect w-full"
          }
          `}
        >
          <Settings className="w-6 h-6 md:w-8 md:h-8" />
        </button>
      </div>

      <button
        onClick={() => handleViewChange("user")}
        className={`flex items-center justify-center p-4 mt-4 transition-[width] duration-400 ease-in-out 
          ${
            activeView === "user"
              ? "bg-navselect md:w-[100px] lg:w-[120px] rounded-r-full"
              : "hover:bg-navselect w-full"
          }
          `}
      >
        <CircleUserRound className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <button
        onClick={() => setCurrentView("logout")}
        className="flex items-center justify-center mt-auto mb-12 p-4"
      >
        <LogOut className="w-6 h-6 md:w-8 md:h-8" />
      </button>
    </nav>
  );
};

export default Navbar;
