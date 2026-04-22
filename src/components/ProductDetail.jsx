import { ShoppingCart, Heart, Star, ArrowLeft, Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import { add_To_Cart, add_to_wishlist } from "../../service/firebaseCrudOperation";
import { AnimatePresence, motion } from "framer-motion";
import useProductDetailHooks from "../hooks/useProductDetailHooks";
import Comment from "./Comment";

const ProductDetail = ({ product, setView, }) => {
  const { qty, setQty, user, toast, showToast, setToast, isInCart, isLiked, setIsSignIn,comment,setComment } = useProductDetailHooks(product)
  return (
    <div className="container mx-auto px-4 py-2 font-[poppins] relative">

      {/*------------------------- Back Button--------------------------- */}

      <button
        onClick={() => setView("home")}
        className="flex items-center gap-2 text-black hover:text-gray-700 font-semibold mb-2 transition-colors "
      >
        <ArrowLeft size={17} /> <span className="text-[14px]">Back to Products</span>
      </button>

      <div className="flex flex-col lg:flex-row gap-12 bg-white p-2 md:p-4 rounded-[40px] border border-gray-100 shadow-sm">

        {/* ---------------------Left: Image Section --------------------*/}

        <div className="w-full lg:w-1/4 space-y-4">
          <div className="bg-[#F4F6FA] rounded-[30px] overflow-hidden aspect-square flex items-center justify-center border border-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className=" w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
          </div>

          {/*--------------------- Thumbnails Placeholder ---------------------------*/}

          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square bg-[#F4F6FA] rounded-lg lg:rounded-2xl border border-gray-100 cursor-pointer hover:border-[black] overflow-hidden"
              >
                <img
                  src={product.image}
                  className="w-full h-full object-cover opacity-100 lg:opacity-70 lg:hover:opacity-100 active:opacity-80 transition"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ----------------------Right: Info Section --------------------------------*/}


        <div className="w-full lg:w-1/2 flex flex-col">
          <span className="bg-green-500 text-[white] text-xs font-semibold px-3 py-1 rounded-sm lg:rounded-md self-start mb-4 uppercase tracking-wider">
            {product.badge || "In Stock"}
          </span>
          <h1 className="text-2xl md:text-4xl  font-bold text-[black] leading-tight mb-2">
            {product.name}
          </h1>
          <div className="mb-2 flex items-center gap-4 lg:mb-6">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={
                    i < Math.floor(product.rating) ? "currentColor" : "none"
                  }
                />
              ))}
            </div>
            <span className="text-gray-500 font-medium text-[13px]">
              ({product.rating} Customer reviews)
            </span>
          </div>

          <div className="flex flex-row items-center gap-4 mb-5 lg:mb-8">
            <span className="text-3xl lg:text-5xl  text-green-500 font-bold">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <div className="flex flex-col">
                <span className="text-sm font-bold text-red-500 mb-1">
                  {Math.round(
                    ((product.oldPrice - product.price) / product.oldPrice) *
                    100,
                  )}
                  % Off
                </span>
                <span className="text-xl text-[black] line-through font-bold opacity-55">
                  ${product.oldPrice.toFixed(2)}
                </span>
              </div>
            )}
          </div>

          <p className="text-[15px] text-gray-800  lg:text-gray-600 leading-relaxed mb-4 lg:mb-8 lg:text-lg font-[poppins] font-medium">
            {product.description ||
              "This premium product is carefully selected to ensure the highest quality for our customers. Perfect for daily use and designed with modern aesthetics in mind."}
          </p>

          {/*----------------------------------Action Row-----------------------------*/}


          <div className="flex flex-wrap items-center gap-6 mb-10">
            <div className="flex items-center border-2 border-[black] rounded-xl px-2 lg:px-4 py-1 lg:py-2 gap-3 lg:gap-6 bg-white">
              <button
                onClick={() => setQty((q) => (q > 1 ? q - 1 : 1))}
                className="text-[white] bg-gray-400 py-2 px-2 rounded-lg "
              >
                <Minus size={20} />
              </button>
              <span className="font-black text-xl text-[#253D4E] w-6 text-center">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="text-[white] bg-gray-400 py-2 px-2 rounded-lg "
              >
                <Plus size={20} />
              </button>
            </div>

            <button
              onClick={() => {
                if (!user) {
                  setIsSignIn(true)
                }
                else {
                  if (isInCart) {
                    undefined;
                  } else {
                    add_To_Cart(user.uid, product, qty);
                    showToast('Product Successfully Added to Cart ✅', 'success')
                  }
                }
              }}
              className="flex-grow md:flex-grow-0 bg-[black] text-white px-5 py-2.5 lg:px-10 lg:py-3 font-semibold rounded-lg lg:rounded-xl font-black text-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-white"
            >
              <ShoppingCart size={22} /> {isInCart ? 'Already Added' : 'Add to Cart'}
            </button>

            <button
              onClick={() => {
                if (!user) {
                  setIsSignIn(true);
                }
                else {
                  add_to_wishlist(product.id, user?.uid, showToast);
                }
              }}
              className={` p-2.5 lg:p-3 rounded-lg lg:rounded-xl border transition-all ${isLiked ? "bg-[red] text-white" : "border-gray-200 text-gray-500 hover:border-gray-500 hover:text-[black]"}`}
            >
              <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
            </button>
          </div>

          {/*------------------------------Features / Trust--------------------------------*/}


          <div className="sm: pb-5  grid grid-cols-2 gap-4 border-t pt-8 font-[poppins]">
            <div className="flex items-center gap-3">
              <Truck className="text-green-500" size={20} />
              <span className="text-sm font-semibold text-gray-600">
                Free Worldwide Shipping
              </span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-green-500" size={20} />
              <span className="text-sm font-semibold text-gray-600">
                2 Year Brand Warranty
              </span>
            </div>
          </div>

          {/*---------------------Toast message show -------------------------*/}

          <AnimatePresence>
            {toast.show && (
              <motion.div
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Comment comment={comment}/>
    </div>
  );
};

export default ProductDetail;
