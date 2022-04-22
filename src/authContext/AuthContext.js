// React imports
import { createContext, useContext, useEffect, useState } from 'react';

// Component imports
import Loader from '../components/layouts/Loader'

// Firebase authentication methods imports
import { auth } from '../firebase';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged } from 'firebase/auth';

// Create context
const authContext = createContext();

// Function that contains all auth methods and provides them to the context
export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Authentication functions - all methods from the auth module must contain the 'auth' method
    // Register function
    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Login function
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Logout function
    const logout = () => {
        return signOut(auth);
    }

    // Whenever one of the above methods is called, detect the change in user with the firebase
    // onAuthStateChanged method and set the user state to the user object it returns
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        });
        return () => {
            unsubscribe();
        }
    }, [])

    // onAuthStateChanged is asynchronous and resolves null for a microsocond on page load/refresh, so while
    // is resolving show a loader. Otherwise, per the code in ProtectedRoute, if theres no user it will show
    // login page. 
    if(loading) return <Loader />

    // Return the context with the provider attached, providing all auth methods above and the user state
    // so that they can be used globally throughout the app via the useContext hook below
    return <authContext.Provider value={{ user, signup, login, logout, loading }}>{children}</authContext.Provider>;
}

// Custom hook containing the react useContext hook, with which you cam call all methods in the context
// provider 
export const useAuth = () => {
    return useContext(authContext);
}
