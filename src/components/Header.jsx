import { AnimatePresence, motion as Motion } from "framer-motion";
import { Search, Home, Shirt, Laptop, Briefcase, Footprints, ShoppingBasket, HeartPulse, LogOut, Gem, ShoppingBag, MapPin, Heart, ShoppingCart, User, ChevronDown, LayoutGrid, Headphones, Menu, X, Eye, EyeOff } from "lucide-react";
import useHeaderHooks from "../hooks/useHeaderHooks";
import { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../service/firebaseConfig";
import { AuthContext } from "../context/Authprovider";
import { div } from "framer-motion/client";

const Header = ({ setView, currentView, user }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [order,setorder]=useState(0);
  const [wish,setwish]=useState(0);
  const [cart,setcart]=useState(0);
  

  const {
    isMenuOpen, setIsMenuOpen, isCategoryOpen, setIsCategoryOpen, isSignInOpen, setIsSignIn, action, setAction,
    toast, setToast, name, setName, password, setPassword, cpassword, setCPassword, email, setEmail, showToast,
    handleSignup, handleNavClick, cartItems, wishlistProducts, wishlistIds, handleLogin, navLinks, searchText, setSearchText,
    setWishlistProducts, setCartItems, setWishlistIds, setLikes,currentUserInfo, setCurrentUserInfo
  } = useHeaderHooks(setView)

  useEffect(() => {
  if (!userMenu) return;

  const animate = (setter, target) => {
    let start = 0;
    const step = Math.ceil(target / 1000); 
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(interval);
      }

      setter(start);
    },1000);
  };

  animate(setcart, currentUserInfo.cart);
  animate(setorder, currentUserInfo.order);
  animate(setwish, currentUserInfo.wishlist);

}, [userMenu, currentUserInfo]);

  const navLinks1 = [
    { name: "Home", view: "home", icon: Home },
    { name: "Fashion", view: "Fashion", icon: Shirt },
    { name: "Electronics", view: "Electronics", icon: Laptop },
    { name: "Bags", view: "Bags", icon: Briefcase },
    { name: "Footwear", view: "Footwear", icon: Footprints },
    { name: "Groceries", view: "Groceries", icon: ShoppingBasket },
    { name: "Wellness", view: "Wellness", icon: HeartPulse },
    { name: "Jewellery", view: "Jewellery", icon: Gem },
    { name: "Clothing", view: "Clothing", icon: ShoppingBag },
  ];

  const navLinks2 = [
    { name: 'Wishlist', view: 'wishlist', img: Heart },
    { name: 'Cart', view: 'cart', img: ShoppingCart },
    { name: 'Log Out', view: "", img: LogOut }
  ]
  const handleLogout = async () => {
    try {
      await signOut(auth);
      showToast("Logged out successfully", "success");
    } catch (error) {
      console.log(error);
      showToast("Logout failed");
      return;
    }

    setView("home");
    setIsSignIn(false);
    setIsCategoryOpen(false);
    setWishlistIds([]);
    setLikes([]);
    setCartItems([]);
    setWishlistProducts([]);
  };


  return (
    <header className="w-full border-b border-gray-100 bg-white sticky top-0 z-50 font-[poppins]">

      {/* ------------------------------Middle Header---------------------------- */}

      <div className="container mx-auto px-4 py-5 flex items-center justify-between gap-4">

        {/*-------------------------------Logo ----------------------------------*/}

        <div
          className="flex items-center gap-2 flex-shrink-0 cursor-pointer"
          onClick={() => handleNavClick("home")}
        >
          <div className="bg-[black] p-2 rounded-lg animate-pulse">
            <ShoppingCart className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-[poppins] tracking-tight text-[black] font-semibold">
              SHOPSTIC
            </h1>
            <p className="text-[10px] text-gray-500 tracking-wider font-bold mt-[-4px] font-[poppins]">
              BIG MEGA SHOP
            </p>
          </div>
        </div>

        {/*----------------------------------Search Bar-------------------------------------*/}

        <div className="hidden lg:flex flex-grow max-w-2xl items-center border border-gray-300 rounded-md px-4 py-2 mx-4 font-[poppins] font-medium">
          <input
            type="text"
            placeholder="Search for items..."
            className="w-full outline-none text-sm text-gray-600"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Search className="text-gray-400 w-5 h-5 cursor-pointer hover:text-[gray]" />
        </div>

        {/*--------------------------------- Actions ----------------------------*/}

        <div className="flex items-center gap-6">
          <div className="hidden xl:flex items-center gap-2 border border-gray-200 shadow-sm rounded-md px-3 py-2 cursor-pointer">
            <MapPin className="text-gray-700 w-4 h-4" />
            <span className="text-[black] text-sm font-medium font-[poppins]">
              Your Location
            </span>
            <ChevronDown className="text-gray-700 w-4 h-4" />
          </div>

          <div className="flex items-center gap-5">
            <div
              className="relative cursor-pointer group flex items-center gap-1"
              onClick={() => {
                if (!user) {
                  setIsSignIn(true);
                }
                else {
                  setView("wishlist");
                }
              }} //----------------------- Trigger wishlist view------------------------
            >
              <Heart
                className={`w-7 h-7 transition-colors ${wishlistIds.length > 0 ? "text-[black]" : "text-gray-700"}`}
              />
              <span className="absolute -top-1.5 font-[poppins] font-semibold -right-1.5 bg-[red] text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistIds.length}
              </span>
            </div>

            <div
              className="relative cursor-pointer group flex items-center gap-1"
              onClick={() => {
                if (!user) {
                  setIsSignIn(true);
                } else {
                  setView("cart");
                }
              }}
            >
              <ShoppingCart className="w-7 h-7 text-gray-700 group-hover:text-[black] transition-colors" />
              <span className="absolute -top-1.5 -right-1.5 bg-[red]  font-[poppins] font-semibold text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartItems.length} {/*------------------------ Show dynamic count here------------------------ */}
              </span>
            </div>

            {
              user ? (
                <div className="h-9 w-9 rounded-full border flex items-center justify-center" onClick={() => setUserMenu(true)}>
                  <User />
                </div>
              ) : (
                <button className="hidden sm:flex items-center gap-2 bg-[black] text-white px-5 py-2 rounded-md hover:bg-gray-700 transition-colors font-semibold font-[poppins] text-sm"
                  onClick={() => {
                    if (!user) {
                      setIsSignIn(true)
                    } else {
                      undefined
                    }
                  }}
                >
                  <User className="w-4 h-4" /> {user ? 'Logged in' : 'Sign up'}
                </button>
              )
            }

            <button
              className="lg:hidden text-gray-700"
              onClick={() => setIsCategoryOpen(true)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* -----------------------------Lower Navigation ------------------------------------ */}

      <div className="hidden lg:block border-t border-gray-100">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button className="flex items-center font-[poppins]  gap-2 bg-[black] text-white px-5 py-2.5 rounded-md font-semibold text-sm" onClick={() => setIsCategoryOpen(true)}>
              <LayoutGrid className="w-4 h-4" /> Browse All Categories{" "}
              <ChevronDown className="w-4 h-4" />
            </button>

            <nav>
              <ul className="flex items-center gap-2 font-[poppins] font-medium">
                {navLinks.map((link) => {
                  const isActive = currentView === link.view;

                  return (
                    <li
                      key={link.name}
                      onClick={() => handleNavClick(link.view)}
                      className={`relative cursor-pointer px-4 py-1.5 text-sm font-semibold transition-colors duration-300 flex items-center gap-1
                        ${isActive ? "text-[white]" : "text-gray-700 hover:text-gray-500"}`}
                    >

                      {isActive && (
                        <Motion.div
                          layoutId="activePill"
                          className="absolute inset-0 bg-[black] opacity-80 rounded-lg -z-10"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}

                      {link.name}
                      {link.name !== "Home" && (
                        <ChevronDown
                          size={14}
                          className={
                            isActive ? "text-[white]" : "text-gray-400"
                          }
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Headphones className="w-9 h-9 text-gray-700" />
            <div>
              <p className="text-green-600 text-lg font-bold leading-none">
                1900 - 888
              </p>
              <p className="text-[11px] text-gray-400 font-bold uppercase">
                24/7 Support Center
              </p>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isCategoryOpen && (
          <>
            {/*-------------------------------------- Overlay---------------------------------------- */}
            <div
              onClick={() => setIsCategoryOpen(false)}
              className="fixed inset-0 bg-black/40 z-40"
            />

            {/*-------------------------------------------------Side Drawer --------------------------------------------*/}

            <Motion.div
              initial={{ x: -400 }}
              animate={{ x: 0 }}
              exit={{ x: -350 }}
              transition={{ duration: 0.5 }}
              className="fixed top-0 left-0 h-full w-[250px] lg:w-[350px] bg-white shadow-xl z-50 px-2 py-4"
            >
              {/*-------------------------------------------Header ------------------------------------------*/}

              <div className="flex items-center justify-center mb-3 px-2">
                <h2 className="text-2xl lg:text-2xl font-semibold font-[poppins] px-2">
                  Menu
                </h2>
              </div>

              {/*----------------------------------Categories --------------------------------------*/}

              <ul className="flex flex-col gap-1 lg:gap-2 text-sm font-semibold font-[poppins] px-2">
                {
                  navLinks1.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div onClick={() => { setView(item.view); setIsCategoryOpen(false) }} className={currentView === item.view ? 'bg-black cursor-pointer py-2 px-2 rounded-lg flex flex-row gap-2 items-center' : 'bg-white cursor-pointer py-2 px-2 flex flex-row gap-2 items-center'}>
                        <Icon size={20} className={currentView === item.view ? 'text-white' : 'text-black'} />
                        <h1 className={currentView === item.view ? "text-white font-[poppins] text-[15px] font-medium" : "font-medium font-[poppins] text-[15px]"}>{item.name}</h1>
                      </div>
                    )
                  })
                }
              </ul>

              <div className="flex flex-col mt-6 px-2">
                <div className="w-full flex items-center justify-center">
                  <h2 className="text-2xl lg:text-2xl font-semibold font-[poppins] px-2 pb-3">
                    Section
                  </h2>
                </div>
                <ul className="flex flex-col gap-1 lg:gap-2 text-sm font-semibold font-[poppins]">
                  {
                    navLinks2.map((item, index) => {
                      const Icon = item.img;
                      return (
                        <div onClick={() => {
                          if (item.view === "") {
                            if (user) {
                              handleLogout();
                              setIsCategoryOpen(false)
                            }
                            else {
                              setIsCategoryOpen(false)
                            }
                          }
                          else {
                            if (user) {
                              handleNavClick(item.view);
                              setIsCategoryOpen(false)
                            }
                            else {
                              setIsCategoryOpen(false)
                              setIsSignIn(true)
                            }
                          }
                        }} className={currentView === item.view ? 'bg-black cursor-pointer py-2 px-2 rounded-md flex flex-row items-center gap-2' : 'bg-white cursor-pointer py-2 px-2 flex flex-row items-center gap-2'}>
                          <Icon size={20} className={currentView === item.view ? 'text-white' : 'text-black'} />
                          <h1 className={currentView === item.view ? "text-white font-[poppins] text-[15px] font-medium" : "font-[poppins] text-black text-[15px] font-medium"}>{item.name}</h1>
                        </div>
                      )
                    })
                  }
                </ul>
              </div>
            </Motion.div>
          </>
        )}
      </AnimatePresence>

      {/*-----------------------------------------------SignUp Sidebar-------------------------------*/}

      <AnimatePresence>
        {isSignInOpen && (
          <>
            {/*-------------------------------- Overlay---------------------------------- */}

            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              onClick={() => setIsSignIn(false)}
              className="fixed inset-0 bg-black/40 z-40"
            />

            {/*-----------------------------Side Drawer--------------------------------------*/}

            <Motion.div
              initial={{ x: 500 }}
              animate={{ x: 0 }}
              exit={{ x: 500 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-full w-105 bg-white shadow-xl z-50 px-2 py-4 hidden lg:block"
            >
              {/*------------------------------------------Header ---------------------------------------*/}

              <div className="relative flex items-center justify-between mb-3">
              </div>

              {/* -----------------------------------------Sign Up Form ---------------------------------- */}

              <div className="w-full mt-6 px-2 flex flex-col items-center">

                <div className="w-[80%] bg-gray-100 flex justify-between h-10 rounded-full">
                  <button className={action === 'login' ? "h-full w-[48%] flex items-center cursor-not-allowed justify-center bg-black rounded-full" : "w-[48%] flex items-center justify-center"}
                    onClick={() => setAction('login')}
                  >
                    <h1 className={action === 'login' ? 'font-[poppins] text-[15px] font-medium text-white' : 'font-[poppins] font-medium text-[15px]'}>Login</h1>
                  </button>
                  <button className={action === 'signup' ? "h-full w-[48%] flex items-center cursor-not-allowed justify-center bg-black rounded-full" : "w-[48%] flex items-center justify-center"}
                    onClick={() => setAction('signup')}
                  >
                    <h1 className={action === 'signup' ? 'font-[poppins] font-medium text-[15px] text-white' : 'font-[poppins] font-medium text-[15px]'}>Register</h1>
                  </button>
                </div>
                <form className="w-[85%] flex flex-col gap-4 pt-10">

                  {/*-------Name---------*/}
                  {
                    action === 'signup' && (
                      <div className="flex flex-col gap-1">
                        <label className="text-[13px] font-medium text-gray-600">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your name"
                          className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-black transition"
                        />
                      </div>
                    )
                  }

                  {/*----------Email-----------*/}
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px]  font-medium text-gray-600">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-black transition"
                    />
                  </div>

                  {/*---------Password------------*/}
                  <div className="flex flex-col gap-1 relative">
                    <label className="text-[13px]  font-medium text-gray-600">
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2 pr-10 outline-none focus:border-black transition"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-[34px] cursor-pointer text-gray-500"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                  </div>

                  {/*----------Confirm Password-------------*/}
                  {
                    action === 'signup' && (
                      <div className="flex flex-col gap-1 relative">
                        <label className="text-[13px] font-medium text-gray-600">
                          Confirm Password
                        </label>
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={cpassword}
                          onChange={(e) => setCPassword(e.target.value)}
                          className="border border-gray-300 rounded-md px-3 py-2 pr-10 outline-none focus:border-black transition"
                        />
                        <span
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-[34px] cursor-pointer text-gray-500"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                      </div>
                    )
                  }

                  {/*-----------Button--------------*/}
                  <button
                    type="button"
                    className="mt-4 bg-black text-white h-10 rounded-md font-semibold hover:bg-gray-800 transition"
                    onClick={() => {
                      if (action === 'login') {
                        handleLogin()
                        setIsSignIn(true)
                      } else {
                        handleSignup();
                        setIsSignIn(true)
                      }
                    }}
                  >
                    {action === 'login' ? 'Log in' : 'Sign up'}
                  </button>

                </form>
              </div>
              {/* ----------------------- Toast Message ------------------------ 
                <AnimatePresence>
                {toast.show && (
                  <Motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`absolute w-[80%] font-medium bottom-6 left-1/2 flex items-center text-[15px] justify-center transform -translate-x-1/2 px-6 py-2.5 rounded-md shadow-lg text-white z-[999] ${toast.type === "success" ? "bg-green-600" : "bg-red-600"
                      }`}
                  >
                    {toast.message}
                  </Motion.div>
                )}
              </AnimatePresence>
              */}
            </Motion.div>
          </>
        )}
      </AnimatePresence>
      {/* -------------------- Mobile SignUp Modal -------------------- */}
      <AnimatePresence>
        {isSignInOpen && (
          <>
            {/*--------------------------Overlay-----------------------------*/}
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSignIn(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />

            {/*----------------------------Centered Modal-------------------------*/}
            <Motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center lg:hidden"
            >
              <div className="w-[90%] max-w-sm bg-white rounded-xl shadow-sm py-10 px-4 relative">

                {/*---------------------------Close Button-----------------------------*/}
                <button
                  onClick={() => setIsSignIn(false)}
                  className="absolute top-3 right-3 text-gray-500"
                >
                  <X size={20} />
                </button>

                {/*--------------------------------Tabs-----------------------------------*/}
                <div className="w-full bg-gray-100 flex justify-between h-10 rounded-full mb-6">
                  <button
                    className={action === 'login'
                      ? "w-1/2 bg-black text-white rounded-full"
                      : "w-1/2"}
                    onClick={() => setAction('login')}
                  >
                    Login
                  </button>
                  <button
                    className={action === 'signup'
                      ? "w-1/2 bg-black text-white rounded-full"
                      : "w-1/2"}
                    onClick={() => setAction('signup')}
                  >
                    Register
                  </button>
                </div>

                {/*-----------------------------------Form------------------------------*/}
                <form className="flex flex-col gap-3">

                  {action === 'signup' && (
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border px-3 py-2 rounded-md border-gray-300"
                    />
                  )}

                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border px-3 py-2 rounded-md border-gray-300"
                  />

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border px-3 py-2 rounded-md w-full pr-10 border-gray-300"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2 cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                  </div>

                  {action === 'signup' && (
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={cpassword}
                      onChange={(e) => setCPassword(e.target.value)}
                      className="border px-3 py-2 rounded-md border-gray-300"
                    />
                  )}

                  <button
                    type="button"
                    className="bg-black text-white py-2 rounded-md mt-2"
                    onClick={() => {
                      if (action === 'login') {
                        handleLogin();
                        setIsSignIn(false);
                      } else {
                        handleSignup();
                        setIsSignIn(false);
                      }
                    }}
                  >
                    {action === 'login' ? 'Log in' : 'Sign up'}
                  </button>

                </form>
              </div>

            </Motion.div>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toast.show && (
          <Motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`
                       fixed left-1/2 transform -translate-x-1/2 
                       bottom-4 w-[90%] text-center
                       lg:left-1/2 lg:bottom-0 lg:-translate-x-1/2 lg:w-full
                       border-gray-200
                       text-[16px] lg:text-[15px] font-semibold
                       px-5 py-4 lg:px-20 lg:py-3
                       rounded-lg shadow-2xl shadow-[black]/30 z-[999]
     
                       ${toast.type === "success" ? "bg-green-100 text-black" : "bg-red-100 text-black"}
           `}
          >
            {toast.message}
          </Motion.div>
        )}
      </AnimatePresence>

      {/*--------------------------User Account --------------------------*/}

      <AnimatePresence>
        {userMenu && (
          <>
            {/*-------------------------------------- Overlay---------------------------------------- */}
            <div
              onClick={() => setUserMenu(false)}
              className="fixed inset-0 bg-black/40 z-40"
            />

            {/*-------------------------------------------------Side Drawer --------------------------------------------*/}

            <Motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ duration: 0.5 }}
              className="fixed top-0 right-0 h-full w-[250px] lg:w-[350px] bg-white shadow-xl z-50 px-2 py-4"
            >
              {/*-------------------------------------------Header ------------------------------------------*/}
            <div className="px-5">
                 <div className="flex gap-3 items-center">
                  <div className="h-12 w-12 border rounded-full border-gray-300 flex items-center justify-center">
                    <User/>
                  </div>
                  <div>
                   <h2 className="font-semibold text-[16px]">{currentUserInfo.name}</h2>
                   <h2 className="font-semibold text-[13px] opacity-55">{currentUserInfo.email.slice(0,4)}*****{currentUserInfo.email.slice(currentUserInfo.email.length-12,currentUserInfo.email.length)}</h2>
                  </div>
                 </div>
                 <div className="flex justify-between">
                  <div className="w-[30%] py-5 rounded-lg bg-white shadow-md flex flex-col items-center justify-center">
                    <h2 className="text-[15px]">Cart</h2>
                    <h2 className="text-[22px] font-bold">{cart}</h2>
                  </div>
                  <div className="w-[30%] py-5 rounded-lg bg-white shadow-md flex flex-col items-center justify-center">
                    <h2 className="text-[15px]">Order</h2>
                    <h2 className="text-[22px] font-bold">{order}</h2>
                  </div>
                  <div className="w-[30%] py-5 rounded-lg bg-white shadow-md flex flex-col items-center justify-center">
                    <h2 className="text-[15px]">Wishlist</h2>
                    <h2 className="text-[22px] font-bold">{wish}</h2>
                  </div>
                 </div>
                  <button className="bg-black w-full mt-10 text-white py-2 rounded-lg"
                  onClick={()=>{
                    handleLogout();
                    setUserMenu(false)
                  }}
                  >
                    Log out
                  </button>
            </div>
            </Motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
