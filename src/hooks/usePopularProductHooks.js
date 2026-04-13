import { useContext } from "react";
import { GlobalApi } from "../context/GlobalContext";

export default function usePopularProductHooks(){
  const {products,toast, setToast,showToast}=useContext(GlobalApi);
  const popularProducts = products.filter((product) => product.isPopular);
  return{
    products,popularProducts,toast, setToast,showToast
  }
}