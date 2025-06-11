import React from "react";
import { Droplets, ArrowUpRight, User, ArrowRight } from "lucide-react";
import { useUserData } from "../context/UserContext";

interface WaterIntakePreviewProps {
  setCurrentView: (view: string) => void;
}

const WaterIntakePreview: React.FC<WaterIntakePreviewProps> = ({
  setCurrentView,
}) => {
  const { userData } = useUserData();

  
  if (!userData.waterIntake) {
    return (
      <div className="bg-white p-4 rounded-lg h-full flex flex-col justify-between">
        <div>
          <h4 className="text-xl font-semibold mb-2 flex items-center">
            <Droplets className="text-cyan-500 mr-2" /> Water
          </h4>

          <div className="flex justify-center items-center h-full">
            <div className="p-3 bg-gray-100 rounded-lg text-center fl">
              <User className="mx-auto text-gray-400 mb-2 w-12 h-12" />
              <p className="text-sm text-gray-600 mb-2">
                Complete your profile to track water intake
              </p>
            </div>
          </div>
        </div>

        <div className="text-xs text-blue-500 hover:underline mt-4 self-end cursor-pointer flex items-center">
          Complete profile <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </div>
      </div>
    );
  }

  const waterGoal = parseFloat(userData.waterIntake) || 2;
  const waterProgress = userData.currentWaterIntake || 0;
  const progressPercentage = (waterProgress / waterGoal) * 100;

  return (
    <div
      onClick={() => setCurrentView("calories")}
      className="bg-white p-4 gap-y-2 md:gap-y-4 rounded-lg shadow-md h-full flex flex-col "
    >
      <div className="flex justify-between items-center">
        <h4 className="text-lg md:text-xl font-semibold flex items-center">
          <Droplets className="text-cyan-500 mr-2" /> Water
        </h4>
        <ArrowUpRight className="text-gray-400 w-5 h-5" />
      </div>

      <div className="bg-cyan-100 rounded-lg p-3 mt-2">
        <div className="flex justify-between items-center mb-1 md:flex-col lg:flex-row">
          <span className="text-sm font-medium">Todays intake</span>
          <span className="text-sm font-bold">
            {waterProgress.toFixed(1)} L / {waterGoal.toFixed(1)} L
          </span>
        </div>
        <div className="w-full bg-cyan-200 rounded-full h-4 mb-1">
          <div
            className="h-4 rounded-full bg-cyan-500"
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