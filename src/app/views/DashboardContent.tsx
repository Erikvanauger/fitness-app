import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function DashboardContent() {
  // Carousel settings
  const settings = {
    // Visa punkter för navigation
    infinite: true, // Oändlig loop
    speed: 500, // Hastighet för övergång
    autoplay: true, // Automatisk uppspelning
    autoplaySpeed: 3000, // Tid mellan övergångar
    slidesToShow: 1, // Antal slides som visas
    slidesToScroll: 1, // Antal slides som scrollas vid navigering
  };

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
        <Slider {...settings} className="w-full h-full">
          <div className="w-full h-full">
            <img
              src="/Food.jpg"
              alt="Slide 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full h-full">
            <img
              src="/Mind.jpg"
              alt="Slide 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full h-full">
            <img
              src="/Yolk.jpg"
              alt="Slide 3"
              className="w-full h-full object-cover"
            />
          </div>
        </Slider>
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
