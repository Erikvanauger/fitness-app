import React, { useState } from "react";
import { useUserData } from "../context/UserContext";
import { ArrowRight, PlusCircle, Flame, Droplets, Minus, Plus } from "lucide-react";

const foodItems = [
  { id: 1, name: "Oatmeal", calories: 150, protein: 5, carbs: 25, fat: 3 },
  { id: 2, name: "Grilled Chicken", calories: 250, protein: 30, carbs: 0, fat: 10 },
  { id: 3, name: "Salad", calories: 80, protein: 2, carbs: 10, fat: 4 },
  { id: 4, name: "Protein Shake", calories: 120, protein: 20, carbs: 5, fat: 2 },
  { id: 5, name: "Banana", calories: 105, protein: 1, carbs: 27, fat: 0 },
  { id: 6, name: "Greek Yogurt", calories: 100, protein: 10, carbs: 5, fat: 3 },
];

const waterPresets = [
  { amount: 0.25, label: "Glass" },
  { amount: 0.5, label: "Bottle" },
  { amount: 1.0, label: "Large Bottle" },
];

interface CaloriesProps {
  setCurrentView: (view: string) => void;
}

function Calories({ setCurrentView }: CaloriesProps) {
  const { userData, updateConsumedCalories, setUserData } = useUserData();
  const [selectedFood, setSelectedFood] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [meals, setMeals] = useState<{id: number, name: string, calories: number}[]>([]);
  const [waterAmount, setWaterAmount] = useState(0.25);
  const [waterLog, setWaterLog] = useState<{id: number, amount: number, time: string}[]>([]);

  // Calculate remaining calories
  const remainingCalories = userData.dailyCalories - userData.consumedCalories;
  
  // Water calculations
  const waterGoal = parseFloat(userData.waterIntake) || 2;
  const waterProgress = userData.currentWaterIntake || 0;
  const remainingWater = waterGoal - waterProgress;
  const waterPercentage = (waterProgress / waterGoal) * 100;
  
  const handleAddMeal = () => {
    if (!selectedFood) return;
    
    const food = foodItems.find(item => item.name === selectedFood);
    if (!food) return;
    
    const totalCalories = food.calories * quantity;
    
    // Add to meals list
    setMeals(prev => [...prev, {
      id: Date.now(),
      name: `${quantity}x ${food.name}`,
      calories: totalCalories
    }]);
    
    // Update consumed calories in context
    updateConsumedCalories(totalCalories);
    
    // Reset form
    setSelectedFood("");
    setQuantity(1);
  };

  const handleAddWater = () => {
    if (waterAmount <= 0) return;
    
    const newWaterEntry = {
      id: Date.now(),
      amount: waterAmount,
      time: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
    
    setWaterLog(prev => [...prev, newWaterEntry]);
    
    // Update user data with new water intake
    setUserData(prev => ({
      ...prev,
      currentWaterIntake: prev.currentWaterIntake + waterAmount
    }));
    
    // Reset water amount
    setWaterAmount(0.25);
  };

  const removeWaterEntry = (id: number) => {
    const entry = waterLog.find(log => log.id === id);
    if (!entry) return;
    
    // Remove from log
    setWaterLog(prev => prev.filter(log => log.id !== id));
    
    // Update user data
    setUserData(prev => ({
      ...prev,
      currentWaterIntake: Math.max(0, prev.currentWaterIntake - entry.amount)
    }));
  };

  // Reset functions
  const resetTracker = () => {
    updateConsumedCalories(-userData.consumedCalories);
    setMeals([]);
  };

  const resetWater = () => {
    setUserData(prev => ({
      ...prev,
      currentWaterIntake: 0
    }));
    setWaterLog([]);
  };

  // Calculate progress percentage
  const caloriePercentage = userData.dailyCalories > 0 
    ? (userData.consumedCalories / userData.dailyCalories) * 100 
    : 0;

  return (
    <div className="p-4">
      {!userData.name || !userData.dailyCalories ? (
        <div className="flex flex-col items-center justify-center p-10 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>
          <p className="text-gray-600 mb-6 text-center">
            Please complete your profile information first to see your
            personalized calorie and water tracking.
          </p>
          <button
            onClick={() => setCurrentView("user")}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center"
          >
            Go to Profile <ArrowRight className="ml-2" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calorie Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Flame className="mr-2 text-orange-500" />
              Calorie Summary
            </h2>

            <div className="flex justify-between mb-2">
              <span className="font-medium">Daily Target:</span>
              <span className="font-semibold">
                {userData.dailyCalories} calories
              </span>
            </div>

            <div className="flex justify-between mb-2">
              <span className="font-medium">Consumed:</span>
              <span className="font-semibold">
                {userData.consumedCalories} calories
              </span>
            </div>

            <div className="flex justify-between mb-4">
              <span className="font-medium">Remaining:</span>
              <span
                className={`font-semibold ${
                  remainingCalories < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {remainingCalories} calories
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
              <div
                className={`h-4 rounded-full ${
                  remainingCalories < 0 ? "bg-red-500" : "bg-green-500"
                }`}
                style={{ width: `${Math.min(caloriePercentage, 100)}%` }}
              ></div>
            </div>

            {/* Add Food Section */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-4">Add Food</h3>
              <div className="flex mb-4">
                <select
                  value={selectedFood}
                  onChange={(e) => setSelectedFood(e.target.value)}
                  className="flex-1 p-2 border rounded-l"
                >
                  <option value="">Select food</option>
                  {foodItems.map((food) => (
                    <option key={food.id} value={food.name}>
                      {food.name}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-20 p-2 border-t border-b border-r"
                />

                <button
                  onClick={handleAddMeal}
                  className="bg-blue-500 text-white p-2 rounded-r flex items-center"
                >
                  <PlusCircle className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Today's meals */}
            <h3 className="font-medium mb-2">Today's Meals</h3>
            {meals.length === 0 ? (
              <p className="text-gray-500 text-sm">No meals added yet today</p>
            ) : (
              <div className="space-y-2 mb-4">
                {meals.map((meal) => (
                  <div
                    key={meal.id}
                    className="flex justify-between items-center p-2 bg-gray-100 rounded"
                  >
                    <span>{meal.name}</span>
                    <span className="flex items-center text-orange-500">
                      <Flame className="w-4 h-4 mr-1" /> {meal.calories}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={resetTracker}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full"
            >
              Reset Calories
            </button>
          </div>

          {/* Water Intake Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Droplets className="mr-2 text-cyan-500" />
              Water Intake
            </h2>

            <div className="flex justify-between mb-2">
              <span className="font-medium">Daily Goal:</span>
              <span className="font-semibold">{waterGoal.toFixed(1)} L</span>
            </div>

            <div className="flex justify-between mb-2">
              <span className="font-medium">Consumed:</span>
              <span className="font-semibold">
                {waterProgress.toFixed(1)} L
              </span>
            </div>

            <div className="flex justify-between mb-4">
              <span className="font-medium">Remaining:</span>
              <span
                className={`font-semibold ${
                  remainingWater < 0 ? "text-red-500" : "text-cyan-500"
                }`}
              >
                {remainingWater.toFixed(1)} L
              </span>
            </div>

            {/* Water Progress bar */}
            <div className="w-full bg-cyan-200 rounded-full h-4 mb-6">
              <div
                className="h-4 rounded-full bg-cyan-500"
                style={{ width: `${Math.min(waterPercentage, 100)}%` }}
              ></div>
            </div>

            {/* Add Water Section */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-4">Add Water</h3>

              {/* Quick add */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {waterPresets.map((preset) => (
                  <button
                    key={preset.amount}
                    onClick={() => setWaterAmount(preset.amount)}
                    className={`p-2 rounded border text-sm ${
                      waterAmount === preset.amount
                        ? "bg-cyan-500 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {preset.label}
                    <br />
                    <span className="text-xs">{preset.amount}L</span>
                  </button>
                ))}
              </div>

              {/* Custom amount */}
              <div className="space-y-3">
                <div className="flex items-stretch">
                  <button
                    onClick={() =>
                      setWaterAmount(Math.max(0.1, waterAmount - 0.1))
                    }
                    className="h-10 px-3 border rounded-l bg-gray-100 hover:bg-gray-200 flex-shrink-0 flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={waterAmount}
                    onChange={(e) =>
                      setWaterAmount(parseFloat(e.target.value) || 0.1)
                    }
                    className="flex-1 min-w-0 h-10 px-2 border-t border-b text-center"
                  />
                  <span className="h-10 px-3 border-t border-b bg-gray-50 text-sm flex-shrink-0 flex items-center justify-center">
                    L
                  </span>
                  <button
                    onClick={() => setWaterAmount(waterAmount + 0.1)}
                    className="h-10 px-3 border rounded-r bg-gray-100 hover:bg-gray-200 flex-shrink-0 flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddWater}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded flex items-center justify-center"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Add Water
                </button>
              </div>
            </div>

            {/* Water Log */}
            <h3 className="font-medium mb-2">Today's Water Log</h3>
            {waterLog.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No water intake logged today
              </p>
            ) : (
              <div className="space-y-2 mb-4 max-h-32 overflow-y-auto">
                {waterLog.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex justify-between items-center p-2 bg-cyan-50 rounded"
                  >
                    <span className="flex items-center">
                      <Droplets className="w-4 h-4 mr-1 text-cyan-500" />
                      {entry.amount.toFixed(1)}L at {entry.time}
                    </span>
                    <button
                      onClick={() => removeWaterEntry(entry.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={resetWater}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full"
            >
              Reset Water
            </button>
          </div>

          {/* User Stats */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-medium mb-4">Your Daily Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center p-3 bg-gray-100 rounded">
                <div className="font-bold text-lg">{userData.weight} kg</div>
                <div className="text-gray-600">Weight</div>
              </div>
              <div className="text-center p-3 bg-gray-100 rounded">
                <div className="font-bold text-lg">{userData.height} cm</div>
                <div className="text-gray-600">Height</div>
              </div>
              <div className="text-center p-3 bg-gray-100 rounded">
                <div className="font-bold text-lg">
                  {userData.goal.replace("_", " ")}
                </div>
                <div className="text-gray-600">Goal</div>
              </div>
              <div className="text-center p-3 bg-gray-100 rounded">
                <div className="font-bold text-lg">{userData.waterIntake}L</div>
                <div className="text-gray-600">Water Goal</div>
              </div>
            </div>

            {/* Nutrition Tips */}
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-medium mb-2">Nutrition Tips</h3>
              <p className="text-sm text-gray-700">
                Based on your {userData.goal.replace("_", " ")} goal, focus on
                {userData.goal === "weight_loss"
                  ? " protein-rich foods with low calories and stay well hydrated to support metabolism."
                  : userData.goal === "muscle_gain"
                  ? " protein and complex carbs to fuel muscle growth, plus extra water for recovery."
                  : " balanced nutrition with plenty of fruits and vegetables, and consistent hydration."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calories;