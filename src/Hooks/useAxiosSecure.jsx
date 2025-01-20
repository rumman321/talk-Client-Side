import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
  });

const useAxiosSecure = () => {
  const navigate = useNavigate()
  const {logOut} = useAuth()
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      // console.log("request stop by interceptor", token);
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  // interceptor 401 / 403
  // Add a response interceptor
  axiosSecure.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
      async(error)=> {
        const status = error.response.status
        // console.log("status error interceptor", error);
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      //logout user and move to login page
      if(status== 401 || status == 403){
         await logOut()
        navigate("/login")
      }
      return Promise.reject(error);
    }
  );
    return axiosSecure
};

export default useAxiosSecure;