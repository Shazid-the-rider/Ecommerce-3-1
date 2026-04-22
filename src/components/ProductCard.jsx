import React, { useContext } from "react";
import { ShoppingCart, Star, Heart, Eye } from "lucide-react";
import { GlobalApi } from "../context/GlobalContext";
import { add_To_Cart, add_to_wishlist } from "../../service/firebaseCrudOperation";
import { AuthContext } from "../context/Authprovider";
import { useProductCardHooks } from "../hooks/useProductCardHooks";

const ProductCard = ({ product, handleProductClick}) => {
  const { toast, setToast, showToast } = useContext(GlobalApi);
  const { wishlistProducts, cartItems, user, isInCart, discount, isInWishlist, setIsSignIn } = useProductCardHooks(product);
  return (
    <div className="group bg-white border cursor-pointer border-gray-300 lg:border-gray-100 rounded-2xl p-4 transition-all duration-300 hover:border-gray-500 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] relative flex flex-col h-full">

      {/*------------------------------- Left Badge (Hot, Sale, New)-------------------------- */}

      {product.badge && (
        <span
          className={`absolute top-0 left-0 z-10 px-5 py-2 lg:px-4 lg:py-1.5 rounded-br-2xl rounded-tl-2xl text-white font-[poppins] text-[10px] font-bold uppercase tracking-wider
          ${product.badge === "Hot"
              ? "bg-[red]"
              : product.badge === "New"
                ? "bg-green-600"
                : "bg-yellow-400"
            }`}
        >
          {product.badge}
        </span>
      )}

      {/*-------------------------- RIGHT BADGE: THE DISCOUNT PERCENTAGE-----------------------*/}

      {discount && (
        <span className="absolute top-0 right-0 z-10 bg-[black] font-[poppins] text-white text-[10px] font-bold px-5 py-2 lg:px-3 lg:py-1.5 rounded-bl-2xl rounded-tr-2xl">
          -{discount}% Off
        </span>
      )}

      {/* -------------------------------Image Container ---------------------------------- */}

      <div
        className="relative overflow-hidden rounded-xl mb-4 bg-[#F4F6FA] aspect-square flex items-center justify-center"
        onClick={() => handleProductClick(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/*--------------------------------- Quick View / Wishlist Overlay-------------------- */}

        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            onClick={() => add_to_wishlist(item.id, user?.uid, showToast)}
            className={`p-2.5 rounded-lg transition-all shadow-md transform translate-y-4 group-hover:translate-y-0 
          ${isInWishlist ? "bg-[black] text-white" : "bg-white text-[black] hover:bg-[black] hover:text-white"}`}
          >
            <Heart size={18} fill={isInWishlist ? "currentColor" : "none"} />
          </button>
          <button className="bg-white p-2.5 rounded-lg text-[black] hover:bg-[black] hover:text-white transition-all shadow-md transform translate-y-4 group-hover:translate-y-0 duration-500">
            <Eye size={18} />
          </button>
        </div>
      </div>

      {/*----------------------------------Product Details------------------------------- */}

      <div className="flex flex-col flex-grow">
        <span className="text-[12px] lg:text-[11px] text-gray-600 mb-0.5 lg:mb-1 hover:text-gray-400 hover:opacity-100 cursor-pointer font-semibold opacity-70 font-[poppins]">
          {product.category}
        </span>

        <h3
          className="text-[black] font-semibold text-xl md:text-base mb-0 lg:mb-2 hover:text-black hover:opacity-60 opacity-100 font-[poppins] transition-colors line-clamp-2 min-h-[3rem]"
          onClick={() => handleProductClick(product)}
        >
          {product.name}
        </h3>

        {/*-------------------------------Ratings---------------------------------------*/}

        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
              />
            ))}
          </div>
          <span className="text-[11px] text-gray-600 font-medium font-[poppins]">
            ({product.rating})
          </span>
        </div>

        {/*----------------------------------Brand/Vendor---------------------------- */}

        <p className="text-[11px] text-gray-500 mb-4 font-[poppins] opacity-100">
          By{" "}
          <span className="text-[black] font-[poppins] font-semibold opacity-100">{product.brand}</span>
        </p>

        {/*----------------------------------Footer: Price & Add Button------------------ */}

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl lg:text-xl font-bold text-green-500 lg:text-[black] font-[poppins]">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="text-md lg:text-xs line-through font-semibold text-[black] font-[poppins] opacity-60">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => {
              if (!user) {
                setIsSignIn(true);
              }
              else {
                add_To_Cart(user?.uid, product, 1);
                showToast('Successfully Added To Cart ✅', 'success')
              }
            }} // Add this click handler
            className="flex items-center gap-2 bg-[black] opacity-60 text-[white] px-4 py-2 rounded-md font-bold text-sm hover:opacity-100 hover:text-white transition-all active:scale-95"
          >
            <ShoppingCart size={16} />
            {isInCart ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
