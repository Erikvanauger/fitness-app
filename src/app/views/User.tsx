import React, { useState } from "react";

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

const allergiesList = ["Gluten", "Laktose", "Nutts", "Seafood", "Eggs"];

function User() {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    age: "",
    weight: "",
    height: "",
    gender: "",
    goal: "",
    waterIntake: "",
    allergies: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAllergyChange = (allergy: string) => {
    setUserData((prev) => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter((a) => a !== allergy)
        : [...prev.allergies, allergy],
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("User Data:", userData);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={userData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={userData.age}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={userData.weight}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="height"
          placeholder="Length (cm)"
          value={userData.height}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <select
          name="gender"
          value={userData.gender}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Choose gender</option>
          <option value="male">Man</option>
          <option value="female">Woman</option>
        </select>

        <select
          name="goal"
          value={userData.goal}
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
          value={userData.waterIntake}
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
                  userData.allergies.includes(allergy) ? "bg-blue-200" : "bg-gray-100"
                }`}
              >
                <input
                  type="checkbox"
                  checked={userData.allergies.includes(allergy)}
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
