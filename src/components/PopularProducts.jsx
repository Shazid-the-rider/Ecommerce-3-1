import { AnimatePresence, motion } from "framer-motion";
import usePopularProductHooks from "../hooks/usePopularProductHooks";
import ProductCard from "./ProductCard";

const PopularProducts = ({ handleProductClick, }) => {

  const { products, popularProducts,toast, setToast,showToast } = usePopularProductHooks();

  return (
    <section className="py-5 lg:py-12 bg-white font-[poppins]">
      <div className="container mx-auto px-4 relative">

        {/*------------------------------Section Header----------------------------- */}

        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl lg:text-2xl md:text-[26px] font-semibold text-[#253D4E]">
            Popular Products
          </h3>

          {/* ----------------------We'll link these categories to the navigation logic in the next step--------------*/}

          <div className="hidden lg:flex items-center gap-6 font-semibold text-sm">
            <button className="text-[#3BB77E]">All</button>
            <button className="text-[#253D4E] hover:text-[#3BB77E] transition-colors">
              Electronics
            </button>
            <button className="text-[#253D4E] hover:text-[#3BB77E] transition-colors">
              Bags
            </button>
            <button className="text-[#253D4E] hover:text-[#3BB77E] transition-colors">
              Footwear
            </button>
          </div>
        </div>

        {/* Responsive Grid: 
            1 col on mobile
            2 cols on small tablets
            3 cols on tablets
            4 cols on desktop
            5 cols on large screens
        */}

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {popularProducts.map((product, index) => (
            <ProductCard
              key={product.id.toString() + index.toString()}
              product={product}
              handleProductClick={handleProductClick}
            />
          ))}
        </div>
        {/*---------------------Toast message show -------------------------*/}

        <AnimatePresence>
          {toast.show && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: .3 }}
              className={`fixed top-1/2 left-1/2 text-[20px] font-semibold transform -translate-x-1/2 -translate-y-1/2 px-20  py-20 rounded-lg shadow-2xl shadow-[black]/30 text-white z-[999] ${toast.type === "success" ? "bg-green-600 text-black " : "bg-red-600 text-black"}`}
            >
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PopularProducts;
