
import React from "react";
import Image from "next/image";

interface Recipe {
  id: number;
  title: string;
  image: string;
  description: string;
  tags: string[];
  smallboxes?: string[];
  link: string;
  ingredients: string[];
  steps: string[];
  nutrition: string[];
}

interface RecipesProps {
  recipe: Recipe;
  onBack: () => void;
}

const Recipes: React.FC<RecipesProps> = ({ recipe, onBack }) => {
  return (
    <div>
      <button onClick={onBack} className="mb-4 bg-gray-300 px-4 py-2 rounded">
        Back to Dashboard
      </button>
      <h2>{recipe.title}</h2>
      <Image src={recipe.image} alt={recipe.title} width={500} height={300} />
      <p>{recipe.description}</p>
      
    </div>
  );
};

export default Recipes;
