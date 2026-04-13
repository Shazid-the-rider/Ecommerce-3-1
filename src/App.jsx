import { div } from "framer-motion/client";
import CartPage from "./components/CartPage";
import CategoryPage from "./components/CategoryPage";
import CategorySlider from "./components/CategorySlider";
import CheckoutPage from "./components/ChackoutPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PopularProducts from "./components/PopularProducts";
import ProductDetail from "./components/ProductDetail";
import WishlistPage from "./components/WishlistPage";
import useAppHooks from "./hooks/useAppHooks";
import ProductCard from "./components/ProductCard";

const App = () => {

  const { currentView, filteredProducts, setCurrentView, selectedProduct, setSelectedProduct, user, isSignInOpen, setIsSignIn, handleProductClick } = useAppHooks();
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header
        setView={setCurrentView}
        currentView={currentView}
        user={user}
      />
      {
        filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">

            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id.toString() + index.toString()}
                product={product}
                handleProductClick={handleProductClick}
              />
            ))}

          </div>
        )
      }
      <div className="grow bg-[#F4F6FA]">
        {currentView === "home" ? (
          <main className="bg-white">
            <Hero />
            <CategorySlider />
            <PopularProducts
              handleProductClick={handleProductClick}
            />
          </main>
        ) : currentView === 'checkout' ? (
          <CheckoutPage
            setView={setCurrentView}
          />
        ) : currentView === "cart" ? (
          <CartPage
            setView={setCurrentView}
            handleProductClick={handleProductClick}
          />
        ) : currentView === "wishlist" ? (
          <WishlistPage
            setView={setCurrentView}
            handleProductClick={handleProductClick}
          />
        ) : currentView === "product-detail" ? (
          <ProductDetail
            product={selectedProduct}
            setView={setCurrentView}
          />
        ) : (
          <CategoryPage
            categoryName={currentView}
            handleProductClick={handleProductClick}
          />
        )}
      </div>

      <Footer setView={setCurrentView} />
    </div>

  );
};
export default App;
