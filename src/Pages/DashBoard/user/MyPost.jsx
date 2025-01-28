import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { TiDeleteOutline } from "react-icons/ti";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useState } from "react";

const MyPost = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const {
    data: allPosts = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allPost"],
    queryFn: async () => {
      const res = await axiosSecure(`/myPost/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <span className="loading loading-bars loading-lg"></span>;
  }

  const handleDelete = async (id) => {
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
        axiosSecure.delete(`/post/${id}`).then((res) => {
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

  // Pagination calculations
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = allPosts.slice(startIndex, startIndex + postsPerPage);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Post Title</th>
              <th>Number of votes</th>
              <th>Comment Button</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPosts.map((user, i) => (
              <tr key={user._id}>
                <th>{startIndex + i + 1}</th>
                <td>{user.title}</td>
                <td>{user.upVote}</td>
                <td>
                  <Link to={`/dashboard/commentDetails/${user._id}`}>
                    {user.commentCount}
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-ghost btn-sm bg-red-600"
                    onClick={() => handleDelete(user._id)}
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

export default MyPost;