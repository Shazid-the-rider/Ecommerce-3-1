import { useContext, useEffect, useState } from "react";
import { GlobalApi } from "../context/GlobalContext";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../service/firebaseConfig";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { AuthContext } from "../context/Authprovider";

export default function useHeaderHooks(setView) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const { user } = useContext(AuthContext);
    const [location, setLocation] = useState("Detecting location...");//---------location-------------//
    const { action, setAction, isSignInOpen, setIsSignIn, cartItems, wishlistProducts, wishlistIds, searchText, setSearchText, setWishlistProducts, setCartItems, setWishlistIds, setLikes, currentUserInfo, setCurrentUserInfo, fetchOrder,
        userType, setUserType, adminSignIn, setAdminSignIn } = useContext(GlobalApi);//----------------variable extract--------------//

    const [toast, setToast] = useState({ show: false, message: "", type: "" }); //------------- "error" or "success"----------//

    //-------------Form Variable-----------------//
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [email, setEmail] = useState("");

    //------------Show Toast Message-------------//
    const showToast = (message, type = "error") => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: "", type: "" });
        }, 3000);
    };

    //---------SignUp Logic-----------------//

    const handleSignup = async () => {
        // --------- Empty Check ----------
        if (!email.trim() || !password.trim() || !cpassword.trim() || !name.trim()) {
            return showToast("All fields are required");
        }
        // --------- Email Validation ----------
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return showToast("Invalid email format");
        }
        // --------- Password Length ----------
        if (password.length < 6) {
            return showToast("Password must be at least 6 characters");
        }
        // --------- Confirm Password ----------
        if (password !== cpassword) {
            return showToast("Passwords do not match");
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            //-------userinfo stored in -------//
            const userRef = doc(db, 'USERS', user.uid);
            await setDoc(userRef, {
                id: user.uid,
                name: name.trim(),
                email: email.trim(),
                cart: 0,
                order: 0,
                wishlist: 0,
                cratedAt: serverTimestamp()
            })
            showToast("Signup Successful", "success");
            setTimeout(() => {
                setIsSignIn(false)
            }, 4000)

        } catch (error) {
            console.log(error);
            // -------- Firebase Error Handling ----------
            switch (error.code) {
                case "auth/email-already-in-use":
                    showToast("Email already in use");
                    break;
                case "auth/invalid-email":
                    showToast("Invalid email");
                    break;
                case "auth/weak-password":
                    showToast("Weak password");
                    break;
                default:
                    showToast("Something went wrong");
            }
        }
    };

    const handleNavClick = (viewName) => {
        setView(viewName);
        setIsMenuOpen(false);
    };

    const navLinks = [
        { name: "Home", view: "home" },
        { name: "Fashion", view: "Fashion" },
        { name: "Electronics", view: "Electronics" },
        { name: "Bags", view: "Bags" },
        { name: "Footwear", view: "Footwear" },
        { name: "Groceries", view: "Groceries" },
    ];

    const handleLogin = async () => {

        // --------- Empty Check ----------
        if (!email.trim() || !password.trim()) {
            return showToast("All fields are required");
        }
        // --------- Email Validation ----------
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return showToast("Invalid email format");
        }
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            showToast("Login Successful", "success");
            setTimeout(() => {
                setIsSignIn(false);
            }, 3000);

        } catch (error) {
            console.log(error);
            // -------- Firebase Error Handling ----------//
            switch (error.code) {
                case "auth/user-not-found":
                    showToast("User not found");
                    break;
                case "auth/wrong-password":
                    showToast("Incorrect password");
                    break;
                case "auth/invalid-email":
                    showToast("Invalid email");
                    break;
                case "auth/too-many-requests":
                    showToast("Too many attempts, try again later");
                    break;
                default:
                    showToast("Login failed");
            }
        }
    };

    useEffect(() => {
        try {
            if (!navigator.geolocation) {
                setLocation("Geolocation not supported");
                return;
            }

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    try {
                        const res = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                        );

                        const data = await res.json();

                        setLocation(
                            data.address.city ||
                            data.address.town ||
                            data.address.village ||
                            data.address.state ||
                            "Unknown location"
                        );

                    } catch (err) {
                        setLocation("Unable to fetch location");
                    }
                },
                (error) => {
                    console.log("Geo error:", error);

                    if (error.code === 1) {
                        setLocation("Permission denied");
                    } else {
                        setLocation("Location error");
                    }
                }
            );
        } catch (e) {
            setLocation("Geolocation failed");
        }
    }, []);

    return {
        isMenuOpen, setIsMenuOpen, isCategoryOpen, setIsCategoryOpen, isSignInOpen, setIsSignIn, action, setAction, userType, setUserType,
        toast, setToast, name, setName, password, setPassword, cpassword, setCPassword, email, setEmail, showToast, adminSignIn, setAdminSignIn,
        handleSignup, handleNavClick, navLinks, cartItems, wishlistProducts, wishlistIds, handleLogin, user, searchText, setSearchText,
        setWishlistProducts, setCartItems, setWishlistIds, setLikes, currentUserInfo, setCurrentUserInfo, fetchOrder, location, setLocation
    }

}