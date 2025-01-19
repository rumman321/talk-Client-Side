import { Form, Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const Privateroute = ({children}) => {
     const {user,loading} = useAuth()
     const location = useLocation()
    if(loading){
        return <span className="loading loading-bars loading-lg"></span> 
    }
     if(user){
        return children
     }

    return <Navigate to="/login" state={{from:location}}></Navigate>
};

export default Privateroute;