// src/app/context/UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MealEntry {
  id: number;
  name: string;
  calories: number;
}

interface WaterEntry {
  id: number;
  amount: number;
  time: string;
}

interface UserData {
  name: string;
  age: string;
  weight: string;
  height: string;
  gender: string;
  goal: string;
  waterIntake: string;
  allergies: string[];
  dailyCalories: number;
  consumedCalories: number;
  currentWaterIntake: number;
  lastUpdated?: string;
  dailySteps:number;
  stepGoal:number;
  todaysMeals: MealEntry[];
  todaysWaterLog: WaterEntry[];
}

interface UserContextType {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  updateConsumedCalories: (calories: number) => void;
  addMeal: (meal: MealEntry) => void;
  addWaterEntry: (entry: WaterEntry) => void;
  removeWaterEntry: (id: number) => void;
  resetCalories: () => void;
  resetWater: () => void;
}

const defaultUserData: UserData = {
  name: '',
  age: '',
  weight: '',
  height: '',
  gender: '',
  goal: '',
  waterIntake: '',
  allergies: [],
  dailyCalories: 0,
  consumedCalories: 0,
  currentWaterIntake: 0,
  todaysMeals: [],
  todaysWaterLog: [],
  dailySteps:0,
  stepGoal:0,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>(defaultUserData);

  const updateConsumedCalories = (calories: number) => {
    setUserData(prev => ({
      ...prev,
      consumedCalories: Math.max(0, prev.consumedCalories + calories)
    }));
  };

  const addMeal = (meal: MealEntry) => {
    setUserData(prev => ({
      ...prev,
      todaysMeals: [...prev.todaysMeals, meal],
      consumedCalories: prev.consumedCalories + meal.calories
    }));
  };

  const addWaterEntry = (entry: WaterEntry) => {
    setUserData(prev => ({
      ...prev,
      todaysWaterLog: [...prev.todaysWaterLog, entry],
      currentWaterIntake: prev.currentWaterIntake + entry.amount
    }));
  };

  const removeWaterEntry = (id: number) => {
    setUserData(prev => {
      const entry = prev.todaysWaterLog.find(log => log.id === id);
      if (!entry) return prev;
      
      return {
        ...prev,
        todaysWaterLog: prev.todaysWaterLog.filter(log => log.id !== id),
        currentWaterIntake: Math.max(0, prev.currentWaterIntake - entry.amount)
      };
    });
  };

  const resetCalories = () => {
    setUserData(prev => ({
      ...prev,
      consumedCalories: 0,
      todaysMeals: []
    }));
  };

  const resetWater = () => {
    setUserData(prev => ({
      ...prev,
      currentWaterIntake: 0,
      todaysWaterLog: []
    }));
  };

  return (
    <UserContext.Provider value={{
      userData,
      setUserData,
      updateConsumedCalories,
      addMeal,
      addWaterEntry,
      removeWaterEntry,
      resetCalories,
      resetWater,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserProvider');
  }
  return context;
}