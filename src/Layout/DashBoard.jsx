import { FaHome, FaList, FaMicrophone } from "react-icons/fa";
import { MdAssignmentAdd, MdPerson, MdReport } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";

const DashBoard = () => {
  const [isAdmin] = useAdmin();

  return (
    <div className="drawer w-full md:w-10/12 mx-auto lg:drawer-open">
      {/* Drawer toggle button for mobile devices */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Main content */}
        <div className="p-6">
          <Outlet />
        </div>
        {/* Mobile toggle button */}
        <label
          htmlFor="dashboard-drawer"
          className="btn btn-primary drawer-button lg:hidden fixed bottom-4 right-4 z-50"
        >
          Menu
        </label>
      </div>

      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 bg-orange-500 text-white h-full">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminProfile" className="hover:bg-orange-600">
                  <MdPerson /> Admin Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageUser" className="hover:bg-orange-600">
                  <FaHome /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/report" className="hover:bg-orange-600">
                  <MdReport/> Reported Comments
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/announcement" className="hover:bg-orange-600">
                  <FaMicrophone /> Make Announcement
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userProfile" className="hover:bg-orange-600">
                  <FaHome /> My Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/userAddPost" className="hover:bg-orange-600">
                  <MdAssignmentAdd /> Add Post
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myPost" className="hover:bg-orange-600">
                  <FaList /> My Posts
                </NavLink>
              </li>
            </>
          )}
          <div className="divider"></div>
          <li>
            <NavLink to="/" className="hover:bg-orange-600">
              <FaHome /> Home
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
