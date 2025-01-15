import { Outlet } from "react-router-dom";


const MainLayOut = () => {
    return (
        <div>
            <h2 className="text-center">Main LayOut </h2>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayOut;