import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

function DashboardContent() {
  const slides = [
    {
      src: "/Food.jpg",
      alt: "Slide 1",
      text: [
        "The trick to a",
        "Tasty",
        "Green",
        "Plate",
      ],
    },
    {
      src: "/Run.jpg",
      alt: "Slide 2",
      text: [
        "Take your first step",
        "to an active",
        "LIFESTYLE",
      ],
    },
    {
      src: "/Yolk.jpg",
      alt: "Slide 3",
      text: [
        "5 secret powers",
        "in the",
        "YOLK",
      ],
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

  return (
    <div className="grid grid-cols-4 grid-rows-8 gap-4 h-full p-4">
      {/* Top box */}
      <div className="col-span-4 row-span-1 bg-purple-400 flex items-center justify-between">
        <h2 className="text-2xl">Good morning, Anton!</h2>
        <button className="bg-black mr-4 py-4 px-8 rounded-full text-white">
          Upgrade
        </button>
      </div>

      {/* Box 1 */}
      <div className="col-span-3 row-span-4 bg-blue-400 rounded-lg overflow-hidden relative flex cursor-pointer">
        <div className="w-2/5 bg-gradient-to-r from-black to-transparent text-white flex justify-center items-center p-4 absolute left-0 top-0 bottom-0 z-10">
          <h3 className="text-5xl font-semibold pl-8 ">
            {slides[currentSlide].text.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
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
      </div>

      {/* Box 2 */}
      <div className="col-span-1 row-span-7 bg-red-400 rounded-lg">Box 2</div>

      {/* Box 3, 4, 5 */}
      <div className="bg-green-400 rounded-lg row-span-3">Box 3</div>
      <div className="bg-yellow-400 rounded-lg row-span-3">Box 4</div>
      <div className="bg-purple-400 rounded-lg row-span-3">Box 5</div>
    </div>
  );
}

export default DashboardContent;
