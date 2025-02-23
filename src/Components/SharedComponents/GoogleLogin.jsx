import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const GoogleLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate()
  const handleGoogleSign = () => {
    googleSignIn()
    .then(res=>{
     
      const userInfo ={
          email: res?.user?.email,
          name: res?.user?.displayName,
          Status:'silver',
          photo:res?.user?.photoURL
      }
      axiosPublic.post("/users", userInfo)
      .then(res =>{
         
          navigate("/")
      })
  })
  };
  return (
    <div>
      <div>
        <h2 className="font-semibold text-center ">OR</h2>
        <div className="flex flex-col gap-5 mt-5">
          <button className="btn" onClick={handleGoogleSign}>
            <FcGoogle></FcGoogle>Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoogleLogin;
