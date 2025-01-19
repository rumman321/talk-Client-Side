import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import GoogleLogin from "../SharedComponents/GoogleLogin";
import Swal from "sweetalert2";

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
        console.log(email,password);
        signIn(email,password)
        .then(res=>{
            const user = res.user
            console.log(user);
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
      <div className="pt-32 text-center">
        <div className="min-h-screen flex justify-center items-center">
          <div className="card bg-base-100 w-full max-w-lg p-10 shrink-0 shadow-2xl">
            <h2 className="font-bold text-2xl text-center">
              Login your account
            </h2>
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
            <br />
            <GoogleLogin></GoogleLogin>

            <p className="text-center font-semibold">
              Don't have an account ?{" "}
              <Link className="text-red-600" to="/Signup">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
