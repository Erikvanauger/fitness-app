import React from "react";
import { Activity, ArrowUpRight } from "lucide-react";
import { useUserData } from "../context/UserContext";

interface ActivityPreviewProps {
  setCurrentView: (view: string) => void;
}

const ActivityPreview: React.FC<ActivityPreviewProps> = ({
  setCurrentView,
  
}) => {
  
  const { userData } = useUserData();
  const dailySteps = userData.dailySteps || 0;
  const stepGoal = userData.stepGoal || 10000;
  const stepPercentage = stepGoal > 0 ? (dailySteps / stepGoal) * 100 : 0;
  

  return (
    <div
      onClick={() => setCurrentView("calendar")}
      className="bg-white rounded-lg p-4 flex flex-col gap-y-2 md:gap-y-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <h4 className="text-lg md:text-xl font-semibold flex items-center">
          <Activity className="text-blue-500 mr-2" /> Activity
        </h4>
        <ArrowUpRight className="text-gray-400 w-5 h-5" />
      </div>

      <div className="bg-blue-100 rounded-lg p-3 mt-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium">Todays steps</span>
          <span className="text-sm font-bold">
            {dailySteps.toLocaleString()} / {stepGoal.toLocaleString()}
          </span>
        </div>
        <div className="w-full bg-blue-200 rounded-full h-2 mb-1">
          <div
            className="h-2 rounded-full bg-blue-500"
            style={{ width: `${Math.min(stepPercentage, 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-blue-700">
          {Math.round(stepPercentage)}% of daily goal
        </p>
      </div>

      <div className="flex justify-center gap-2 mt-2">
        <div className="text-center bg-gray-100 p-2 rounded-md">
          <p className="text-xs text-gray-600">Distance</p>
          <p className="text-sm font-semibold">
            {(dailySteps / 1300).toFixed(1)} km
          </p>
        </div>
        <div className="text-center bg-gray-100 p-2 rounded-md">
          <p className="text-xs text-gray-600">Burned</p>
          <p className="text-sm font-semibold">
            {Math.floor(dailySteps / 20)} kcal
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivityPreview;
