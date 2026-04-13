import React, { useContext } from "react";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  CreditCard,
} from "lucide-react";
import { GlobalApi } from "../context/GlobalContext";
import { change_quantity, deleteCart } from "../../service/firebaseCrudOperation";
import { span } from "framer-motion/client";

const CartPage = ({ setView, handleProductClick, }) => {
  const { cartItems } = useContext(GlobalApi)
  const subtotals = cartItems.reduce((acc, item) => {
    return acc + item.price * item.qty;
  }, 0);
  const shipping = subtotals > 1000 ? 0 : 50; // Free shipping over $500
  const tax = subtotals * 0.18; // 18% Tax
  const total = subtotals + shipping + tax;

  if (cartItems.length === 0) {
    return (

      <div className="container mx-auto px-4 py-20 text-center font-[poppins]">
        <div className="flex justify-center mb-6">
          <div className="bg-white p-8 rounded-full shadow-sm">
            <ShoppingBag size={80} className="text-gray-200" />
          </div>
        </div>
        <h2 className="text-3xl font-semibold text-[#253D4E] mb-4">
          Your Cart is Empty
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Looks like you haven't added anything to your cart yet. Explore our
          latest collections and find something you love!
        </p>
        <button
          onClick={() => setView("home")}
          className="bg-[black] text-white px-8 py-3 rounded-full font-bold hover:bg-[black] transition-all flex items-center gap-2 mx-auto"
        >
          <ArrowLeft size={18} /> Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 font-[poppins]">
      <h1 className="text-2xl lg:text-3xl text-[#253D4E] mb-8 font-bold px-2">My Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* --- Product List --- */}
        <div className="w-full lg:w-2/3 space-y-4 font-[poppins] font-semibold">
          <div className="hidden md:grid grid-cols-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-sm font-bold text-gray-500 mb-4">
            <div className="col-span-3 font-[poppins] font-semibold">Product</div>
            <div className="text-center font-[poppins] font-semibold">Unit Price</div>
            <div className="text-center font-[poppins] font-semibold">Quantity</div>
            <div className="text-right font-[poppins] font-semibold">Subtotal</div>
          </div>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-gray-300 lg:border-gray-100 flex flex-col md:grid md:grid-cols-6 items-center gap-4 transition-hover hover:border-[#BCE3C9]"
            >
              {/* Product Info */}
              <div className="col-span-3 flex items-center gap-4 w-full">
                <div
                  className="w-20 h-20 rounded-2xl bg-[#F4F6FA] overflow-hidden shrink-0"
                  onClick={() => handleProductClick(item)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4
                    className="font-semibold font-[poppins] text-gray-600 leading-tight hover:text-[black] cursor-pointer"
                    onClick={() => handleProductClick(item)}
                  >
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">{item.brand}</p>
                </div>
              </div>

              {/* Price */}
              <div className="font-[poppins] lg:text-[20px] md:text-center font-bold text-[#253D4E] w-full md:w-auto  justify-between md:block flex items-center">
                <span className="md:hidden sm:text-[15px] text-gray-400 font-medium">
                  Price:
                </span>
                <span className="sm: text-[20px]">
                  ${item.price.toFixed(2)}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="flex justify-center lg:justify-center w-full md:w-auto">
                <div className="flex lg:items-center border border-black rounded-lg px-2 py-1 gap-4 bg-white">
                  <button
                    onClick={() => item.qty <= 1 ? undefined : change_quantity(item.cid, -1)}
                    className={
                      item.cid <= 1
                        ? "text-[white] bg-gray-400 cursor-not-allowed rounded-sm p-1 transition-colors"
                        : "text-[white] bg-gray-400  hover:text-white rounded-sm p-1 transition-colors cursor-pointer"
                    }
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-bold text-[#253D4E] w-4 text-center">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => change_quantity(item.cid, 1)}
                    className="text-[white]  bg-gray-400  hover:text-white rounded-sm p-1 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Subtotal & Delete */}
              <div className="md:text-right font-black text-green-500 w-full md:w-auto flex justify-between items-center md:block">
                <span className="sm: text-[15px] md:hidden text-gray-400 font-medium">
                  Subtotal:
                </span>
                <div className="sm: text-red-500 flex items-center justify-end gap-4 font-bold text-[20px]">
                  ${(item.price * item.qty).toFixed(2)}
                  <button
                    onClick={() => deleteCart(item.cid)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => setView("home")}
            className="font-semibold flex items-center gap-2 text-gray-500 lg:font-bold hover:text-[#3BB77E] transition-colors pt-4"
          >
            <ArrowLeft size={18} /> Continue Shopping
          </button>
        </div>

        {/* --- Order Summary --- */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white py-8 px-5 rounded-[30px] shadow-sm border border-gray-300 lg:border-gray-100 sticky top-32">
            <h4 className="text-xl font-semibold text-[black] mb-6 pb-4 border-b">
              Order Summary
            </h4>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-bold text-[#253D4E] text-[24px]">
                  ${subtotals.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-bold text-[#253D4E]">
                  {shipping === 0 ? (
                    <span className="text-[#3BB77E] text-[18px]">Free</span>
                  ) : (
                    <span className="text-red-500 text-[18px]">{`$${shipping.toFixed(2)}`}</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimate Tax (18%)</span>
                <span className="font-bold text-red-500 text-[18px]">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="pt-4 border-t flex justify-between items-end">
                <span className="text-lg font-semibold text-[#253D4E]">Total</span>
                <span className="text-3xl font-black text-green-500 font-semibold">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <button className="w-full bg-[black] text-white py-2.5 lg:py-3 rounded-lg lg:rounded-xl font-semibold text-sm lg:text-lg hover:bg-[black] transition-all flex items-center justify-center gap-3 shadow-lg shadow-white"
              onClick={() => setView('checkout')}>
              Proceed to Checkout <CreditCard size={20} />
            </button>

            <div className="mt-6">
              <p className="text-[10px] text-gray-400 text-center uppercase font-semibold tracking-widest mb-4">
                Secure Payment Options
              </p>
              <img
                src="https://nest-frontend-v6.netlify.app/assets/imgs/theme/payment-method.png"
                alt="Payment"
                className="mx-auto w-[50%]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
