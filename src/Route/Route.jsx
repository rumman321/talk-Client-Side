import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../Layout/MainLayOut";
import Home from "../Pages/Home/Home";
import Login from "../Components/Login/Login";
import SignUp from "../Components/Signup/SignUp";
import DashBoard from "../Layout/DashBoard";
import ManageUser from "../Pages/DashBoard/ManageUser/ManageUser";
import AdminProfile from "../Pages/DashBoard/Admin/AdminProfile";
import Announcement from "../Pages/DashBoard/Admin/Announcement";
import MemberShip from "../Pages/MemberShip/MemberShip";
import Privateroute from "./Privateroute";
import Notification from "../Pages/Notification/Notification";
import UserProfile from "../Pages/DashBoard/user/UserProfile";
import UserAddPost from "../Pages/DashBoard/user/UserAddPost";
import PostDetails from "../Components/PostCard/PostDetails";
import MyPost from "../Pages/DashBoard/user/MyPost";
import CommentDetails from "../Components/Comment/CommentDetails";
import Report from "../Pages/DashBoard/Admin/Report";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/postDetail/:id",
        element: <Privateroute><PostDetails></PostDetails></Privateroute>,
      },
      {
        path: "/memberShip",
        element: (
          <Privateroute>
            <MemberShip></MemberShip>
          </Privateroute>
        ),
      },
      {
        path: "/notification",
        element: <Notification></Notification>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/Signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Privateroute><DashBoard></DashBoard></Privateroute>,
    children: [
      {
        path: "/dashboard",
        
        element: <UserProfile></UserProfile>,
      },
      {
        path: "userAddPost",
        
        element: <UserAddPost></UserAddPost>,
      },
      {
        path: "userProfile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "myPost",
        element: <MyPost></MyPost>,
      },
      {
        path: "/dashboard/commentDetails/:id",
        element: <CommentDetails></CommentDetails>
      },
      //admin
      {
        path: "adminProfile",
        element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>,
      },
      {
        path: "manageUser",
        element: <AdminRoute><ManageUser></ManageUser></AdminRoute>,
      },
      {
        path:'report',
        element:<AdminRoute><Report></Report></AdminRoute>
      },
      {
        path: "announcement",
        element: <AdminRoute><Announcement></Announcement></AdminRoute>,
      },
    ],
  },
]);
