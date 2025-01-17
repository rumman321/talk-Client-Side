import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import GoogleLogin from "../SharedComponents/GoogleLogin";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SignUp = () => {
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
  const { createUser, updateUserProfile, setUser } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    createUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        setUser(res.user);
        updateUserProfile(data.name, data.photo)
          .then(() => {
            
            //create user in db
            const userInfo={
                name:data?.name,
                email:data?.email,
                photo:data?.photo
            }
            axiosPublic.post('/users',userInfo)
            .then(res=>{
                console.log(res.data);
                if(res.data.insertedId){
                    reset()
                    navigate('/')
                }
            })
            
          })
          .catch((error) => {
            console.error("Error updating profile:", error);
          });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                />
              </div>
              {/* errors will return when field validation fails  */}
              {errors.name && (
                <span className="text-red-600">Name is required</span>
              )}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  type="text"
                  {...register("photo", { required: true })}
                  name="photo"
                  placeholder="Photo URL"
                  className="input input-bordered"
                />
              </div>
              {/* errors will return when field validation fails  */}
              {errors.photo && (
                <span className="text-red-600">Photo is required</span>
              )}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  {...register("email", { required: true })}
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              {errors.email && (
                <span className="text-red-600">email is required</span>
              )}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%#*?&]+$/,
                  })}
                  placeholder="password"
                  className="input input-bordered"
                />
              </div>
              {errors.password?.type === "required" && (
                <span className="text-red-600">Password is required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-600">
                  Password must be 6 characters or more
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-600">
                  Password must have one uppercase letter, one special
                  character, one digit, and one lowercase letter
                </span>
              )}

              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Sign Up"
                  className="btn btn-primary"
                />
              </div>
            </form>
            <p className="text-center">
              {" "}
              Already Have an Account ?{" "}
              <Link className="text-red-600" to="/login">
                {" "}
                login
              </Link>{" "}
            </p>
            <GoogleLogin></GoogleLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
