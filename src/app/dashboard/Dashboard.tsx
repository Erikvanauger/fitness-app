import { useState } from "react";
import Navbar from "../components/Navbar"; // Importera din Navbar
import Calendar from "../views/Calendar"; // Importera vyerna
import Calories from "../views/Calories";
import Weight from "../views/weight";
import DashboardContent from "../views/DashboardContent"; // Importera din dashboard innehållskomponent

export function Dashboard() {
  const [currentView, setCurrentView] = useState("dashboard"); // Standardvy

  const renderContent = () => {
    switch (currentView) {
      case "calendar":
        return <Calendar />;
      case "calories":
        return <Calories />;
      case "weight":
        return <Weight />;
      case "dashboard":
      default:
        return <DashboardContent />; // Din standardvy
    }
  };

  return (
    <div className="flex w-full h-full">
      <Navbar setCurrentView={setCurrentView} />
      <main className="flex-1 p-4">
        {renderContent()}
      </main>
    </div>
  );
}

export default Dashboard