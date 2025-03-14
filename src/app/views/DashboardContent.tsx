import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ArrowRight, Star, MessageSquareHeart, Sun } from "lucide-react";
import recipeData from "../data/recipes.json";


function DashboardContent() {
  
  const slides = [
    {
      src: "/Food.jpg",
      alt: "Slide 1",
      text: ["The trick to a", "Tasty", "Green", "Plate"],
    },
    {
      src: "/Run.jpg",
      alt: "Slide 2",
      text: ["Take your first step", "to an active", "LIFESTYLE"],
    },
    {
      src: "/Yolk.jpg",
      alt: "Slide 3",
      text: ["5 secret powers", "in the", "YOLK"],
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

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
  });

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 4000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  // New recipe per day
  const todayIndex = new Date().getDate() % recipeData.length;
  const todaysRecipe = recipeData[todayIndex];

  
  const renderContent = () => {
    return (
      <div className="grid grid-cols-4 grid-rows-8 gap-4 h-full px-4">
        {/* Top box */}
        <div className="col-span-4 row-span-1 flex items-center justify-between">
          <h2 className="flex text-4xl font-bebas ">
            Good morning, Anton!
            <Sun className="ml-2 text-yellow-500" />
          </h2>
          <button className="bg-black mr-4 py-4 px-8 rounded-full text-white">
            Upgrade
          </button>
        </div>

        {/* Box 1 */}
        <div className="col-span-3 row-span-4 rounded-lg overflow-hidden relative flex cursor-pointer">
          <div className="w-3/5 bg-gradient-to-r from-black to-transparent text-white flex justify-start items-center p-4 absolute left-0 top-0 bottom-0 z-10">
            <h3 className="text-5xl font-semibold pl-4 ">
              {slides[currentSlide].text.map((line, index) => (
                <div key={index}>
                  {line === "Green" ? (
                    <span className="text-green-500 text-[70px]">{line}</span>
                  ) : line === "YOLK" ? (
                    <span className="text-yellow-300 text-[80px]">{line}</span>
                  ) : (
                    line
                  )}
                </div>
              ))}
            </h3>
          </div>

          <div ref={sliderRef} className="keen-slider h-full w-full flex-1 relative">
            {slides.map((slide, index) => (
              <div key={index} className="keen-slider__slide relative w-full h-full">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Box 2 */}
        <div className="col-span-1 row-span-7 bg-red-400 rounded-lg px-4 py-2 flex flex-col">
          <h2 className="text-xl font-bold text-center">Todays Recipe</h2>
          <div className="mb-4 flex-grow">
            <h3 className="text-[2rem] font-medium lilita-one-regular">
              {todaysRecipe.title}
            </h3>
            <div className="flex justify-center items-center">
              <Image
                src={todaysRecipe.image}
                alt={todaysRecipe.title}
                width={320}
                height={200}
                className="object-cover rounded-lg "
              />
            </div>
            <p className="my-4">{todaysRecipe.description}</p>

            <div className="flex justify-center gap-2 mt-2">
              {(todaysRecipe.smallboxes || []).map((box, index) => (
                <div
                  key={index}
                  className={`px-3 py-1 rounded-md text-sm font-semibold text-white ${
                    box.includes("cal") ? "bg-blue-500" : "bg-green-500"
                  }`}
                >
                  {box}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Box 3 */}
        <div className="bg-white rounded-lg row-span-3 p-4 flex flex-col gap-y-4">
          {/* Review-stars */}
          <div className="flex gap-2 ">
            {[...Array(4)].map((_, i) => (
              <Star key={i} className="text-yellow-500 fill-yellow-500 w-8 h-8" />
            ))}
            <Star className="text-gray-300 w-8 h-8" />
          </div>

          <div className="bg-blue-400 rounded-full px-4 py-2 border-2 border-black">
            <h4 className="text-xl font-bold ">Try our new Running Tracker!</h4>
          </div>
          <p className="text-sm mt-2">
            Track your runs, set goals, and analyze your progress with ease.{" "}
            <br /> Stay motivated and improve your performance every day!
          </p>

          <div className="flex justify-between items-center mt-auto">
            <p className="text-xs text-gray-400 flex">
              <MessageSquareHeart className="w-5 h-5 mr-1" />
              5000+ reviews
            </p>
            <button className="bg-black text-white py-2 px-4 rounded-full flex items-center self-end mt-auto">
              More <ArrowRight className="ml-2 w-8 h-4" />
            </button>
          </div>
        </div>

        {/* Box 4 */}
        <div className="bg-yellow-400 rounded-lg row-span-3">Box 4</div>

        {/* Box 5 */}
        <div className="bg-purple-400 rounded-lg row-span-3">Box 5</div>
      </div>
    );
  };

  return renderContent();
}

export default DashboardContent;