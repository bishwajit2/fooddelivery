import React, { useEffect, useState } from "react";
import { HomeContainer } from ".";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { RowContainer, MenuContainer, CartContainer } from "."
import { useStateValue } from "../context/StateProvider";


const MainContainer = () => {
  const [{foodItems, cartShow}, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0)
  
  useEffect(() => {}, [scrollValue, cartShow])
  

  return (
  <div className="w-full h-auto flex flex-col items-center justify-center">
    <HomeContainer />

    <section className="w-full my-6">
      <div className="w-full flex items-center justify-between">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:left-0 before:bottom-0 before:w-32 pb-4 before:h-1 before:content before:bg-gradient-to-tr from-orange-400 to-orange-600">Our fresh & healthy fruits</p>
        <div className="hidden md:flex gap-3 items-center">
          <motion.div
            onClick={() => {setScrollValue(-200)}}
            whileTap={{scale: 0.75}} 
            className="w-8 h-8 flex items-center justify-center bg-orange-300 hover:bg-orange-500 cursor-pointer hover:shadow-lg rounded-md"
          >
            <MdChevronLeft className="text-white text-lg" />
          </motion.div>

          <motion.div
            onClick={() => {setScrollValue(200)}}
            whileTap={{scale: 0.75}} 
            className="w-8 h-8 flex items-center justify-center bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg rounded-md"
          >
            <MdChevronRight className="text-white text-lg" />
          </motion.div>
        </div>
      </div>

      {/* RowContainer for fruits division */}
      <RowContainer 
        scrollValue={scrollValue} 
        flag={true} 
        data={foodItems?.filter((n) => n.category === "fruits")} 
      />

    </section>

    <MenuContainer />
    {cartShow && (
      <CartContainer />
    )}
  </div>

  )
};

export default MainContainer;
