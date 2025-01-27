import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { TiDeleteOutline } from "react-icons/ti";
import Swal from "sweetalert2";

const Report = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: reports = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["comment-report"],
    queryFn: async () => {
      const res = await axiosSecure(`/comment-report`);
      return res.data;
    },
  });
  const handleDeleteFeedBack = async (id) => {
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
        axiosSecure.delete(`/comment-report/${id}`).then((res) => {
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
  if (isLoading) {
    return <span className="loading loading-bars loading-lg"></span>;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>User Email</th>
              <th>User Comment</th>
              <th> feedBack</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user?.email}</td>
                <td>{user?.comment}</td>
                <td>{user?.feedBack}</td>

                <td>
                  <button
                    className="btn btn-ghost btn-sm bg-red-600"
                    onClick={() => handleDeleteFeedBack(user._id)}
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

export default Report;
