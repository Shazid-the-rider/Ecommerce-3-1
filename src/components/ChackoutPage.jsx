import React, { useContext, useState } from 'react';
import { CheckCircle, CreditCard, Truck, ArrowLeft, ShieldCheck } from 'lucide-react';
import { GlobalApi } from '../context/GlobalContext';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../service/firebaseConfig';
import { AuthContext } from '../context/Authprovider';
import { remove_Cart_Of_user } from '../../service/firebaseCrudOperation';
import useCheckOutHooks from '../hooks/useCheckOutHooks';
import { AnimatePresence,motion  } from 'framer-motion';


const CheckoutPage = ({ setView }) => {

  const { user, cartItems, setCartItems, firstName, setFirstName, lastName, setLastName, address, setAddress, city, setCity, zipCode, setZipCode,
    email, setEmail, subtotals, shipping, tax, total, handlePlaceOrder,toast } = useCheckOutHooks(setView);
  return (
  
    <div className="container mx-auto px-4 py-12 font-[poppins] relative">
      <button onClick={() => setView('cart')} className="flex items-center gap-2 text-gray-600 font-semibold mb-8 hover:text-[black]">
        <ArrowLeft size={18} /> Back to Cart
      </button>

      <form onSubmit={null} className="flex flex-col lg:flex-row gap-12">

        {/* ------------------------------------Left: Shipping & Payment --------------------------- */}

        <div className="w-full lg:w-2/3 space-y-8">

          {/*-----------------------------------Shipping Form----------------------------- */}

          <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-[#253D4E] mb-8 flex items-center gap-3">
              <Truck className="text-[black]" /> Shipping Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input required type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className="w-full bg-gray-100 px-6 py-2 lg:py-4 rounded-md outline-none focus:ring-2 ring-[black]/20 border border-transparent focus:border-[black] transition-all" />
              <input required type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className="w-full bg-gray-100 px-6 py-2 lg:py-4 rounded-md outline-none focus:ring-2 ring-[black]/20 border border-transparent focus:border-[black] transition-all" />
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address"  className="w-full bg-gray-100 px-6 py-2 lg:py-4 rounded-md md:col-span-2 outline-none focus:ring-2 ring-[black]/20 border border-transparent focus:border-[black] transition-all"/>
              <input required type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street Address" className="w-full bg-gray-100 px-6 py-2 lg:py-4 rounded-md md:col-span-2 outline-none focus:ring-2 ring-[black]/20 border border-transparent focus:border-[black] transition-all"/>
              <input required type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="w-full bg-gray-100 px-6 py-2 lg:py-4 rounded-md outline-none focus:ring-2 ring-[black]/20 border border-transparent focus:border-[black] transition-all" />
              <input required type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder="ZIP Code" className="w-full bg-gray-100 px-6 py-2 lg:py-4 rounded-md outline-none focus:ring-2 ring-[black]/20 border border-transparent focus:border-[black] transition-all"/>
            </div>
          </div>

          {/*------------------------------------Payment Method------------------------------*/}

          <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-gray-100">
            <h3 className="text-xl lg:text-2xl font-bold text-[#253D4E] mb-8 flex items-center gap-3">
              <CreditCard className="text-[black]" /> Payment Method
            </h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-6 border-2 border-[black] bg-gray-100 rounded-2xl cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full border-4 border-[black] bg-white"></div>
                  <span className="font-bold text-[#253D4E]">Cash on Delivery</span>
                </div>
                <Truck size={24} className="text-[black]" />
              </label>
              <label className="flex items-center justify-between p-6 border-2 border-gray-100 rounded-2xl cursor-not-allowed opacity-50">
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white"></div>
                  <span className="font-bold text-[#253D4E]">Credit / Debit Card (Coming Soon)</span>
                </div>
                <CreditCard size={24} className="text-gray-400" />
              </label>
            </div>
          </div>
        </div>

        {/* ---------------------------------------Right: Order Summary -------------------------------*/}

        <div className="w-full lg:w-1/3">
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 sticky top-32">
            <h4 className="text-xl font-bold text-[#253D4E] mb-6 pb-4 border-b">Order Summary</h4>

            <div className="max-h-60 overflow-y-auto mb-6 pr-2 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                      <img src={item.image} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-sm font-bold text-[#253D4E] line-clamp-1">{item.name} x {item.qty}</span>
                  </div>
                  <span className="text-lg font-bold text-[#253D4E]">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-8 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-bold text-[#253D4E] text-2xl">${subtotals.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span className="font-bold text-[19px] text-[red]">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Tax (18%)</span>
                <span className="font-semibold text-[19px] text-[red]">${tax.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t flex justify-between items-end">
                <span className="text-lg font-semibold text-[#253D4E]">Total Payable</span>
                <span className="text-3xl font-semibold text-[#3BB77E]">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => handlePlaceOrder()}
              type="button"
              className="w-full bg-black text-white py-2 lg:py-3 rounded-lg lg:rounded-xl font-semibold text-lg lg:text-xl hover:bg-[#253D4E] transition-all flex items-center justify-center gap-3 shadow-xl shadow-green-100"
            >
              Place Order Now
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-[#3BB77E]">
              <ShieldCheck size={18} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Safe & Secure Checkout</span>
            </div>
          </div>
        </div>

      </form>
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
    
   
  );
};

export default CheckoutPage;