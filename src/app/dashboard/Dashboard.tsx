import { useState } from "react";
import Navbar from "../components/Navbar"; 
import Calendar from "../views/Calendar"; 
import Calories from "../views/Calories";
import Weight from "../views/Notifications";
import Settings from "../views/Settings";
import DashboardContent from "../views/DashboardContent"; // Importera din dashboard innehållskomponent


export function Dashboard() {
  const [currentView, setCurrentView] = useState("dashboard"); // Standardvy

  const renderContent = () => {
    switch (currentView) {
       case "dashboard":
      default:
        return <DashboardContent />; // Din standardvy
      case "calories":
        return <Calories />;
      case "calendar":
        return <Calendar />;
      case "notifications":
        return <Weight />;
      case "settings":
        return <Settings/>
     
    }
  };

  return (
      <div className="flex h-[97%] w-[98%] bg-black rounded-[40px]">
        <Navbar setCurrentView={setCurrentView} />
        <main className="flex-1 p-4">
          {renderContent()}
        </main>
      </div>
  );
}

export default Dashboard