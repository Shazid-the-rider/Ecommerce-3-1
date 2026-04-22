import { createContext, useContext, useEffect, useState, } from "react";
import { AuthContext } from "./Authprovider";
import { Fetch_Comment, fetch_products, getWishlistProducts, listen_Current_User, listen_To_Cart, listen_User_Wishlist } from "../../service/firebaseCrudOperation";

export const GlobalApi = createContext();

export const useGlobalApi = () => {
    const ctx = useContext(GlobalApi);
    if (!ctx) throw new Error("useGlobalApi must be used within GlobalContext");
    return ctx;
};

export default function GlobalContext({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [likes, setLikes] = useState([]);
    const [wishlistIds, setWishlistIds] = useState([]);
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [selectedProductG, setSelectedProductG] = useState();
    const [currentView, setCurrentView] = useState("home");
    const [comment, setComment] = useState([]);
    const [currentUserInfo, setCurrentUserInfo] = useState();
    const [searchText, setSearchText] = useState(""); //-----------------------------searching product ------------------//
    const [filteredProducts, setFilteredProducts] = useState([]); //----------------product filtering------------------//

    //------------Current User Info---------//

    useEffect(() => {
        if (!user?.uid) {
            setCurrentUserInfo(null);
            return;
        }
        const unsubscribe = listen_Current_User(user.uid, setCurrentUserInfo);
        return () => unsubscribe();
    }, [user]);

    //------------Comment-------------------//

    useEffect(() => {
        if (!selectedProductG?.id) return;
        const unsubscribe = Fetch_Comment(setComment, selectedProductG.id);
        return unsubscribe
    }, [selectedProductG])

    //------------continuous product change ------------//

    useEffect(() => {
        if (searchText.trim().length === 0) {
            setFilteredProducts([]);
            setCurrentView("home");
        } else {
            const filtered = products.filter((p) =>
                p.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredProducts(filtered);
            setCurrentView("search");
        }
    }, [searchText, products]);

    //------------Toast message Showing---------------//


    const [toast, setToast] = useState({ show: false, message: "", type: "" });
    const showToast = (message, type = "error") => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: "", type: "" });
        }, 3000);
    };

    //----------listen to cart realtime-------------------

    useEffect(() => {
        if (!user) {
            return;
        }
        const unsubscribe = listen_To_Cart(user.uid, setCartItems);
        return unsubscribe;
    }, [user])

    //-----------WishList id-----------------------------//

    useEffect(() => {
        if (!user?.uid) return;
        const unsubscribe = listen_User_Wishlist(user.uid, setWishlistIds);
        return () => unsubscribe();
    }, [user]);


    //-------------------Get WishList Product----------------//

    useEffect(() => {
        const fetchData = async () => {
            const data = await getWishlistProducts(wishlistIds);
            setWishlistProducts(data);
        };
        if (wishlistIds.length) fetchData();
    }, [wishlistIds]);
    useEffect(() => {
        console.log(wishlistProducts.length);
        console.log(wishlistProducts)
    }, [wishlistIds])

    //-----------------FETCH Products ---------------------//

    useEffect(() => {
        const unsubscribe = fetch_products(setProducts);
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        console.log(comment)
    }, [comment])

    const [isSignInOpen, setIsSignIn] = useState(false); //-------------user signup field-----------//
    const [action, setAction] = useState('login') //----------Signup/login state----------------//
    return (
        <GlobalApi.Provider value={{ isSignInOpen, searchText, toast, comment,currentUserInfo, setComment, setToast, selectedProductG, setSelectedProductG, showToast, setSearchText, products, currentView, filteredProducts, setCurrentView, setProducts, setIsSignIn, wishlistProducts, wishlistIds, action, setAction, cartItems, setCartItems, likes, setLikes }}>
            {children}
        </GlobalApi.Provider>
    );
}
