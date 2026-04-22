import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, increment, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import { db } from "./firebaseConfig"

//-----------product added to cart------------------

export const add_To_Cart = async (user, product, qty) => {
    const cartRef = collection(db, 'CART');
    const docRef = await addDoc(cartRef, { ...product, uid: user, qty: qty, createdAt: serverTimestamp() });
    const productRef = doc(db, 'CART', docRef.id);
    await updateDoc(productRef, { cid: docRef.id });
    const userRef = doc(db, 'USERS', user);
    await updateDoc(userRef, { cart: increment(1) });
}

//----------real time listen on Cart Product ----------------

export const listen_To_Cart = (userId, setCartItems) => {
    const cartRef = collection(db, "CART");
    const q = query(cartRef, where("uid", "==", userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const cartItems = snapshot.docs.map((doc) => ({ ...doc.data(), }));
        setCartItems(cartItems);
    });
    return unsubscribe;
};

//------------------productquantity update-----------------

export const change_quantity = async (cid, qty) => {
    const productRef = doc(db, "CART", cid);
    await updateDoc(productRef, { qty: increment(qty) })
}

//-------------------Cart to Order Place then product removes from cart List-----------------

export const remove_Cart_Of_user = async (userId) => {
    try {
        const cartRef = collection(db, "CART");
        const q = query(cartRef, where("uid", "==", userId));
        const snapshot = await getDocs(q);
        const deletePromises = snapshot.docs.map((item) =>
            deleteDoc(doc(db, "CART", item.data().cid))
        );
        await Promise.all(deletePromises);
        const userRef = doc(db, "USERS", userId);
        await updateDoc(userRef, { cart: increment(-1) });
        console.log("All cart items removed for user");
    } catch (error) {
        console.error("Error clearing cart:", error);
    }
};

//-------------------Check out whether the product is already in wishList or not-----------------//


export const add_to_wishlist = async (productid, uid, showToast) => {
    const wishlistRef = doc(db, "WISHLIST", productid.toString());
    const userRef = doc(db, "USERS", uid);

    try {
        const docSnap = await getDoc(wishlistRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.likes?.includes(uid)) {
                await updateDoc(wishlistRef, {
                    likes: arrayRemove(uid),
                });
                await updateDoc(userRef, { wishlist: increment(-1) });
            } else {
                await updateDoc(wishlistRef, {
                    likes: arrayUnion(uid),
                });
                await updateDoc(userRef, { wishlist: increment(1) });
                showToast('Successfully Added to Wishlist ✅', 'success')
            }
        } else {
            await setDoc(wishlistRef, {
                likes: [uid],
            });
            await updateDoc(userRef, { wishlist: increment(1) });
            showToast('Successfully Added to Wishlist ✅', 'success')
        }
    } catch (error) {
        console.error("Wishlist error:", error);
    }
};

//----------------------Listen To WishList reaTime-------------------//

export const listen_To_Wishlist = (productId, setLikes) => {
    const wishlistRef = doc(db, "WISHLIST", productId.toString());
    const unsubscribe = onSnapshot(wishlistRef, (docSnap) => {
        if (docSnap.exists()) {
            setLikes(docSnap.data().likes || []);
        } else {
            setLikes([]);
        }
    });
    return unsubscribe;
};

//----------------------Find user existed product  id ------------------//
//----------------then through those ids find product info ------------//

export const listen_User_Wishlist = (uid, setWishlistIds) => {
    const wishlistRef = collection(db, "WISHLIST");
    const q = query(wishlistRef, where("likes", "array-contains", uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const ids = snapshot.docs.map(doc => doc.id); // --------productIds---------//
        setWishlistIds(ids);
    });
    return unsubscribe;
};

//--------------Now fetching actual data of those products-----------//

export const getWishlistProducts = async (ids) => {
    const productsRef = collection(db, "PRODUCTS");
    const snapshot = await getDocs(productsRef);
    const products = snapshot.docs
        .map(doc => ({ ...doc.data() }))
        .filter(product => ids.includes(product.id.toString()));
    const uniqueProducts = Array.from(new Map(products.map(p => [p.id, p])).values());
    return uniqueProducts;
};

//-------------Fetch Products realtime  listen---------------------//

export const fetch_products = (setProducts) => {
    const collectionRef = collection(db, "PRODUCTS");
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
        const productList = snapshot.docs.map((doc) => ({
            pid: doc.id,
            ...doc.data(),
        }));
        setProducts(productList);
    });
    return unsubscribe;
}

//---------------------Delete Cart-----------------------------//

export const deleteCart = async (id, userId) => {
    try {
        const cartRef = doc(db, "CART", id);
        await deleteDoc(cartRef);
        const userRef = doc(db, "USERS", userId);
        await updateDoc(userRef, { cart: increment(-1) });
        console.log("Cart deleted successfully!");
    } catch (error) {
        console.error("Error deleting cart:", error);
    }
};

//---------------------Real Time Comment-----------------------//

export const Fetch_Comment = (setComments, productid) => {
    const q = query(collection(db, "COMMENT"), where("id", "==", productid), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const comments = snapshot.docs.map(doc => ({
            ...doc.data()
        }));
        setComments(comments)
    });
    return unsubscribe;
}

//-------------------Listen and Fetch Current userInfo-------------//

export const listen_Current_User = (uid, setCurrentUserInfo) => {
    const ref = doc(db, "USERS", uid);
    const unsubscribe = onSnapshot(ref, (docSnap) => {
        if (docSnap.exists()) {
            setCurrentUserInfo(docSnap.data());
        } else {
            setUserInfo(null);
        }
    });
    return unsubscribe;
};

//-----------------Add comment-------------------//

export const add_Comment = async (productId, text, currentuser) => {
    try {
        await addDoc(collection(db, "COMMENT"), {
            id: productId,
            comment: text,
            userId: currentuser.id,
            name: currentuser.name,
            email: currentuser.email,
            createdAt: serverTimestamp()
        });
    } catch (error) {
        console.error("Error adding comment:", error);
    }
};