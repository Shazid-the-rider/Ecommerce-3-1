import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

import CategoryCard from "./CategoryCard";
import { categoriesData } from "../data/categories";

const CategorySlider = () => {

  return (
    <section className="pt-10 pb-6 bg-white overflow-hidden font-[poppins]">
      <div className="container mx-auto px-4">

        {/*------------------ Header with Title and Buttons-------------------*/}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl lg:text-2xl pl-1.5 font-semibold text-[#253D4E]">
            Featured Categories
          </h3>

          <div className="flex gap-3">

            {/*-------------------Left Button: Gray -> Green on Hover--------------*/}

            <button className="category-prev w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-full bg-[#F2F3F4] text-[#7E7E7E] hover:bg-[#3BB77E] hover:text-white transition-all duration-300 shadow-sm">
              <ChevronLeft size={22} />
            </button>
            
            {/*----------------------- Right Button: Gray -> Green on Hover---------------------*/}

            <button className="category-next w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-full bg-[#F2F3F4] text-[#7E7E7E] hover:bg-[#3BB77E] hover:text-white transition-all duration-300 shadow-sm">
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={2}
          slidesPerView={2}
          loop={true}
          navigation={{
            nextEl: ".category-next",
            prevEl: ".category-prev",
          }}
          breakpoints={{
            0: { slidesPerView: 3 }, 
            480: { slidesPerView: 5 },
            768: { slidesPerView: 7 },
            1024: { slidesPerView: 10 },
          }}
          className="!overflow-visible"
        >
          {categoriesData.map((cat) => (
            <SwiperSlide key={cat.id}>
              <CategoryCard
                name={cat.name}
                img={cat.img}
                color={cat.color}
                dark={cat.dark}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CategorySlider;
