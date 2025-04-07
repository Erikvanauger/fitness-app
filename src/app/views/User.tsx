import React, { useState } from "react";
import { useUserData } from "../context/UserContext";

const allergiesList = ["Gluten", "Laktose", "Nutts", "Seafood", "Eggs"];

function User() {
  const { userData, setUserData } = useUserData();
  const [formData, setFormData] = useState({
    name: userData.name || "",
    age: userData.age || "",
    weight: userData.weight || "",
    height: userData.height || "",
    gender: userData.gender || "",
    goal: userData.goal || "",
    waterIntake: userData.waterIntake || "",
    allergies: userData.allergies || [],
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAllergyChange = (allergy: string) => {
    setFormData((prev) => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter((a) => a !== allergy)
        : [...prev.allergies, allergy],
    }));
  };

  // Calculate daily calories based on user data
  const calculateDailyCalories = () => {
    if (!formData.weight || !formData.height || !formData.age || !formData.gender) {
      return 0;
    }

    // Mifflin-St Jeor Equation for BMR calculation
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    const age = parseFloat(formData.age);
    let bmr = 0;

    if (formData.gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Adjust based on activity level (using 1.375 as moderate activity)
    let tdee = bmr * 1.375;

    // Adjust based on goal
    switch (formData.goal) {
      case "weight_loss":
        tdee -= 500; // for weight loss
        break;
      case "muscle_gain":
        tdee += 300; // muscle gain
        break;
      default:
        break;
    }

    return Math.round(tdee);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Calculate daily calories
    const dailyCalories = calculateDailyCalories();
    
    // Update context with form data + calculated calories
    setUserData({
      ...userData,
      ...formData,
      dailyCalories,
      lastUpdated: new Date().toISOString()
    });
    
    // Show saved message
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Your Profile</h2>
      {saved && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Profile saved successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={formData.weight}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="height"
          placeholder="Length (cm)"
          value={formData.height}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Choose gender</option>
          <option value="male">Man</option>
          <option value="female">Woman</option>
        </select>

        <select
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Goal</option>
          <option value="weight_loss">Lose weight</option>
          <option value="muscle_gain">Build muscles</option>
          <option value="maintenance">Keep weight</option>
        </select>

        <input
          type="number"
          name="waterIntake"
          placeholder="Daily water consumption (liter)"
          value={formData.waterIntake}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <div>
          <p className="font-semibold mb-2">Allergies:</p>
          <div className="grid grid-cols-2 gap-2">
            {allergiesList.map((allergy) => (
              <label
                key={allergy}
                className={`flex items-center gap-2 p-2 border rounded cursor-pointer ${
                  formData.allergies.includes(allergy) ? "bg-blue-200" : "bg-gray-100"
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.allergies.includes(allergy)}
                  onChange={() => handleAllergyChange(allergy)}
                  className="hidden"
                />
                {allergy}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default User;