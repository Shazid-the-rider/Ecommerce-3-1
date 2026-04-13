import { useContext, useState } from "react";
import { AuthContext } from "../context/Authprovider";
import { GlobalApi } from "../context/GlobalContext";

export default function useCheckOutHooks(setView) {
    const { user } = useContext(AuthContext);
    const { cartItems, setCartItems } = useContext(GlobalApi);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [email, setEmail] = useState("")

    //-------------------------Calculate Cost----------------------//

    const subtotals = cartItems.reduce((acc, item) => {
        return acc + item.price * item.qty;
    }, 0);
    const shipping = subtotals > 1000 ? 0 : 50; // Free shipping over $500
    const tax = subtotals * 0.18; // 18% Tax
    const total = subtotals + shipping + tax;

    //-----------------------Email Validation--------------------//

    const validateEmail = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    };

    const handlePlaceOrder = async () => {
        if (!firstName.trim() || !lastName.trim() || !city.trim() || !zipCode.trim() || !address.trim() || !email.trim() || !validateEmail(email.trim())) {
            return;
        }
        const info = {
            firstName: firstName,
            lastName: lastName,
            city: city,
            zipCode: zipCode,
            address: address,
            items: cartItems,
            createdAt: serverTimestamp(),
            total: total,
            user: user.uid,
        }
        const orderRef = collection(db, 'ORDER');
        const placeRef = await addDoc(orderRef, info);
        const finalRef = doc(db, 'ORDER', placeRef.id);
        await updateDoc(finalRef, { orderPlaceID: placeRef.id });
        console.log('product place successfull');
        setCartItems([]);
        remove_Cart_Of_user(user?.uid);
        setView()
        window.scrollTo(0, 0);
    };
    return {
        user, cartItems, setCartItems, firstName, setFirstName, lastName, setLastName, address, setAddress, city, setCity, zipCode, setZipCode,
        email, setEmail, subtotals, shipping, tax, total, handlePlaceOrder,
    }
}