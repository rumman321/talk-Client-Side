import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { ShinyButton } from "@/Components/magicui/shiny-button";

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const [info, setInfo] = useState(null);

  useEffect(() => {
    axiosPublic.get(`/users/${user?.email}`).then((res) => {
      setInfo(res.data);
    });
  }, [user]);
  // Fetch post count and user status using useQuery
  const { data: total = [] } = useQuery({
    queryKey: ["total"],
    queryFn: async () => {
      const res = await axiosPublic(`/total`);
      return res.data; //
    },
    enabled: !!user?.email, // Only run the query if user email exists
  });

  if (!info) {
    return <span className="loading loading-bars loading-lg"></span>;
  }

  return (
    <div>
      <div key={info._id} className="p-6   flex justify-center items-center">
        <div className="card w-full md:w-96 bg-white shadow-xl border border-gray-200 rounded-lg">
          <div className="card-body items-center text-center">
            <div className="avatar">
              <div className="w-24 h-24 rounded-full ring ring-blue-400 ring-offset-base-100 ring-offset-2">
                <img src={info?.photo} alt={`${info?.name}'s avatar`} />
              </div>
            </div>
            <div className="badge badge-primary mt-2">{info?.role}</div>
            <h2 className="card-title text-gray-800 text-2xl font-bold mt-4">
              Name : {info?.name}
            </h2>

            <div className="flex flex-col justify-start items-start">
              <p className="text-gray-600">
                {" "}
                <span className="font-bold">Email : </span>
                {info?.email}
              </p>
              <p className="text-gray-600">
                {" "}
                <span className="font-bold">Admin Id : </span>
                {info?._id}
              </p>
              <p className="text-gray-600">
                {" "}
                <span className="font-bold">Total Posts :</span>{" "}
                {total?.postCount}
              </p>
              <p className="text-gray-600">
                <span className="font-bold">Total Comments :</span>{" "}
                {total?.commentCount}
              </p>
              <p className="text-gray-600">
                {" "}
                <span className="font-bold">Total Users :</span>{" "}
                {total?.userCount}
              </p>
            </div>
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

      <div>
        <ResponsiveContainer width={400} height={400}>
          <PieChart>
            <Pie
              data={total?.data1}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#8884d8"
              label
            />
          </PieChart>
        </ResponsiveContainer>
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

export default AdminProfile;
