import { useContext, useState } from "react";
import { AuthContext } from "../context/Authprovider";
import { GlobalApi } from "../context/GlobalContext";

export default function useAppHooks() {
  
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { user } = useContext(AuthContext);

    //----------------------------------------Fetch if user is signed in or not----------------------//

    const { isSignInOpen, setIsSignIn,currentView,setCurrentView ,filteredProducts,selectedProductG,setSelectedProductG} = useContext(GlobalApi);

    //-----------------------------------Function to open Product Details Page-----------------------//

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setSelectedProductG(product)
        setCurrentView("product-detail");
        window.scrollTo(0, 0);
    };
    return {
        currentView, setCurrentView, selectedProduct, setSelectedProduct, user, isSignInOpen, setIsSignIn, handleProductClick,
        filteredProducts,selectedProductG,setSelectedProductG
    }
}