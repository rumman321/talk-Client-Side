//using ai
import React from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const CommentDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [feedbackState, setFeedbackState] = useState({});

  const { data: comments = [] } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await axiosSecure(`/comment/${id}`);
      return res.data;
    },
  });
  console.log(comments);

  const handleFeedbackChange = (commentId, feedback) => {
    setFeedbackState((prev) => ({
      ...prev,
      [commentId]: feedback,
    }));
  };

  const handleReport = async (commentId) => {
    
    console.log(
      `Comment ${commentId} reported with feedback:`,
      feedbackState[commentId]
    );
    setFeedbackState((prev) => ({
      ...prev,
      [commentId]: "reported",
    }));
    const feedback = feedbackState[commentId];
    const { data } = await axiosSecure.patch(`/comment/${commentId}`,{feedback});
    console.log(data);
  };

  return (
    <div className="p-6">
      {/* Card */}
      <div className="card w-full bg-base-100 shadow-xl">
        {/* Header */}
        <div className="card-body">
          <h2 className="card-title text-lg font-bold">Comments</h2>
          <p className="text-gray-600">Comments on this post:</p>

          {/* Comments Table */}
          <div className="overflow-x-auto mt-4">
            <table className="table table-compact w-full">
              {/* Table Header */}
              <thead>
                <tr>
                  <th className="text-left">Email</th>
                  <th className="text-left">Comment</th>
                  <th className="text-left">Feedback</th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {comments.map((comment) => (
                  <tr key={comment._id}>
                    <td>{comment.email}</td>
                    <td>{comment.comment}</td>

                    {/* Feedback Dropdown */}
                    <td>
                      <select
                        className="select select-bordered select-sm w-full"
                        value={feedbackState[comment._id] || ""}
                        onChange={(e) =>
                          handleFeedbackChange(comment._id, e.target.value)
                        }
                        disabled={feedbackState[comment._id] === "reported"}
                      >
                        <option value="" disabled>
                          Select Feedback
                        </option>
                        <option value="Helpful">Helpful</option>
                        <option value="Irrelevant">Irrelevant</option>
                        <option value="Spam">Spam</option>
                      </select>
                    </td>

                    {/* Report Button */}
                    <td>
                      <button
                        className="btn btn-sm btn-error"
                        disabled={
                          !feedbackState[comment._id] ||
                          feedbackState[comment._id] === "reported"
                        }
                        onClick={() => handleReport(comment._id)}
                      >
                        {feedbackState[comment._id] === "reported"
                          ? "Reported"
                          : "Report"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentDetails;
