import React, { useState } from "react";
import { useUserData } from "../context/UserContext";
import { ArrowRight, PlusCircle, Flame } from "lucide-react";


const foodItems = [
  { id: 1, name: "Oatmeal", calories: 150, protein: 5, carbs: 25, fat: 3 },
  { id: 2, name: "Grilled Chicken", calories: 250, protein: 30, carbs: 0, fat: 10 },
  { id: 3, name: "Salad", calories: 80, protein: 2, carbs: 10, fat: 4 },
  { id: 4, name: "Protein Shake", calories: 120, protein: 20, carbs: 5, fat: 2 },
  { id: 5, name: "Banana", calories: 105, protein: 1, carbs: 27, fat: 0 },
  { id: 6, name: "Greek Yogurt", calories: 100, protein: 10, carbs: 5, fat: 3 },
];

function Calories() {
  const { userData, updateConsumedCalories } = useUserData();
  const [selectedFood, setSelectedFood] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [meals, setMeals] = useState<{id: number, name: string, calories: number}[]>([]);

  // Calculate remaining calories
  const remainingCalories = userData.dailyCalories - userData.consumedCalories;
  
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

  //Reset calories
  const resetTracker = () => {
    updateConsumedCalories(-userData.consumedCalories); // Nollställ till 0
    setMeals([]); // Töm måltiderna
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
            personalized calorie tracking.
          </p>
          <button
            onClick={() => {
              /* Navigate to user profile */
            }}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center"
          >
            Go to Profile <ArrowRight className="ml-2" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Calorie Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Calorie Summary</h2>

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

            {/* User details */}
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-medium mb-2">Your Stats</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Weight: {userData.weight} kg</div>
                <div>Height: {userData.height} cm</div>
                <div>Goal: {userData.goal.replace("_", " ")}</div>
                <div>Water: {userData.waterIntake} L/day</div>
              </div>
            </div>
          </div>

          {/* Food Tracker */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Add Food</h2>

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

            {/* Todays meals */}
            <h3 className="font-medium mb-2">Todays Meals</h3>
            {meals.length === 0 ? (
              <p className="text-gray-500 text-sm">No meals added yet today</p>
            ) : (
              <div className="space-y-2">
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

            {/* Nutrition breakdown */}
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-medium mb-2">Nutrition Tips</h3>
              <p className="text-sm text-gray-700">
                Based on your {userData.goal.replace("_", " ")} goal, focus on
                {userData.goal === "weight_loss"
                  ? " protein-rich foods with low calories."
                  : userData.goal === "muscle_gain"
                  ? " protein and complex carbs to fuel muscle growth."
                  : " balanced nutrition with plenty of fruits and vegetables."}
              </p>
            </div>
            <button
              onClick={resetTracker}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full"
            >
              Reset Calories
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calories;