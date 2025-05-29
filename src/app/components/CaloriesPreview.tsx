import React from "react";
import { useUserData } from "../context/UserContext";
import { Flame, User, ArrowRight } from "lucide-react";

const CaloriesPreview = () => {
  const { userData } = useUserData();

  // Show profile completion CTA if no user data
  if (!userData.dailyCalories) {
    return (
      <div className="bg-white p-4 rounded-lg h-full flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Flame className="text-orange-500 mr-2" /> Calories
          </h3>

          <div className="flex justify-center items-center h-full">
            <div className="p-3 bg-gray-100 rounded-lg text-center fl">
              <User className="mx-auto text-gray-400 mb-2 w-12 h-12" />
              <p className="text-sm text-gray-600 mb-2">
                Complete your profile to track calories
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

  const { consumedCalories, dailyCalories } = userData;
  const remaining = dailyCalories - consumedCalories;
  const percentage = dailyCalories > 0 
    ? Math.min((consumedCalories / dailyCalories) * 100, 100) 
    : 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-full flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <Flame className="text-orange-500 mr-2" /> Calories
        </h3>

        <div className="text-sm mb-2">
          <span className="font-medium">Consumed:</span> {consumedCalories} / {dailyCalories} kcal
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div 
            className={`h-3 rounded-full ${remaining < 0 ? 'bg-red-500' : 'bg-green-500'}`} 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <p className={`text-xs ${remaining < 0 ? 'text-red-500' : 'text-gray-600'}`}>
          {remaining < 0 ? `${Math.abs(remaining)} kcal over` : `${remaining} kcal remaining`}
        </p>
      </div>

      <div className="text-xs text-blue-500 hover:underline mt-4 self-end cursor-pointer">
        View full tracker →
      </div>
    </div>
  );
};

export default CaloriesPreview;