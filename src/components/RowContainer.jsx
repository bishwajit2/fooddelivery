import React, { useEffect, useRef, useState } from 'react';
import {MdShoppingBasket} from "react-icons/md"
import { motion } from 'framer-motion';
import NotFound from "../img/NotFound.svg";
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const RowContainer = ({flag, data, scrollValue}) => {
  const rowContainer = useRef();

  const [items, setItems] = useState([]);

  const [{cartItems}, dispatch] = useStateValue();

  const addToCart = () => {
    dispatch({
      type : actionType.SET_CARTITEMS,
      cartItems : items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  }

  useEffect(() => {
    addToCart();
  }, [items]);
  
  
  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;  
  }, [scrollValue]);
  
  return (
    <div ref={rowContainer} className={`w-full flex items-center justify-center my-12 scroll-smooth gap-3 scrollbar-none ${flag ? 'overflow-x-scroll' : 'overflow-x-hidden flex-wrap'}`}>
      {data && data.length > 0 ? data.map((item) => (
        <div key={item?.id} className="min-w-[300px] min-h-[250px] md:min-w-[340px] h-auto my-12 backdrop-blur-lg bg-cardOverlay rounded-lg p-2 drop-shadow-lg flex flex-col items-end justify-between">
        <div className='w-full flex items-center justify-between'>
          <motion.div whileHover={{scale: 1.2}} className='w-32 -mt-8'>
            <img
              src={item?.imageURL}
              alt=""
              className="w-full h-full bg-cover"
            />
          </motion.div>
          <motion.div whileTap={{scale: 0.75}} className='w-8 h-8 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:shadow-md' onClick={() => setItems([...cartItems, item])}>
            <MdShoppingBasket className='text-white' />
          </motion.div>
        </div>

        <div className='w-full flex flex-col items-end justify-end'>
          <p className='text-textColor font-semibold text-base'>{item?.title}</p>
          <p className='mt-1 text-sm text-gray-500'>{`${item?.calories} Calories`}</p>
          <div className='flex items-center gap-8'>
            <p className='text-lg text-headingColor font-semibold'>
              <span className='text-sm text-red-500'>$</span> {item?.price}
            </p>
          </div>
        </div>
      </div>
      ))
        : (
          <div className="w-[40%] flex flex-col items-center justify-center">
            <img src={NotFound} alt="" />
            <h2 className='font-semibold my-4 text-xl text-headingColor'>Item not available</h2>
          </div>
        )
      }
    </div>
  )
}

export default RowContainer