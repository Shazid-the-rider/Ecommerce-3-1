import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import Banner from "./Banner";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Banner1 from "./Banner1";

const Hero = () => {

  return (
    <section className="container mx-auto px-4 py-6">
      <div className="rounded-[30px] overflow-hidden relative">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper h-[300px] md:h-[450px] lg:h-[400px]"
        >
          <SwiperSlide>
            <Banner />
          </SwiperSlide>
          <SwiperSlide>
            <Banner1 />
          </SwiperSlide>

        </Swiper>

        {/* -------------------Design for Banner-----------------*/}

        <style jsx global>{`
          .swiper-button-next,
          .swiper-button-prev {
            color: black !important;
            background: white;
            width: 50px !important;
            height: 50px !important;
            border-radius: 50%;
            transform: scale(0.7);
            padding: 10px;
          }
          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 10px !important;
            font-weight: bold;
          }
          .swiper-pagination-bullet-active {
            background: black !important;
          }
        `}</style>
      </div>
    </section>
  );
};

export default Hero;
