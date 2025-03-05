import React, {useEffect} from "react";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

function DashboardContent() {
  // Carousel settings
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1 }, // Visa en slide i taget
    duration: 1000, // Övergångstid
    autoplay: true, // Automatisk uppspelning
    interval: 3000, // Tid mellan bilder
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 1 }, // Flera vyer för mindre skärmar
      },
    },
  });

  // Automatisk scroll
  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 3000); // 3000ms = 3 sekunder
    return () => clearInterval(interval);
  }, [instanceRef]);


  return (
    <div className="grid grid-cols-4 grid-rows-8 gap-4 h-full p-4">
      {/* Top box */}
      <div className="col-span-4 row-span-1 bg-purple-400 flex items-center justify-between">
        <h2 className=" text-2xl">Good morning, Anton!</h2>
        <button className="bg-black mr-4 py-4 px-8 rounded-full text-white">
          Upgrade
        </button>
      </div>

      {/* Box 1 */}
      <div className="col-span-3 row-span-4 bg-blue-400 rounded-lg overflow-hidden">
        <div ref={sliderRef} className="keen-slider h-full w-full">
          <div className="keen-slider__slide relative w-full h-full">
            <Image
              src="/Food.jpg"
              alt="Slide 1"
              fill
              className="object-cover"
            />
          </div>
          <div className="keen-slider__slide relative w-full h-full">
            <Image
              src="/Mind.jpg"
              alt="Slide 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="keen-slider__slide relative w-full h-full">
            <Image
              src="/Yolk.jpg"
              alt="Slide 3"
              fill
              className="object-cover"
            />
          </div>
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
