import React, { useContext } from "react";
import {
  ShoppingCart,
  MapPin,
  PhoneCall,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Clock,
  Headphones,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { GlobalApi } from "../context/GlobalContext";

const Footer = ({ setView }) => {
  const{isSignInOpen, setIsSignIn}=useContext(GlobalApi);
  return (
    <footer className="bg-white pt-5 lg:pt-16 border-t border-gray-100">
      <div className="container mx-auto px-4">
        {/* --- Top Features Bar --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          <div className="sm: border-2 sm: border-gray-300 flex items-center gap-4 bg-white lg:bg-[#F4F6FA] p-6 rounded-lg lg:rounded-2xl group hover:-translate-y-1 transition-transform">
            <Truck className="text-[black] w-10 h-10" />
            <div>
              <h4 className="font-bold text-[#253D4E] font-[poppins]">Fast Delivery</h4>
              <p className="text-xs text-gray-500 font-[poppins]">
                Free delivery on orders over $50
              </p>
            </div>
          </div>
          <div className="sm: border-2 sm: border-gray-300 flex items-center gap-4  bg-white lg:bg-[#F4F6FA] p-6 rounded-lg lg:rounded-2xl group hover:-translate-y-1 transition-transform">
            <ShieldCheck className="text-[black] w-10 h-10" />
            <div>
              <h4 className="font-bold text-[#253D4E] font-[poppins]">Secure Payment</h4>
              <p className="text-xs text-gray-500 font-[poppins]">
                100% secure payment gateway
              </p>
            </div>
          </div>
          <div className="sm: border-2 sm: border-gray-300 flex items-center gap-4 bg-white lg:bg-[#F4F6FA] p-6 rounded-lg lg:rounded-2xl group hover:-translate-y-1 transition-transform">
            <Headphones className="text-[black] w-10 h-10" />
            <div>
              <h4 className="font-bold text-[#253D4E] font-[poppins]">24/7 Support</h4>
              <p className="text-xs text-gray-500 font-[poppins]">Dedicated support team</p>
            </div>
          </div>
         <div className="sm: border-2 sm: border-gray-300 flex items-center gap-4 bg-white lg:bg-[#F4F6FA] p-6 rounded-lg lg:rounded-2xl group hover:-translate-y-1 transition-transform">
            <Clock className="text-[black] w-10 h-10" />
            <div>
              <h4 className="font-bold text-[#253D4E] font-[poppins]">Daily Deals</h4>
              <p className="text-xs text-gray-500 font-[poppins]">
                Unbeatable prices every day
              </p>
            </div>
          </div>
        </div>

        {/* --- Main Footer Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Column 1: Brand & Contact */}
          <div className="lg:col-span-2 space-y-6">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setView("home")}
            >
              <div className="bg-[black] p-2 rounded-lg animate-pulse">
                <ShoppingCart className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-[black] font-[poppins]">
                  SHOPSTIC
                </h1>
                <p className="text-[10px] text-gray-500 tracking-wider font-bold mt-[-4px] font-[poppins]">
                  BIG MEGA SHOP
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-[12px] leading-relaxed max-w-sm font-[poppins]">
              We are a leading e-commerce platform providing high-quality
              products from fresh groceries to the latest electronics.
              Experience the best shopping journey with us.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-gray-600 font-[poppins]">
                <MapPin className="text-[black] w-5 h-5 shrink-0" />
                <span className="font-[poppins]">
                  <strong>Address:</strong> 5171 W Campbell Ave undefined Kent,
                  Utah 53127 United States
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 font-[poppins]">
                <PhoneCall className="text-[black] w-5 h-5 shrink-0" />
                <span className="font-[poppins]">
                  <strong>Call Us:</strong> (+91) - 540-025-124553
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 font-[poppins]">
                <Mail className="text-[black] w-5 h-5 shrink-0" />
                <span className="font-[poppins]">
                  <strong>Email:</strong> sale@Shopstic.com
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Account */}
          <div>
            <h4 className="text-lg font-bold text-[#253D4E] mb-6 font-[poppins]">Account</h4>
            <ul className="space-y-4 text-sm text-gray-600 font-[poppins] font-medium">
              <li className="hover:text-[black] hover:font-bold hover:text-[16px] transition-colors cursor-pointer"
              onClick={()=>setIsSignIn(true)}
              >
                Sign In
              </li>
              <li className="hover:text-[black] hover:font-bold hover:text-[16px] transition-colors cursor-pointer"
              onClick={()=>setView('cart')}
              >
                View Cart
              </li>
              <li className="hover:text-[black] hover:font-bold hover:text-[16px] transition-colors cursor-pointer"
              onClick={()=>setView('wishlist')}
              >
                My Wishlist
              </li>
              <li className="hover:text-[black] hover:font-bold hover:text-[16px] transition-colors cursor-pointer">
                Track My Order
              </li>
              <li className="hover:text-[black] hover:font-bold hover:text-[16px] transition-colors cursor-pointer">
                Shipping Details
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate */}
          <div>
            <h4 className="text-lg font-bold text-[#253D4E] mb-6 font-[poppins]">Corporate</h4>
            <ul className="space-y-4 text-sm text-gray-600 font-medium font-[poppins]">
              <li
                className="hover:text-[black] hover:font-bold hover:text-[16px] transition-colors cursor-pointer"
                onClick={() => setView("home")}
              >
                Home
              </li>
              <li className="hover:text-[black] hover:font-bold hover:text-[16px] transition-colors cursor-pointer">
                About Us
              </li>
              <li className="hover:text-[black] hover:font-bold hover:text-[16px] transition-colors cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-[black] hover:font-bold hover:text-[16px] transition-colors cursor-pointer">
                Terms & Conditions
              </li>
              <li className="hover:text-[black] hover:font-bold hover:text-[16px] transition-colors cursor-pointer">
                Contact Us
              </li>
            </ul>
          </div>

          {/* Column 4: App & Payment */}
          <div>
            <h4 className="text-lg font-bold text-[#253D4E] mb-6">
              Install App
            </h4>
            <p className="text-xs text-gray-500 mb-4">
              From App Store or Google Play
            </p>
            <div className="flex flex-row lg:flex-col gap-3 mb-6">
              <img
                src="https://nest-frontend-v6.netlify.app/assets/imgs/theme/app-store.jpg"
                alt="App Store"
                className="w-28 lg:w-32 cursor-pointer"
              />
              <img
                src="https://nest-frontend-v6.netlify.app/assets/imgs/theme/google-play.jpg"
                alt="Google Play"
                className="w-28 lg:w-32 cursor-pointer"
              />
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Secured Payment Gateways
            </p>
            <img
              src="https://nest-frontend-v6.netlify.app/assets/imgs/theme/payment-method.png"
              alt="Payments"
              className="w-[60%] lg:w-full"
            />
          </div>
        </div>

        {/* --- Bottom Copyright Bar --- */}
        <div className="border-t border-gray-100 py-3 lg:py-8 flex flex-col md:flex-row justify-between items-center ">
          <p className="text-[10px] lg:text-sm text-gray-500 font-[poppins] font-medium">
            © 2026, <strong className="text-[black] font-bold">Shopstic</strong> -
            E-commerce Website. All rights reserved.
          </p>

          <div className="flex items-center gap-4 mt-4">
            <div className="bg-[blue] p-2 rounded-full text-white cursor-pointer hover:scale-110 transition-colors">
              <Facebook size={18} />
            </div>
            <div className="bg-sky-400 p-2 rounded-full text-white cursor-pointer hover:scale-110 transition-colors">
              <Twitter size={18} />
            </div>
            <div className="bg-pink-700 p-2 rounded-full text-white cursor-pointer hover:scale-110 transition-colors">
              <Instagram size={18} />
            </div>
            <div className="bg-red-600 p-2 rounded-full text-white cursor-pointer hover:scale-110 transition-colors">
              <Youtube size={18} />
            </div>
          </div>

          <p className="text-sm text-gray-500 hidden md:block italic">
            Developed by{" "}
            <span className="text-[#3BB77E] font-bold">Your Project</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
