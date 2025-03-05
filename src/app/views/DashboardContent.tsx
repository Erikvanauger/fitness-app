import React from 'react'
import Slider from 'react-slick'

function DashboardContent() {
  
   // Carousel settings
   const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  
  
  return (
    <div className="grid grid-cols-4 grid-rows-8 gap-4 h-full p-4">
      
      {/* Top box */}
      <div className='col-span-4 row-span-1 bg-purple-400 flex items-center justify-between'>
        <h2 className=' text-2xl'>Good morning, Anton!</h2>
        <button className='bg-black mr-4 py-4 px-8 rounded-full text-white'>Upgrade</button>
      </div>
      
      {/* Box 1 */}
      <div className="col-span-3 row-span-4 bg-blue-400 rounded-lg">
      <Slider {...settings}>
          <div>
            <h3>Slide 1</h3>
            <p>Innehåll för bild 1</p>
          </div>
          <div>
            <h3>Slide 2</h3>
            <p>Innehåll för bild 2</p>
          </div>
          <div>
            <h3>Slide 3</h3>
            <p>Innehåll för bild 3</p>
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
  )
}

export default DashboardContent
