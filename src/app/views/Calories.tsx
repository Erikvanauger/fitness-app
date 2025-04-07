import React, { useState, useEffect } from 'react';
import { LineChart, PieChart, BarChart } from 'lucide-react';
import Image from "next/image";

// Types for our component
interface UserData {
  name: string;
  age: string;
  weight: string;
  height: string;
  gender: string;
  goal: string;
  waterIntake: string;
  allergies: string[];
}

interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

interface Food {
  name: string;
  calories: number | string;
  protein: number | string;
  carbs: number | string;
  fat: number | string;
  mealType: string; // Adjust this type as necessary
}

// Common food items for quick add
const commonFoods = [
  { name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: 'Brown Rice (100g)', calories: 112, protein: 2.6, carbs: 23, fat: 0.9 },
  { name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
  { name: 'Eggs (2 large)', calories: 143, protein: 12.6, carbs: 0.7, fat: 9.5 },
  { name: 'Avocado (half)', calories: 160, protein: 2, carbs: 8.5, fat: 14.7 },
  { name: 'Greek Yogurt (175g)', calories: 100, protein: 17.5, carbs: 3.6, fat: 0.4 },
  { name: 'Salmon (100g)', calories: 206, protein: 22, carbs: 0, fat: 13 },
  { name: 'Mixed Vegetables (100g)', calories: 65, protein: 2.6, carbs: 13, fat: 0.3 },
];

function Calories() {
  // User data state (normally would be loaded from a database/localStorage)
  const [userData, setUserData] = useState<UserData>({
    name: 'Anton',
    age: '30',
    weight: '75',
    height: '180',
    gender: 'male',
    goal: 'weight_loss',
    waterIntake: '2.5',
    allergies: [],
  });
  
  // Food entries state
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'foods'>('daily');
  const [newFood, setNewFood] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    mealType: 'breakfast' as 'breakfast' | 'lunch' | 'dinner' | 'snack',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFoods, setFilteredFoods] = useState(commonFoods);
  
  // Calculate BMR using Mifflin-St Jeor Equation
  const calculateBMR = (): number => {
    const weight = parseFloat(userData.weight);
    const height = parseFloat(userData.height);
    const age = parseFloat(userData.age);
    
    if (!weight || !height || !age || !userData.gender) {
      return 0;
    }
    
    if (userData.gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  };
  
  // Calculate TDEE based on activity level
  const calculateTDEE = (bmr: number): number => {
    // Assuming moderate activity level (multiplier of 1.55)
    // Could be customized based on user activity data
    return Math.round(bmr * 1.55);
  };
  
  // Calculate daily calorie goal based on TDEE and user goal
  const calculateCalorieGoal = (tdee: number): number => {
    switch (userData.goal) {
      case 'weight_loss':
        return Math.round(tdee - 500); // 500 calorie deficit
      case 'muscle_gain':
        return Math.round(tdee + 300); // 300 calorie surplus
      case 'maintenance':
      default:
        return tdee;
    }
  };
  
  const bmr = calculateBMR();
  const tdee = calculateTDEE(bmr);
  const calorieGoal = calculateCalorieGoal(tdee);
  
  // Calculate consumed calories for today
  const consumedCalories = foodEntries.reduce((total, entry) => total + entry.calories, 0);
  
  // Calculate remaining calories
  const remainingCalories = calorieGoal - consumedCalories;
  
  // Calculate macronutrient totals
  const totalProtein = foodEntries.reduce((total, entry) => total + entry.protein, 0);
  const totalCarbs = foodEntries.reduce((total, entry) => total + entry.carbs, 0);
  const totalFat = foodEntries.reduce((total, entry) => total + entry.fat, 0);
  
  // Calculate recommended macros based on calorie goal
  // Protein: 30%, Carbs: 40%, Fat: 30%
  const recommendedProtein = Math.round((calorieGoal * 0.3) / 4); // 4 calories per gram
  const recommendedCarbs = Math.round((calorieGoal * 0.4) / 4); // 4 calories per gram
  const recommendedFat = Math.round((calorieGoal * 0.3) / 9); // 9 calories per gram
  
  // Helper function to add a new food entry
  const addFoodEntry = (food: Food) => {
    const newEntry: FoodEntry = {
      id: Date.now().toString(),
      name: food.name,
      calories: typeof food.calories === 'string' ? parseInt(food.calories) : food.calories,
      protein: typeof food.protein === 'string' ? parseFloat(food.protein) : food.protein,
      carbs: typeof food.carbs === 'string' ? parseFloat(food.carbs) : food.carbs,
      fat: typeof food.fat === 'string' ? parseFloat(food.fat) : food.fat,
      time: new Date().toLocaleTimeString(),
      mealType: newFood.mealType,
    };
    
    setFoodEntries([...foodEntries, newEntry]);
    
    // Reset form
    setNewFood({
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      mealType: 'breakfast',
    });
  };
  
  // Handle input change for new food
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewFood({ ...newFood, [name]: value });
  };
  
  // Handle form submission for new food
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFood.name && newFood.calories) {
      addFoodEntry(newFood);
    }
  };
  
  // Filter common foods based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = commonFoods.filter(food => 
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFoods(filtered);
    } else {
      setFilteredFoods(commonFoods);
    }
  }, [searchTerm]);
  
  // Remove a food entry
  const removeFoodEntry = (id: string) => {
    setFoodEntries(foodEntries.filter(entry => entry.id !== id));
  };
  
  // Group food entries by meal type
  const mealGroups = {
    breakfast: foodEntries.filter(entry => entry.mealType === 'breakfast'),
    lunch: foodEntries.filter(entry => entry.mealType === 'lunch'),
    dinner: foodEntries.filter(entry => entry.mealType === 'dinner'),
    snack: foodEntries.filter(entry => entry.mealType === 'snack'),
  };

  // Calculate calories per meal type
  const breakfastCalories = mealGroups.breakfast.reduce((sum, entry) => sum + entry.calories, 0);
  const lunchCalories = mealGroups.lunch.reduce((sum, entry) => sum + entry.calories, 0);
  const dinnerCalories = mealGroups.dinner.reduce((sum, entry) => sum + entry.calories, 0);
  const snackCalories = mealGroups.snack.reduce((sum, entry) => sum + entry.calories, 0);
  
  // Calculate calorie progress percentage
  const calorieProgressPercentage = Math.min(Math.round((consumedCalories / calorieGoal) * 100), 100);
  
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Calorie Tracker</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Calorie summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Daily Summary</h2>
            
            <div className="mb-4">
              <p className="text-gray-600">Basal Metabolic Rate (BMR)</p>
              <p className="text-2xl font-bold">{bmr.toFixed(0)} calories</p>
              <p className="text-xs text-gray-500 mt-1">Calories your body needs at complete rest</p>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-600">Total Daily Energy Expenditure (TDEE)</p>
              <p className="text-2xl font-bold">{tdee.toFixed(0)} calories</p>
              <p className="text-xs text-gray-500 mt-1">Total calories burned in a day</p>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600">Daily Calorie Goal</p>
              <p className="text-2xl font-bold">{calorieGoal.toFixed(0)} calories</p>
              <p className="text-xs text-gray-500 mt-1">
                Based on your {userData.goal.replace('_', ' ')} goal
              </p>
            </div>
            
            <div className="mb-2 flex justify-between">
              <span>Todays Progress</span>
              <span>{consumedCalories} / {calorieGoal} cal</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div 
                className={`h-4 rounded-full ${
                  remainingCalories < 0 ? 'bg-red-500' : 'bg-green-500'
                }`}
                style={{ width: `${calorieProgressPercentage}%` }}
              ></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-gray-600">Consumed</p>
                <p className="text-xl font-bold">{consumedCalories} cal</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-gray-600">Remaining</p>
                <p className={`text-xl font-bold ${remainingCalories < 0 ? 'text-red-500' : ''}`}>
                  {remainingCalories} cal
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div>
                <p className="font-semibold">Protein</p>
                <p>{totalProtein}g / {recommendedProtein}g</p>
              </div>
              <div>
                <p className="font-semibold">Carbs</p>
                <p>{totalCarbs}g / {recommendedCarbs}g</p>
              </div>
              <div>
                <p className="font-semibold">Fat</p>
                <p>{totalFat}g / {recommendedFat}g</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Meals Distribution</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Breakfast</span>
                <span>{breakfastCalories} cal</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-400 h-2 rounded-full"
                  style={{ width: `${Math.min((breakfastCalories / calorieGoal) * 100, 100)}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Lunch</span>
                <span>{lunchCalories} cal</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-400 h-2 rounded-full"
                  style={{ width: `${Math.min((lunchCalories / calorieGoal) * 100, 100)}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Dinner</span>
                <span>{dinnerCalories} cal</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${Math.min((dinnerCalories / calorieGoal) * 100, 100)}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Snacks</span>
                <span>{snackCalories} cal</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-400 h-2 rounded-full"
                  style={{ width: `${Math.min((snackCalories / calorieGoal) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <div className="bg-green-100 p-3 rounded-lg flex items-center">
                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm">On track</span>
              </div>
              <div className="bg-red-100 p-3 rounded-lg flex items-center">
                <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm">Over limit</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column - Food log and entry */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex border-b mb-4">
              <button
                className={`pb-2 px-4 ${activeTab === 'daily' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
                onClick={() => setActiveTab('daily')}
              >
                Daily Log
              </button>
              <button
                className={`pb-2 px-4 ${activeTab === 'weekly' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
                onClick={() => setActiveTab('weekly')}
              >
                Weekly View
              </button>
              <button
                className={`pb-2 px-4 ${activeTab === 'foods' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
                onClick={() => setActiveTab('foods')}
              >
                Add Foods
              </button>
            </div>
            
            {activeTab === 'daily' && (
              <>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">Todays Food Log</h2>
                  <p className="text-gray-600 text-sm">{new Date().toLocaleDateString()}</p>
                </div>
                
                {Object.entries(mealGroups).map(([mealType, entries]) => (
                  <div key={mealType} className="mb-6">
                    <h3 className="font-medium capitalize mb-2">{mealType}</h3>
                    
                    {entries.length === 0 ? (
                      <p className="text-gray-500 text-sm italic">No entries yet</p>
                    ) : (
                      <div className="space-y-2">
                        {entries.map(entry => (
                          <div key={entry.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                            <div>
                              <p className="font-medium">{entry.name}</p>
                              <p className="text-sm text-gray-500">{entry.time}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="font-bold">{entry.calories} cal</p>
                                <p className="text-xs text-gray-500">
                                  P: {entry.protein}g | C: {entry.carbs}g | F: {entry.fat}g
                                </p>
                              </div>
                              <button 
                                onClick={() => removeFoodEntry(entry.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                <button 
                  onClick={() => setActiveTab('foods')}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Add Food
                </button>
              </>
            )}
            
            {activeTab === 'weekly' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Weekly Calorie Overview</h2>
                <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center h-64">
                  <div className="text-center">
                    <BarChart className="w-12 h-12 mx-auto mb-2 text-blue-500" />
                    <p>Weekly calorie chart visualization would appear here</p>
                    <p className="text-sm text-gray-500 mt-2">Tracking your progress over time</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Calorie Intake Trends</h3>
                    <p className="text-sm text-gray-600">
                      Average daily calories: <span className="font-bold">{calorieGoal}</span>
                    </p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Goal Progress</h3>
                    <p className="text-sm text-gray-600">
                      Days on track: <span className="font-bold">5/7</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'foods' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Add Food to Log</h2>
                
                {/* Search and quick add */}
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium">Quick Add Common Foods</label>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Search foods..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="p-2 border rounded-l flex-grow"
                    />
                    <select
                      name="mealType"
                      value={newFood.mealType}
                      onChange={handleInputChange}
                      className="p-2 border border-l-0 rounded-r w-32"
                    >
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="snack">Snack</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {filteredFoods.map((food, index) => (
                      <div 
                        key={index}
                        className="p-3 border rounded flex justify-between items-center cursor-pointer hover:bg-gray-50"
                        onClick={() => addFoodEntry({ ...food, mealType: newFood.mealType })}
                      >
                        <div>
                          <p className="font-medium">{food.name}</p>
                          <p className="text-xs text-gray-500">
                            P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                          </p>
                        </div>
                        <span className="font-bold">{food.calories} cal</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Custom food entry form */}
                <div>
                  <h3 className="font-medium mb-2">Custom Food Entry</h3>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label className="block text-sm mb-1">Food Name</label>
                      <input
                        type="text"
                        name="name"
                        value={newFood.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        placeholder="e.g., Grilled Chicken Salad"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div>
                        <label className="block text-sm mb-1">Calories</label>
                        <input
                          type="number"
                          name="calories"
                          value={newFood.calories}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                          placeholder="Cal"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Protein (g)</label>
                        <input
                          type="number"
                          name="protein"
                          value={newFood.protein}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                          placeholder="g"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Carbs (g)</label>
                        <input
                          type="number"
                          name="carbs"
                          value={newFood.carbs}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                          placeholder="g"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Fat (g)</label>
                        <input
                          type="number"
                          name="fat"
                          value={newFood.fat}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                          placeholder="g"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-1">Meal Type</label>
                      <select
                        name="mealType"
                        value={newFood.mealType}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      >
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="snack">Snack</option>
                      </select>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                    >
                      Add Food
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calories;