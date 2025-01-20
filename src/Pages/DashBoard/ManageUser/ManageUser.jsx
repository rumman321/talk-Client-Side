import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { TiDeleteOutline } from "react-icons/ti";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearchQuery] = useState("");
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axiosSecure(`/users?search=${search}`);
      return res.data;
    },
  });

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value); // Update the search state
  };
  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is admin now`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <div className="my-4">
        <input
          type="text"
          placeholder="Search by username"
          className="input input-bordered w-full max-w-md"
          value={search} // Bind to the search state
          onChange={handleSearch} // Trigger handleSearch on every change
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>User name</th>
              <th>User Email</th>
              <th>Make admin</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user?.role == "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      className="btn btn-sm  bg-orange-500"
                      onClick={() => handleMakeAdmin(user)}
                    >
                      <FaUsers size={25} />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-ghost btn-sm bg-red-600"
                    onClick={() => handleDeleteUser(user)}
                  >
                    <TiDeleteOutline size={30} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
