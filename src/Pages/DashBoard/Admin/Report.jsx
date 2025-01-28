import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { TiDeleteOutline } from "react-icons/ti";
import Swal from "sweetalert2";
import { useState } from "react";

const Report = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 10;

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

  // Pagination calculations
  const totalPages = Math.ceil(reports.length / reportsPerPage);
  const startIndex = (currentPage - 1) * reportsPerPage;
  const paginatedReports = reports.slice(startIndex, startIndex + reportsPerPage);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>No.</th>
              <th>User Email</th>
              <th>User Comment</th>
              <th>feedBack</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {paginatedReports.map((user, i) => (
              <tr key={user._id}>
                <th>{startIndex + i + 1}</th>
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

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4">
        <button
          className="btn btn-sm mx-2"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="mx-2">Page {currentPage} of {totalPages}</span>

        <button
          className="btn btn-sm mx-2"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Report;