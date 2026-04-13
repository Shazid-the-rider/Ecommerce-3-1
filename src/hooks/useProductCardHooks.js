import { useContext } from "react";
import { GlobalApi } from "../context/GlobalContext";
import { AuthContext } from "../context/Authprovider";

export const useProductCardHooks=(product)=>{
    const {wishlistProducts,cartItems,setIsSignIn}= useContext(GlobalApi);
      const {user}= useContext(AuthContext);
     
      const isInCart = cartItems?.some(item => item.id === product.id);
      const discount = product.oldPrice
        ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
        : null;
    
      const isInWishlist = wishlistProducts?.some((item) => item.id === product.id);
      return{
        wishlistProducts,cartItems,user,isInCart,discount,isInWishlist,setIsSignIn
      }
}