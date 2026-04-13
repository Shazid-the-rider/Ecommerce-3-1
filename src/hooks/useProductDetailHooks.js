import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Authprovider";
import { GlobalApi } from "../context/GlobalContext";
import { listen_To_Wishlist } from "../../service/firebaseCrudOperation";

export default function useProductDetailHooks(product) {

    const [qty, setQty] = useState(1); //---------------select quantity----------------//
    const { user } = useContext(AuthContext);
    const { cartItems, likes, setLikes, setIsSignIn,toast, setToast,showToast, } = useContext(GlobalApi);

    //--------------------Toast message-------------------//

    //----------check whether product is already in cart or not------------//

    if (!product) return null;
    const isInCart = cartItems?.some(item => item.id === product.id);

    //-----------------Listening added for wishist---------------//

    useEffect(() => {
        if (!product?.id) return;
        const unsubscribe = listen_To_Wishlist(product.id, setLikes);
        return () => unsubscribe();
    }, [product?.id]);

    //----------------Find the user in Like list----------------//
    const isLiked = likes.includes(user?.uid);

    return {
        qty, setQty, user, cartItems, likes, setLikes, toast, setToast, showToast, isInCart, isLiked, setIsSignIn,toast, setToast,showToast,
    }
}