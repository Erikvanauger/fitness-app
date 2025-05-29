import { useState } from "react";
import Navbar from "../components/Navbar";
import Calendar from "../views/Calendar";
import Calories from "../views/Calories";
import Settings from "../views/Settings";
import DashboardContent from "../views/DashboardContent";
import Notifications from "../views/Notifications";
import Recipes from "../views/Recipes";
import User from "../views/User";
import { UserProvider } from "../context/UserContext";

export function Dashboard() {
  // This state is now the single source of truth for current view
  const [currentView, setCurrentView] = useState("dashboard");

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
      default:
        return <DashboardContent setCurrentView={setCurrentView} />;
      case "calories":
        return <Calories setCurrentView={setCurrentView}/>;
      case "calendar":
        return <Calendar />;
      case "notifications":
        return <Notifications />;
      case "settings":
        return <Settings />;
      case "recipes":
        return <Recipes />;
      case "user":
        return <User />;
    }
  };

  return (
    <UserProvider>
      <div className="flex w-full h-screen bg-mainbg overfl">
        <Navbar 
          setCurrentView={setCurrentView} 
          currentView={currentView} 
        />
        <main className="flex-1 overflow-y-auto px-2 sm:px-4 pb-4 pt-16 sm:pt-4">
          <div className="min-h-auto">
          {renderContent()}
          </div>
        </main>
      </div>
    </UserProvider>
  );
}

export default Dashboard;