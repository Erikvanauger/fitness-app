import React from "react";
import { Droplets, ArrowUpRight } from "lucide-react";
import { useUserData } from "../context/UserContext";

interface WaterIntakePreviewProps {
  setCurrentView: (view: string) => void;
}

const WaterIntakePreview: React.FC<WaterIntakePreviewProps> = ({
  setCurrentView,
}) => {
  const { userData } = useUserData();
  const waterGoal = parseFloat(userData.waterIntake) || 2;
  const waterProgress = userData.currentWaterIntake || 0;
  const progressPercentage = (waterProgress / waterGoal) * 100;

  return (
    <div
      onClick={() => setCurrentView("calories")}
      className="bg-white rounded-lg p-4 flex flex-col gap-y-2 md:gap-y-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <h4 className="text-lg md:text-xl font-semibold flex items-center">
          <Droplets className="text-cyan-500 mr-2" /> Water
        </h4>
        <ArrowUpRight className="text-gray-400 w-5 h-5" />
      </div>

      <div className="bg-cyan-100 rounded-lg p-3 mt-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium">Today’s intake</span>
          <span className="text-sm font-bold">
            {waterProgress.toFixed(1)} L / {waterGoal.toFixed(1)} L
          </span>
        </div>
        <div className="w-full bg-cyan-200 rounded-full h-2 mb-1">
          <div
            className="h-2 rounded-full bg-cyan-500"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-cyan-700">
          {Math.round(progressPercentage)}% of daily goal
        </p>
      </div>
    </div>
  );
};

export default WaterIntakePreview;
