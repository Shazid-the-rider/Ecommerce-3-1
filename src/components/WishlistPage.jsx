import ProductCard from "./ProductCard";
import { Heart, ArrowLeft } from "lucide-react";
import useWishList from "../hooks/useWishList";

const WishlistPage = ({ setView, handleProductClick }) => {
  const { wishlistProducts } = useWishList();

  if (wishlistProducts.length === 0) {
    return (
      <div className="container mx-auto px-8 py-20 text-center">
        <div className="flex justify-center mb-6 text-gray-200">
          <Heart size={80} />
        </div>
        <h2 className="text-3xl font-bold text-[#253D4E] mb-4">
          Your Wishlist is Empty
        </h2>
        <p className="text-gray-500 mb-8">
          Save your favorite items here to review them later!
        </p>
        <button
          onClick={() => setView("home")}
          className="bg-[#3BB77E] text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 mx-auto"
        >
          <ArrowLeft size={18} /> Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 font-[poppins]">
      <h1 className="text-2xl lg:text-3xl  text-[#253D4E] mb-8 font-bold">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {wishlistProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            handleProductClick={handleProductClick}
          />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
