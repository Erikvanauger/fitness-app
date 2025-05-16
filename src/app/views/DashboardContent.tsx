import React, { JSX, useEffect, useState } from "react";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import {
  ArrowRight,
  Sun,
  Fish,
  Beef,
  Flame,
  Drumstick,
  Salad,
  Timer,
  ChevronLeft,
  ChevronRight,
  Utensils,
} from "lucide-react";
import recipeData from "../data/recipes.json";
import CaloriesPreview from "../components/CaloriesPreview";
import WaterIntakePreview from "../components/WaterIntakePreview";
import ActivityPreview from "../components/ActivityPreview";
import { useUserData } from "../context/UserContext";

interface DashboardContentProps {
  setCurrentView: (view: string) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  setCurrentView,
}) => {
  const { userData } = useUserData();
  const userName = userData.name || "Friend";

  // Greet user based on time of dayy
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const slides = [
    {
      src: "/Food.jpg",
      alt: "Healthy Food",
      text: ["The trick to a", "Tasty", "Green", "Plate"],
      link: "recipes",
    },
    {
      src: "/Run.jpg",
      alt: "Running",
      text: ["Take your first step", "to an active", "LIFESTYLE"],
      link: "calories",
    },
    {
      src: "/Yolk.jpg",
      alt: "Egg Nutrition",
      text: ["5 secret powers", "in the", "YOLK"],
      link: "recipes",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
    dragSpeed: 0.5,
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 1 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const tagIcons: Record<string, JSX.Element> = {
    fish: (
      <Fish className="w-8 h-8 md:w-8 md:h-8 lg:w-12 lg:h-12 text-blue-500" />
    ),
    spicy: (
      <Flame className="w-8 h-8 md:w-8 md:h-8 lg:w-12 lg:h-12 text-red-500" />
    ),
    chicken: (
      <Drumstick className="w-8 h-8 md:w-8 md:h-8 lg:w-12 lg:h-12 text-yellow-500" />
    ),
    beef: (
      <Beef className="w-8 h-8 md:w-8 md:h-8 lg:w-12 lg:h-12 text-red-400" />
    ),
    salad: (
      <Salad className="w-8 h-8 md:w-8 md:h-8 lg:w-12 lg:h-12 text-green-500" />
    ),
  };

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 4000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  // Today's recipe based on date
  const todayIndex = new Date().getDate() % recipeData.length;
  const todaysRecipe = recipeData[todayIndex];

  // Get current date formatted for display
  const formattedDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    return new Date().toLocaleDateString("en-US", options);
  };

  //kommentera ut om inte det funkar med tom användare

  // Handle calories click based on user data
  const handleCaloriesClick = () => {
    if (!userData.dailyCalories) {
      setCurrentView("user"); // Navigate to user profile if no data
    } else {
      setCurrentView("calories"); // Otherwise go to calories tracker
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-full px-4">
      {/* Top box */}
      <div className="col-span-1 md:col-span-4 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 md:mb-0">
        <div>
          <h2 className="flex text-2xl md:text-4xl font-bold">
            {getGreeting()}, {userName}!
            <Sun className="ml-2 text-yellow-500" />
          </h2>
          <p className="text-gray-600 text-sm">{formattedDate()}</p>
        </div>
        <button className="bg-black mr-2 md:mr-4 py-2 md:py-4 px-4 md:px-8 rounded-full text-white text-sm md:text-base mt-2 sm:mt-0">
          Upgrade Pro
        </button>
      </div>

      {/* Main content area */}
      <div className="col-span-1 md:col-span-3 space-y-4">
        {/* Box 1 - Feature slider */}
        <div className="rounded-lg overflow-hidden relative flex cursor-pointer h-64 md:h-96 shadow-md">
          <div className="w-full md:w-3/5 bg-gradient-to-r from-black to-transparent text-white flex justify-start items-center p-4 absolute left-0 top-0 bottom-0 z-10">
            <h3 className="text-3xl md:text-5xl font-semibold pl-2 md:pl-4">
              {slides[currentSlide].text.map((line, index) => (
                <div key={index}>
                  {line === "Green" ? (
                    <span className="text-green-500 text-4xl md:text-7xl">
                      {line}
                    </span>
                  ) : line === "YOLK" ? (
                    <span className="text-yellow-300 text-5xl md:text-8xl">
                      {line}
                    </span>
                  ) : line === "LIFESTYLE" ? (
                    <span className="text-blue-400 text-5xl md:text-8xl">
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </div>
              ))}
              <button
                onClick={() => setCurrentView(slides[currentSlide].link)}
                className="bg-white text-black rounded-full px-4 py-2 text-base mt-4 hover:bg-gray-200 flex items-center font-normal"
              >
                Learn more <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </h3>
          </div>

          <div
            ref={sliderRef}
            className="keen-slider h-full w-full flex-1 relative"
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="keen-slider__slide relative w-full h-full"
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {loaded && instanceRef.current && (
            <div className="absolute bottom-4 right-4 flex space-x-2 z-20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  instanceRef.current?.prev();
                }}
                className="bg-white bg-opacity-50 hover:bg-opacity-70 rounded-full p-1 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  instanceRef.current?.next();
                }}
                className="bg-white bg-opacity-50 hover:bg-opacity-70 rounded-full p-1 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Box 3 - Activity tracker */}
          <ActivityPreview setCurrentView={setCurrentView} />
          {/* Box 4 - Calories preview */}
          <div
            className="rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={handleCaloriesClick}
          >
            <CaloriesPreview />
          </div>

          {/* Box 5 - Water tracker */}
          <WaterIntakePreview setCurrentView={setCurrentView} />
        </div>
      </div>

      {/* Box 2 - Today's recipe (sidebar) */}
      <div className="col-span-1 bg-white rounded-lg flex flex-col h-full mt-4 md:mt-0 shadow-md">
        <div className="bg-black w-full rounded-t-lg">
          <h2 className="text-lg md:text-xl text-white font-bold text-center py-2 flex items-center justify-center">
            <Utensils className="mr-2" /> Todays Recipe
          </h2>
        </div>

        <div className="px-3 md:px-4 py-2 flex-grow flex flex-col overflow-hidden">
          <h3 className="text-2xl md:text-2xl lg:text-3xl font-bold text-center">
            {todaysRecipe.title}
          </h3>

          <div className="relative group mt-2">
            <Image
              src={todaysRecipe.image}
              alt={todaysRecipe.title}
              width={280}
              height={180}
              className="w-full object-cover rounded-lg h-40 md:h-44"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all flex items-center justify-center">
              <button
                onClick={() => setCurrentView("recipes")}
                className="bg-white text-black px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium"
              >
                View Recipe
              </button>
            </div>
          </div>

          <div className="mt-3 text-sm line-clamp-3">
            {todaysRecipe.description}
          </div>

          <div className="flex justify-center gap-2 mt-3">
            {(todaysRecipe.smallboxes || []).map((box, index) => (
              <div
                key={index}
                className="flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold text-white bg-gray-700"
              >
                {box.includes("cal") ? (
                  <Flame className="w-3 h-3 text-red-500" />
                ) : (
                  <Timer className="w-3 h-3 text-blue-500" />
                )}
                {box}
              </div>
            ))}
          </div>

          <div className="flex gap-2 my-3 justify-center">
            {todaysRecipe.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-gray-100 p-2 rounded-2xl shadow border border-gray-400"
              >
                {tagIcons[tag] || null}
              </span>
            ))}
          </div>

          <div className="mt-4 bg-gray-100 p-3 rounded-lg">
            <h4 className="font-medium text-sm mb-1">Main ingredients:</h4>
            <ul className="text-xs text-gray-700 pl-2">
              {todaysRecipe.ingredients.slice(0, 3).map((ingredient, index) => (
                <li key={index} className="mb-1">
                  • {ingredient}
                </li>
              ))}
              <li className="text-blue-500">
                + {todaysRecipe.ingredients.length - 3} more
              </li>
            </ul>
          </div>
        </div>

        <button
          onClick={() => setCurrentView("recipes")}
          className="bg-black text-white p-3 rounded-b-lg flex items-center justify-center mt-auto text-sm"
        >
          See All Recipes <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DashboardContent;
