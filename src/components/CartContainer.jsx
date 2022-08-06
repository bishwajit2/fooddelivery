import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { motion } from 'framer-motion';
import { RiRefreshFill } from "react-icons/ri"
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import EmptyCart from "../img/emptyCart.svg";
import {CartItem} from ".";

const CartContainer = () => {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0)

  const showCart = () => {
    dispatch({
        type: actionType.SET_CART_SHOW,
        cartShow: !cartShow,
    });
  }

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
  }, [tot, flag])


  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  return (
    <motion.div 
    initial={{opacity: 0, x:200}}
    animate={{opacity: 1, x:0}}
    exit={{opacity: 0, x:200}} 
    className='fixed right-0 top-0 w-full md:w-375 h-screen bg-white flex flex-col drop-shadow-md z-50'
    >
      {/* Top Section */}
      <div className='w-full flex items-center justify-between p-4 cursor-pointer'>
        <motion.div whileTap={{scale: 0.8}} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>

        <p className='text-textColor text-lg font-semibold'>Cart</p>
        <motion.p onClick={clearCart} whileTap={{scale: 0.75}} className="flex items-center gap-2 my-2 p-1 px-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base">
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      {/* bottom Section */}
      {cartItems && cartItems.length > 0 ? (
        <div className='w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col'>
        {/* Cart items section */}
        <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
          {/* Cart Item */}
          {cartItems && cartItems.map((item) => (
            <CartItem key={item.id} item={item} setFlag={setFlag} flag={flag} />
          ))}
          
        </div>

        {/* Cart total Section */}
        <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
          <div className="w-full flex items-center justify-between">
            <p className="text-gray-400 text-lg">Sub totla</p>
            <p className="text-gray-400 text-lg">$ {tot}</p>
          </div>
          <div className="w-full flex items-center justify-between">
            <p className="text-gray-400 text-lg">Delivery</p>
            <p className="text-gray-400 text-lg">$ 2.5</p>
          </div>
          <div className="w-full border-b border-gray-600 my-2"></div>
          <div className="w-full flex items-center justify-between">
            <p className="text-gray-200 font-semibold text-xl">Total</p>
            <p className="text-gray-200 font-semibold text-xl">$ {tot + 2.5}</p>
          </div>

          {user ? (
            <motion.button 
            whileTap={{scale: 0.8}}
            type="button"
            className="w-full p-2 rounded-full bg-yellow-600 text-gray-50 text-lg my-2 
            hover:shadow-lg"
          >
            Check out
          </motion.button>
          ) : (
            <motion.button 
            whileTap={{scale: 0.8}}
            type="button"
            className="w-full p-2 rounded-full bg-yellow-600 text-gray-50 text-lg my-2 
            hover:shadow-lg"
          >
            Login to Check out
          </motion.button>
          )}
        </div>
      </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} alt="empty cart" className="w-300" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your card
          </p>
        </div>
      )}
      
    </motion.div>
  )
}

export default CartContainer