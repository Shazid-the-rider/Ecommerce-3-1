import React, { useContext } from "react";
import { GlobalApi } from "../context/GlobalContext";

const CategoryCard = ({ name, img, color, dark }) => {
  const {currentView,setCurrentView}=useContext(GlobalApi)
  const handleNavClick = (viewName) => {
    setCurrentView(viewName);
  };
  return (
    <div className="group flex flex-col items-center cursor-pointer py-4" onClick={()=>handleNavClick(name)}>

      {/*--------------------The Circular Container-----------------------------*/}

      <div
        className={`
        relative w-15 h-15 md:w-15 md:h-15 rounded-full 
        ${color} flex items-center justify-center 
        transition-all duration-500 
        shadow-[0_8px_15px_rgba(0,0,0,0.1)] 
        group-hover:shadow-[0_15px_15px_rgba(0,0,0,0.4)] 
        group-hover:-translate-y-2
      `}
      >
        {/*------------------------THE FIX: Using the 'dark' prop here------------------------*/}

        <div
          className={`
          w-10 h-10 md:w-10 md:h-10 transition-transform duration-500 
          group-hover:rotate-12 group-hover:scale-110
          ${dark ? "brightness-0 invert" : ""} 
        `}
        >
          {/* 
              'brightness-0 invert' is a Tailwind trick:
              It turns any colored/black icon into pure white.
              Perfect for dark backgrounds like the red one.
          */}
          <img src={img} alt={name} className="w-10 h-10 object-contain" />
        </div>
      </div>

      {/*--------------------------Label------------------------*/}

      <h4 className="mt-4 text-black opacity-75 group-hover:opacity-90 font-bold text-sm md:text-base group-hover:text-[black] group-hover:text-lg transition-colors">
        {name}
      </h4>
    </div>
  );
};

export default CategoryCard;
