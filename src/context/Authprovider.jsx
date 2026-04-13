import { useEffect, useState } from "react";
import { onAuthStateChanged} from 'firebase/auth';
import { createContext } from "react";
import { auth } from '../../service/firebaseConfig';

export const AuthContext = createContext({
    user: null,
});
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};