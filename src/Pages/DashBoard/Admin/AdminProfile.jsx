import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const [info, setInfo] = useState(null);

  useEffect(() => {
    axiosPublic.get(`/users/${user?.email}`).then((res) => {
      console.log(res.data);
      setInfo(res.data);
    });
  }, [user]);

  if(!info){
    return <span className="loading loading-bars loading-lg"></span>
  }

  return (
    <div>
      <h1>admin</h1>
     
        <div key={info._id} className="p-6  min-h-screen flex justify-center items-center">
          <div className="card w-full md:w-96 bg-white shadow-xl border border-gray-200 rounded-lg">
            <div className="card-body items-center text-center">
              <div className="avatar">
                <div className="w-24 h-24 rounded-full ring ring-blue-400 ring-offset-base-100 ring-offset-2">
                  <img src={info?.photo} alt={`${info?.name}'s avatar`} />
                </div>
              </div>
              <h2 className="card-title text-gray-800 text-2xl font-bold mt-4">
                {info?.name}
              </h2>
              <p className="text-gray-600">{info?.email}</p>
              <div className="badge badge-primary mt-2">{info?.role}</div>
            </div>
          </div>
        </div>
     
    </div>
  );
};

export default AdminProfile;
