import { Outlet } from "react-router-dom";
import Navber from "../Components/Navber/Navber";


const MainLayOut = () => {
    return (
        <div>
            <h2 className="text-center">Main LayOut </h2>
            <Navber></Navber>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayOut;