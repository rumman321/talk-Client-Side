import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

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
  // Fetch post count and user status using useQuery
  const { data: total = [] } = useQuery({
    queryKey: ["total"],
    queryFn: async () => {
      const res = await axiosPublic(`/total`);
      return res.data; //
    },
    enabled: !!user?.email, // Only run the query if user email exists
  });
  console.log(total);

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
              {info?.name}
            </h2>
            <p className="text-gray-600">{info?.email}</p>
            {total.map((t,i) => {
              <div key={i}>
                <p className="text-gray-600">total posts :{t?.postCount}</p>
                <p className="text-gray-600">
                  total comments: {t?.commentCount}
                </p>
                <p className="text-gray-600">total users: {t?.userCount}</p>
              </div>;
            })}
          </div>
        </div>
      </div>

      <div>
        <ResponsiveContainer width={400} height={400}>
          <PieChart>
            <Pie
              data={total}
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
    </div>
  );
};

export default AdminProfile;
