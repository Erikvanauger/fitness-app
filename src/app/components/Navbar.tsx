import React, { useState, useEffect } from "react";
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
  Menu,
  X
} from "lucide-react";

interface NavbarProps {
  setCurrentView: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setCurrentView }) => {
  const [activeView, setActiveView] = useState<string>("dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Handle body scroll locking
  useEffect(() => {
    if (isMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Apply fixed positioning to body to prevent scrolling
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position when menu closes
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    
    // Cleanup function to ensure body styles are reset
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isMenuOpen]);
  
  const handleViewChange = (view: string) => {
    setActiveView(view);
    setCurrentView(view);
    setIsMenuOpen(false); 
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Burger menu button for mobile
  const MobileMenuButton = () => (
    <button 
      onClick={toggleMenu} 
      className="fixed top-4 left-4 z-50 p-2 bg-themegreen rounded-full shadow-md sm:hidden"
    >
      {isMenuOpen ? (
        <X className="w-6 h-6" />
      ) : (
        <Menu className="w-6 h-6" />
      )}
    </button>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <MobileMenuButton />
      
      {/* Mobile Overlay Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-themegreen z-40 flex flex-col items-center sm:hidden overflow-auto">
          <div className="flex justify-center w-full px-6 pt-16">
            <Image
              src="/FBicon.png"
              alt="Logo"
              width={100}
              height={100}
              className="w-auto h-auto"
            />
          </div>
          
          <div className="flex flex-col items-center gap-8 mt-8 w-full pb-16">
            <button
              onClick={() => handleViewChange("dashboard")}
              className={`flex items-center justify-center p-4 w-4/5 rounded-full ${
                activeView === "dashboard" ? "bg-navselect" : ""
              }`}
            >
              <House className="w-6 h-6 mr-4" />
              <span className="text-lg">Dashboard</span>
            </button>
            
            <button
              onClick={() => handleViewChange("calories")}
              className={`flex items-center justify-center p-4 w-4/5 rounded-full ${
                activeView === "calories" ? "bg-navselect" : ""
              }`}
            >
              <ChartNetwork className="w-6 h-6 mr-4" />
              <span className="text-lg">Calories</span>
            </button>
            
            <button
              onClick={() => handleViewChange("calendar")}
              className={`flex items-center justify-center p-4 w-4/5 rounded-full ${
                activeView === "calendar" ? "bg-navselect" : ""
              }`}
            >
              <CalendarHeart className="w-6 h-6 mr-4" />
              <span className="text-lg">Calendar</span>
            </button>
            
            <button
              onClick={() => handleViewChange("recipes")}
              className={`flex items-center justify-center p-4 w-4/5 rounded-full ${
                activeView === "recipes" ? "bg-navselect" : ""
              }`}
            >
              <BookOpen className="w-6 h-6 mr-4" />
              <span className="text-lg">Recipes</span>
            </button>
            
            {/* Split line */}
            <div className="border border-black/40 w-4/5 my-4"></div>
            
            <button
              onClick={() => handleViewChange("notifications")}
              className={`flex items-center justify-center p-4 w-4/5 rounded-full ${
                activeView === "notifications" ? "bg-navselect" : ""
              }`}
            >
              <Bell className="w-6 h-6 mr-4" />
              <span className="text-lg">Notifications</span>
            </button>
            
            <button
              onClick={() => handleViewChange("settings")}
              className={`flex items-center justify-center p-4 w-4/5 rounded-full ${
                activeView === "settings" ? "bg-navselect" : ""
              }`}
            >
              <Settings className="w-6 h-6 mr-4" />
              <span className="text-lg">Settings</span>
            </button>
            
            <button
              onClick={() => handleViewChange("user")}
              className={`flex items-center justify-center p-4 w-4/5 rounded-full ${
                activeView === "user" ? "bg-navselect" : ""
              }`}
            >
              <CircleUserRound className="w-6 h-6 mr-4" />
              <span className="text-lg">Profile</span>
            </button>
            
            <button
              onClick={() => setCurrentView("logout")}
              className="flex items-center justify-center p-4 w-4/5 rounded-full mt-4"
            >
              <LogOut className="w-6 h-6 mr-4" />
              <span className="text-lg">Logout</span>
            </button>
          </div>
        </div>
      )}
      
      {/* Desktop Sidebar - Hidden on mobile */}
      <nav className="hidden sm:flex w-[70px] md:w-[80px] lg:w-[100px] flex-col bg-themegreen text-black">
        <div className="flex justify-center w-full px-6 pt-6">
          <Image
            src="/FBicon.png"
            alt="Logo"
            width={100}
            height={100}
            className="w-auto h-auto"
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
            <House className="w-6 h-6 md:w-8 md:h-8" />
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
            <ChartNetwork className="w-6 h-6 md:w-8 md:h-8" />
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
            <CalendarHeart className="w-6 h-6 md:w-8 md:h-8" />
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
    </>
  );
};

export default Navbar;