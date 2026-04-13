import { useContext, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { Filter, ChevronDown, SlidersHorizontal } from "lucide-react";
import { GlobalApi } from "../context/GlobalContext";

const CategoryPage = ({ categoryName, handleProductClick }) => {

  //------------------------ We use sortBy to track the user's choice --------------------------//

  const [sortBy, setSortBy] = useState("Featured");
  const [openFilter, setOpenFilter] = useState(false);
  const { products } = useContext(GlobalApi);

  //-------------------------customised box:--------------------------------------------------//

  const options = [
    "Featured",
    "Price: Low to High",
    "Price: High to Low",
    "Avg. Rating",
  ];

  //----------------------------2. Logic to filter AND sort the products-----------------------------//

  const processedProducts = useMemo(() => {
    let result = products.filter(
      (product) =>
        product.category.toLowerCase() === categoryName.toLowerCase(),
    );

    //------------------------------Sort the product by feature-------------------------------------//

    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "Rating") {
      result.sort((a, b) => b.rating - a.rating);
    }
    return result;
  }, [categoryName, sortBy, products]); //----------------- Recalculate if category OR sort changes-------------//

  return (
    <div className="container mx-auto px-4 py-8 font-[poppins]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#253D4E]">
            {categoryName} <span className="text-green-500">Collection</span>
          </h1>
          <p className="text-[13px] text-gray-500 mt-1 font-[poppins] font-medium">
            We found{" "}
            <span className="text-[#3BB77E] font-extrabold">
              {processedProducts.length}
            </span>{" "}
            items for you!
          </p>
        </div>

        {/*------------------------ Sorting & Filters ---------------------------*/}

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 border border-gray-100 rounded-xl shadow-sm bg-white font-[poppins]">
            <SlidersHorizontal size={16} className="text-gray-400" />
            <span className="text-sm font-semibold text-[#253D4E]">Show : {processedProducts.length}</span>
            <ChevronDown size={14} className="text-gray-400" />
          </div>

          {/* 3.--------------------------- UPDATED SORT DROPDOWN: Now uses setSortBy----------------------- */}

          <div className="relative flex items-center font-semibold gap-2 px-4 py-2 border border-gray-100 rounded-xl shadow-sm bg-white hover:border-[black] hover:border-2 transition-colors font-[poppins]"
            onClick={() => setOpenFilter((prev) => prev === true ? false : true)}
          >
            <Filter size={16} className="text-gray-400" />
            <span className="text-sm text-[#253D4E] font-semibold">
              Sort by: {sortBy}
            </span>
            <ChevronDown size={14} className="text-gray-400 ml-auto" />
            {openFilter && (
              <div className="absolute mt-52 right-0 w-full bg-white rounded-xl shadow-md py-2 z-50">
                {options.map((item, index) => (
                  <div
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSortBy(item);
                      setOpenFilter(false);
                    }}
                    className="px-4 py-2 text-sm font-[poppins] font-semibold hover:bg-black hover:text-white cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">

        {/*-----------------------------------------Sidebar Filters----------------------------*/}

        <aside className="w-full lg:w-1/4 space-y-8">
          <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hidden lg:block">
            <h4 className="text-[17px] font-semibold text-[black] mb-6 border-b pb-2">
              Fill by Price
            </h4>
            <input type="range" className="w-full accent-gray-700 mb-4" />
            <div className="flex justify-between text-sm font-medium font-[poppins] text-gray-500 mb-6">
              <span>Range: <strong className="font-bold">$0 - $500</strong></span>
            </div>
            <button className="w-full bg-[black] text-white py-2 rounded-md font-bold text-sm hover:bg-gray-700 transition-all">
              Filter Now
            </button>
          </div>

          <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hidden">
            <h4 className="text-lg font-bold text-[#253D4E] mb-4 border-b pb-2">
              Brands
            </h4>
            <div className="space-y-3">
              {["Apple", "Nike", "Adidas", "Sony", "Gucci"].map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[black] border-gray-300 rounded"
                  />
                  <span className="text-sm text-medium text-gray-700 font-[poppins] group-hover:text-[#3BB77E]">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/*---------------------------------------- Product Grid --------------------------------*/}

        <main className="w-full lg:w-3/4">
          {processedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {processedProducts.map((product, index) => (
                <ProductCard
                  key={product.id.toString() + index.toString()}
                  product={product}
                  handleProductClick={handleProductClick}
                />
              ))}
            </div>
          ) : (
            <div className="bg-[#F4F6FA] rounded-3xl p-20 text-center">
              <h2 className="text-2xl font-bold text-[#253D4E] mb-2">
                No products found
              </h2>
              <p className="text-gray-500">
                Try checking another category or come back later!
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;
