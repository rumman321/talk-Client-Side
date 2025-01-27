import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { MdNotifications } from "react-icons/md";
import { useEffect, useState } from "react";

const Navber = () => {
  const { user, logOut } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [announcements, setAnnouncements] = useState([]);

 
  useEffect(()=>{
    axiosPublic
      .get("/announcement")
      .then((response) => {
        setAnnouncements(response.data);
      })
      
    
  },[axiosPublic])

  const logout = () => {
    logOut();
  };
  const linkOption = (
    <>
      <li>
        <Link to='/'>
        <a>Home</a>
        </Link>
      </li>

      <li>
        <Link to="/memberShip">
          <a>Membership</a>
        </Link>
      </li>
      <li>
        <Link to='/notification'>
        <button className=" flex items-center">
          <MdNotifications size={25}></MdNotifications>
          <div className="badge">+ {announcements.length}</div>
        </button>
        </Link>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar w-10/12 mx-auto  bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {linkOption}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl font-bold">Talk</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{linkOption}</ul>
        </div>
        <div className="navbar-end">
          {user?.email && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt={user?.displayName} src={user?.photoURL} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    {user?.displayName}
                  </a>
                </li>
                <li>
                  <NavLink to="/dashboard">
                    <a>Dashboard</a>
                  </NavLink>
                </li>
                <li>
                  <a onClick={logout} className="btn">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          )}
          {user?.email ? (
            " "
          ) : (
            <Link to="/login">
              <a className="btn">Join Us</a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navber;
