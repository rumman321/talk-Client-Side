import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../Layout/MainLayOut";
import Home from "../Pages/Home/Home";
import Login from "../Components/Login/Login";
import SignUp from "../Components/Signup/SignUp";
import DashBoard from "../Layout/DashBoard";
import AddPost from "../Pages/DashBoard/AddPost/AddPost";
import ManageUser from "../Pages/DashBoard/ManageUser/ManageUser";
import AdminProfile from "../Pages/DashBoard/Admin/AdminProfile";
import Announcement from "../Pages/DashBoard/Admin/Announcement";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/Signup',
            element:<SignUp></SignUp>
        }
    ]
  },
  {
    path:'/dashboard',
    element:<DashBoard></DashBoard>,
    children:[
        {
            path:'addPost',
            element:<AddPost></AddPost>
        },
        //admin
        {
          path:'adminProfile',
          element:<AdminProfile></AdminProfile>
        },
        {
          path:'manageUser',
          element:<ManageUser></ManageUser>
        },
        {
          path:'announcement',
          element:<Announcement></Announcement>
        }
    ]
  }
]);
