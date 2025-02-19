import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { ShinyButton } from "@/Components/magicui/shiny-button";

const UserProfile = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const [info, setInfo] = useState({});

  useEffect(() => {
    if (user?.email) {
      axiosPublic.get(`/users/${user?.email}`).then((res) => {
        setInfo(res.data);
      });
    }
  }, [user]);

  if (!info) {
    return <span className="loading loading-bars loading-lg"></span>;
  }

  return (
    <div>
      <div
        key={info._id}
        className="p-6  min-h-screen flex justify-center items-center"
      >
        <div className="card w-full md:w-96 bg-white shadow-xl border border-gray-200 rounded-lg">
          <div className="card-body items-center text-center">
            <div className="avatar">
              <div className="w-24 h-24 rounded-full ring ring-blue-400 ring-offset-base-100 ring-offset-2">
                <img src={info?.photo} alt={`${info?.name}'s avatar`} />
              </div>
            </div>
            <div className="badge badge-primary mt-2">{info?.Status}</div>
            <h2 className="card-title text-gray-800 text-2xl font-bold mt-4">
              Name : {info?.name}
            </h2>
            <p className="text-gray-600">
              <span className="font-bold">Email :</span> {info?.email}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">User Id :</span> {info?._id}
            </p>
            <div>
              <ShinyButton
                className=""
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                Update Profile
              </ShinyButton>
            </div>
          </div>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl mb-2">Feature Coming Soon!</h3>
          <p className="text-gray-700">
            We're working hard to bring you this feature. Stay tuned for
            updates!
          </p>
          <div className="modal-action mt-4">
            {" "}
            {/* Added margin top */}
            <form method="dialog">
              <button className="btn btn-primary">Got it</button>{" "}
              {/* Primary button */}
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UserProfile;
