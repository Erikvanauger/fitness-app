import React, { createContext, useState, useContext, ReactNode } from "react";


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
  lastUpdated: string;
}

interface UserContextType {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  updateConsumedCalories: (calories: number) => void;
}

const defaultUserData: UserData = {
  name: "",
  age: "",
  weight: "",
  height: "",
  gender: "",
  goal: "",
  waterIntake: "",
  allergies: [],
  dailyCalories: 0,
  consumedCalories: 0,
  lastUpdated: ""
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(() => {
    // Check stored user data in localStorage
    if (typeof window !== 'undefined') {
      const savedUserData = localStorage.getItem('userData');
      if (savedUserData) {
        return JSON.parse(savedUserData);
      }
    }
    return defaultUserData;
  });

  // Function to update consumed calories
  const updateConsumedCalories = (calories: number) => {
    setUserData(prev => {
      const updated = {
        ...prev,
        consumedCalories: prev.consumedCalories + calories,
        lastUpdated: new Date().toISOString()
      };
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('userData', JSON.stringify(updated));
      }
      
      return updated;
    });
  };

  // Save data to localStorage whenever it changes
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData, updateConsumedCalories }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserProvider");
  }
  return context;
};