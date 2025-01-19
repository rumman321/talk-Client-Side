import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../Firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";



export const AuthContext = createContext(null);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const googleProvider = new GoogleAuthProvider()
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic()

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signIn = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const googleSignIn=()=>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const logOut =()=>{
        setLoading(true)
        return signOut(auth)
    }
    const updateUserProfile =(name, photo)=>{
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
          })
    }

    useEffect(()=>{
     const unSubscribe =   onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            if(currentUser){
                const userInfo = {email:currentUser.email}
                axiosPublic.post('/jwt', userInfo)
                .then(res =>{
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                        setUser(currentUser);
                        setLoading(false)
                    }
                })

            }
            else{
                //todo
                localStorage.removeItem("access-token")
                setUser(currentUser);
                setLoading(false);
            }
          
            console.log("current user", currentUser);
        })

        return ()=>{
            return unSubscribe()
        }
    },[axiosPublic])
    const authInfo = {
        user,
        setUser,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
        googleSignIn,
    } 
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;