import { useContext } from "react";
import { GlobalApi } from "../context/GlobalContext";

export default function useWishList(){
     const { wishlistProducts } = useContext(GlobalApi);
     return{
        wishlistProducts
     }
}