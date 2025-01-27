import { Outlet } from "react-router-dom";
import Navber from "../Components/Navber/Navber";
import Footer from "../Components/Footer/Footer";

const MainLayOut = () => {
  return (
    <div>
      {/* Fixed navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="w-full md:w-10/12 mx-auto">
          <Navber></Navber>
        </div>
      </div>

      {/* Content below the navbar */}
      <div className="pt-16 w-full md:w-10/12 mx-auto">
        {/* Add padding to ensure content doesn't overlap with the navbar */}
        <Outlet></Outlet>
      </div>
      <div className="pt-16 w-full md:w-10/12 mx-auto">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default MainLayOut;
