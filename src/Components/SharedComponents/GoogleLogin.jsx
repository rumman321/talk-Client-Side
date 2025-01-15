import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate()
  const handleGoogleSign = () => {
    googleSignIn().then((res) => {
      navigate("/");
    });
  };
  return (
    <div>
      <div>
        <h2 className="font-semibold ">OR</h2>
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
