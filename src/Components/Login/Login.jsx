import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import GoogleLogin from "../SharedComponents/GoogleLogin";
import Swal from "sweetalert2";
import lottieLogin from "../../assets/myLottie/login2.json"
import Lottie from "lottie-react";

const Login = () => {
    const [error, setError] = useState({});
    const {signIn} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const email = form.get("email");
        const password = form.get("password");
       
        signIn(email,password)
        .then(res=>{
            const user = res.user
           
            Swal.fire({
              title: "Sign In Success!",
              icon: "success",
              draggable: true
            });
            navigate(from, { replace: true })
        })
    }
  return (
    <div>
      <div className=" text-center">
        <div className="min-h-screen flex flex-col lg:flex-row-reverse justify-center items-center">
        <div>
        <h1 className="text-3xl text-center font-bold">Login Your Account</h1>
        <div className="w-96">
          <Lottie animationData={lottieLogin} loop={true} ></Lottie>
        </div>
        </div>
          <div className="card bg-base-100 w-full max-w-lg p-10 shrink-0 shadow-2xl">
            
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                {error.login && (
                  <label className="label text-red-600">{error.login}</label>
                )}
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary rounded-sm">Login</button>
              </div>
            </form>
            
            <GoogleLogin></GoogleLogin>

            <p className="text-center font-semibold">
              Don't have an account ?{" "}
              <Link className="text-red-600" to="/Signup">
               <span className="font-bold">Sign up</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
