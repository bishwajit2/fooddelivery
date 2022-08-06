import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { app } from "../firebase.config";
import Avatar from "../img/avatar.png";
import Logo from "../img/logo.png";

import { MdAdd, MdLogout, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

  const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{user, cartShow, cartItems}, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false)
  
  const login = async () => {
    if(!user) {
      const {user : {refreshToken, providerData}} = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
    });
    localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  }

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null
    })
  }

  const showCart = () => {
    dispatch({
        type: actionType.SET_CART_SHOW,
        cartShow: !cartShow,
    });
  }
  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
      {/* Desktop & tablet */}
      <div className="hidden md:flex w-full items-center justify-between">

        {/* Logo */}
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-10 object-cover" alt="Logo" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>

        {/* Menu Items */}
        <div className="flex items-center gap-8">
          <motion.ul 
            initial={{opacity: 0, x: 200}} 
            animate={{opacity: 1, x: 0}} 
            exit={{opacity: 0, x: 200}} 
            className="flex items-center gap-8"
          >
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              About Us
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Services
            </li>
          </motion.ul>

          {/* Shopping Cart */}
          <div className="relative flex items-center justify-center" onClick={showCart}>
            <MdShoppingCart className="text-textColor text-2xl cursor-pointer" />
            {/* Cart items length */}
            {cartItems && cartItems.length > 0 && (
              <div className="w-6 h-6 rounded-full bg-cartNumBg flex items-center justify-center absolute -right-4 -top-4">
              <p className="text-xs text-white font-semibold">{cartItems.length}</p>
            </div>
            )}

          </div>

          {/* User Profile */}
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="userprofile"
              onClick={login}
            />
            {isMenu && 
              (<motion.div 
              initial={{opacity: 0, scale: 0.6}} 
              animate={{opacity: 1, scale: 1}} 
              exit={{opacity: 0, scale: 0.6}} 
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 py-2">
              {user && user.email === "bishwajitdebnath9049.bd@gmail.com" && (
                <Link to={"/createItem"}>
                  <p className="flex item-center justify-between px-4 py-2 cursor-pointer text-textColor text-base hover:bg-slate-100 transition-all duration-100 ease-in-out" onClick={() => setIsMenu(false)}>New Item <MdAdd /></p>
                </Link>
              )}
              <p className="flex item-center justify-between px-4 py-2 cursor-pointer text-textColor text-base hover:bg-slate-100 transition-all duration-100 ease-in-out" onClick={logout}>Logout <MdLogout /></p>
            </motion.div>)}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="flex items-center justify-between md:hidden p-4 w-full">
        {/* Shopping Cart */}
        <div className="relative flex items-center justify-end" onClick={showCart}>
          <MdShoppingCart className="text-textColor text-2xl cursor-pointer" />
          {cartItems && cartItems.length > 0 && (
              <div className="w-6 h-6 rounded-full bg-cartNumBg flex items-center justify-center absolute -right-4 -top-4">
              <p className="text-xs text-white font-semibold">{cartItems.length}</p>
            </div>
            )}
        </div>
        
        {/* Logo */}
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-10 object-cover" alt="Logo" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>

        {/* User Profile */}
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            alt="userprofile"
            onClick={login}
          />
          {isMenu && 
            (<motion.div 
            initial={{opacity: 0, scale: 0.6}} 
            animate={{opacity: 1, scale: 1}} 
            exit={{opacity: 0, scale: 0.6}} 
            className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0">
            {user && user.email === "bishwajitdebnath9049.bd@gmail.com" && (
              <Link to={"/createItem"}>
                <p className="flex item-center justify-between px-4 py-2 cursor-pointer text-textColor text-base hover:bg-slate-100 transition-all duration-100 ease-in-out" onClick={() => setIsMenu(false)}>New Item <MdAdd /></p>
              </Link>
            )}
            <ul className="flex flex-col">
              <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer  px-4 py-2 hover:bg-slate-100" onClick={() => setIsMenu(false)}>
                Home
              </li>
              <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer  px-4 py-2 hover:bg-slate-100" onClick={() => setIsMenu(false)}>
                Menu
              </li>
              <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer  px-4 py-2 hover:bg-slate-100" onClick={() => setIsMenu(false)}>
                About Us
              </li>
              <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer  px-4 py-2 hover:bg-slate-100" onClick={() => setIsMenu(false)}>
                Services
              </li>
            </ul>

            <p className="flex m-4 rounded-md shadow-md gap-4 items-center justify-center px-4 py-2 bg-slate-200 cursor-pointer text-textColor text-base hover:bg-slate-300 transition-all duration-100 ease-in-out" onClick={logout}>Logout <MdLogout /></p>
          </motion.div>)}
        </div>
      </div>
    </header>
  );
};

export default Header;
