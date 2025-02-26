import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link, NavLink } from "react-router-dom";
import { MdNotifications } from "react-icons/md";

const Navber = () => {
  const { user, logOut } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [announcements, setAnnouncements] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // ✅ Mobile dropdown state
  const [isContactActive, setIsContactActive] = useState(false); // ✅ Track Contact button state

  useEffect(() => {
    axiosPublic.get("/announcement").then((response) => {
      setAnnouncements(response.data);
    });
  }, []);

  const logout = () => {
    logOut();
  };

  const handleNavClick = (scrollTo) => {
    document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false); // ✅ Close dropdown on click
    setIsContactActive(true); // ✅ Mark Contact as active
    setTimeout(() => setIsContactActive(false), 2000); // ✅ Reset after 2 sec
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { label: "Contact", scrollTo: "footer" },
  ];

  if (user) {
    navLinks.push(
      { path: "/memberShip", label: "Membership" },
      {
        custom: (
          <p key="notification">
            <NavLink
              to="/notification"
              className={({ isActive }) =>
                `flex items-center p-1 ${
                  isActive
                    ? "bg-red-500 text-white font-semibold rounded-lg transition duration-300"
                    : "hover:text-red-500 hover:font-bold"
                } md:ml-5 border shadow-xl rounded-md sm:mt-2 md:m-0`
              }
              onClick={() => setIsOpen(false)} // ✅ Close dropdown on click
            >
              <MdNotifications size={25} />
              <div className="badge">+ {announcements.length}</div>
            </NavLink>
          </p>
        ),
      }
    );
  }

  return (
    <div>
      <div className="navbar w-full mx-auto bg-base-100">
        <div className="navbar-start">
          {/* Mobile Dropdown Button */}
          <div className="relative lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="btn btn-ghost"
              aria-expanded={isOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
            </button>

            {/* Dropdown Menu (Mobile) */}
            {isOpen && (
              <ul className="absolute left-0 mt-3 w-52 bg-base-100 shadow-lg rounded-lg p-2">
                {navLinks.map((link, index) =>
                  link.custom ? (
                    link.custom
                  ) : link.path ? (
                    <p key={index} className="pl-3">
                      <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                          `${
                            isActive
                              ? "bg-red-500 text-white font-semibold rounded-lg transition duration-300"
                              : "hover:text-red-500 hover:font-bold"
                          } p-2 block`
                        }
                        onClick={() => setIsOpen(false)} // ✅ Close dropdown on click
                      >
                        {link.label}
                      </NavLink>
                    </p>
                  ) : (
                    <p key={index} className="pl-3">
                      <button
                        onClick={() => handleNavClick(link.scrollTo)}
                        className={`p-2 block ${
                          isContactActive
                            ? "bg-red-500 text-white font-semibold rounded-lg transition duration-300"
                            : "hover:text-red-500 hover:font-bold"
                        }`}
                      >
                        {link.label}
                      </button>
                    </p>
                  )
                )}
              </ul>
            )}
          </div>
          <a className="btn btn-ghost text-xl font-bold">Talk</a>
        </div>

        {/* Desktop Navbar */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal pr-5 font-bold items-center">
            {navLinks.map((link, index) =>
              link.custom ? (
                link.custom
              ) : (
                <p key={index} className="pl-5">
                  {link.path ? (
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "bg-red-500 text-white font-semibold rounded-lg transition duration-300"
                            : "hover:text-red-500 hover:font-bold"
                        } p-2 border shadow-xl rounded-md`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ) : (
                    <button
                      onClick={() => handleNavClick(link.scrollTo)}
                      className={`p-2 border shadow-xl rounded-md ${
                        isContactActive
                          ? "bg-red-500 text-white font-semibold rounded-lg transition duration-300"
                          : "hover:text-red-500 hover:font-bold"
                      }`}
                    >
                      {link.label}
                    </button>
                  )}
                </p>
              )
            )}
          </ul>
        </div>

        {/* User Profile / Login Button */}
        <div className="navbar-end">
          {user?.email && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full ring ring-blue-400">
                  <img alt={user?.displayName} src={user?.photoURL} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">{user?.displayName}</a>
                </li>
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <button onClick={logout} className="btn btn-sm">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
          {!user?.email && (
            <Link to="/login">
              <button className="btn bg-orange-600">Join Us</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navber;
