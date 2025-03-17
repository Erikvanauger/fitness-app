import { useState } from "react";
import Navbar from "../components/Navbar"; 
import Calendar from "../views/Calendar"; 
import Calories from "../views/Calories";
import Settings from "../views/Settings";
import DashboardContent from "../views/DashboardContent"; 
import Notifications from "../views/Notifications";
import Recipes from "../views/Recipes";
import User from "../views/User";



export function Dashboard() {
  const [currentView, setCurrentView] = useState("dashboard"); // Standardvy

  const renderContent = () => {
    switch (currentView) {
       case "dashboard":
      default:
        return <DashboardContent setCurrentView={setCurrentView}/>; 
      case "calories":
        return <Calories />;
      case "calendar":
        return <Calendar />;
      case "notifications":
        return <Notifications />;
      case "settings":
        return <Settings/>;
      case "recipes":
        return <Recipes/>
        case "user":
        return <User/>
    }
  };

  return (
      <div className="flex h-[98%] w-[98%] bg-mainbg rounded-[40px]">
        <Navbar setCurrentView={setCurrentView} />
        <main className="flex-1 px-4 pb-4">
          {renderContent()}
        </main>
      </div>
  );
}

export default Dashboard