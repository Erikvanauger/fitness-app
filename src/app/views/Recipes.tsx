import React, { JSX } from "react";
import recipesData from "../data/recipes.json"; 
import Image from "next/image";
import {Fish, Beef, Flame, Drumstick, Salad} from "lucide-react"

const tagIcons: Record<string, JSX.Element> = {
  fish: <Fish className="w-12 h-12 text-blue-500" />,
  spicy: <Flame className="w-12 h-12 text-red-500" />,
  chicken: <Drumstick className="w-12 h-12 text-yellow-500" />,
  salad: <Salad className="w-12 h-12 text-green-500" />,
  beef: <Beef className="w-12 h-12 text-red-400" />
};


function Recipes() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipesData.map((recipe) => (
          <div key={recipe.id} className="border p-4 rounded-lg shadow-md">
            <Image
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 object-cover rounded-md mb-2"
              width={300}
              height={200}
            />
            <h2 className="text-xl font-semibold">{recipe.title}</h2>
            <p className="text-gray-600">{recipe.description}</p>
            <div className="mt-2 flex gap-2">
              {recipe.tags.map((tag, index) => (
                 <span key={index} className="p-2 bg-gray-200 rounded-md flex items-center justify-center">
                 {tagIcons[tag] || <span className="text-xs">{tag}</span>}
               </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recipes;
