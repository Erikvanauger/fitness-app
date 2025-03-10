
import React, {useState} from "react";
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
  recipes: Recipe[];
  initialRecipeId: number;
  onBack: () => void;
}

const Recipes: React.FC<RecipesProps> = ({ recipes, initialRecipeId, onBack }) => {
  // Hitta index för det valda receptet
  const initialIndex = recipes.findIndex(recipe => recipe.id === initialRecipeId);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % recipes.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + recipes.length) % recipes.length);
  };

  const currentRecipe = recipes[currentIndex];

  return (
    <div className="flex flex-col items-center">
      <button onClick={onBack} className="mb-4 bg-gray-300 px-4 py-2 rounded self-start">
        Back to Dashboard
      </button>
      <h2 className="text-center">{currentRecipe.title}</h2>
      <Image src={currentRecipe.image} alt={currentRecipe.title} width={500} height={300} />
      <p className="text-center">{currentRecipe.description}</p>
      <p>{currentRecipe.ingredients}</p>
      <p>{currentRecipe.steps}</p>

      <div className="flex justify-center mt-4">
        <button onClick={handlePrev} className="bg-gray-300 px-4 py-2 rounded mx-2">
          Previous
        </button>
        <button onClick={handleNext} className="bg-gray-300 px-4 py-2 rounded mx-2">
          Next
        </button>
      </div>
    </div>
  );
};
export default Recipes;
