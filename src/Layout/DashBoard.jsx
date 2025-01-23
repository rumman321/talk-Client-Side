
import { FaHome, FaList, FaMicrophone } from "react-icons/fa";
import { MdAssignmentAdd, MdPerson } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";


const DashBoard = () => {
  //todo 
  const [isAdmin] = useAdmin()
    return (
        <div>
            <div className="flex">
      {/* sidebar */}
      <div className="w-64 min-h-screen bg-orange-500 ">
        <ul className="menu">
          
            {
              isAdmin ? <>
              <li>
                <NavLink to="/dashboard/adminProfile">
                 
                  <MdPerson></MdPerson> Admin Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageUser">
                 
                  <FaHome></FaHome> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/announcement">
                 
                  <FaMicrophone></FaMicrophone> Make Announcement
                </NavLink>
              </li>
             
              </> :
              <>
              
             
              
              <li>
                <NavLink to="/dashboard/userProfile">
                 
                  <FaHome></FaHome> My Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/userAddPost">
                 
                <MdAssignmentAdd /> Add Post
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myPost">
                 
                <FaList /> My Posts
                </NavLink>
              </li>
              

             
            </>
            }
        
          <div className="divider "></div>
          <li>
            <NavLink to="/">
              {" "}
              <FaHome></FaHome> Home
            </NavLink>
          </li>
         
        </ul>
      </div>
      {/* main content */}
      <div className="flex-1 border-green-500 border-2 p-10">
        <Outlet></Outlet>
      </div>
    </div>
        </div>
    );
};

export default DashBoard;