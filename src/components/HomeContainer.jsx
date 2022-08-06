import React from 'react';
import Delivery from '../img/delivery.png';
import HeroBg from '../img/heroBg.png'
import { heroData } from '../util/data';

const HomeContainer = () => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full' id='home'>
      <div className="py-2 flex-1 flex flex-col items-center md:items-start justify-center gap-6">

        {/* Bike Delivery button */}
        <div className="flex items-center justify-center gap-2 bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">Bike Delivery</p>
          <div className="w-8 h-8 rounded-full overflow-hidden drop-shadow-xl">
            <img className="w-full h-full object-contain bg-white" src={Delivery} alt="delivery" />
          </div>
        </div>

        {/* Heading text */}
        <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">The fastest delivery in <span className="text-orange-600 text-[3rem] lg:text-[5rem]">your city</span></p>

        {/* Description Text */}
        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure animi recusandae labore reprehenderit aperiam vitae, asperiores illo libero molestias maiores nisi nobis eveniet natus? Facilis quam maiores quos unde distinctio.</p>

        {/* Order now button */}
        <button type="button" className="text-white px-4 py-2 bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto rounded-lg hover:shadow-lg">Order Now</button>
      </div>

      {/* Right side */}
      <div className="py-2 flex-1 flex items-center relative">
        <img src={HeroBg} className="ml-auto h-420 w-full lg:w-auto lg:h-650" alt="Hero-BG" />
        
        {/* Hero data container */}
        <div className='gap-2 w-full h-full absolute flex flex-wrap items-center justify-center left-0 top-0 lg:px-24 py-4'>

          {heroData && heroData.map(n => (
            <div key={n.id}
            className='
              lg:w-190 
              p-4 
              bg-cardOverlay 
              backdrop-blur-md 
              rounded-3xl 
              flex 
              items-center 
              justify-center 
              flex-col 
              drop-shadow-lg
              m-2
            '>
            <img 
              src={n.imageSrc} 
              className="w-20 lg:w-40 -mt-10 lg:-mt-16" 
              alt="Ice-cream" 
            />

            <p className='text-base lg:text-lg mt-4 font-semibold text-textColor'>
              {n.name}
            </p>

            <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold mb-3">{n.decp}</p>

            <p className="text-sm font-semibold text-headingColor"><span className="text-xs text-red-600">$</span> {n.price}</p>
          </div>
          ))}

        </div>
      </div>
    </section>
  )
}

export default HomeContainer