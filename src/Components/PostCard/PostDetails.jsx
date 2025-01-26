import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaShareSquare,
  FaCommentDots,
} from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";


const PostDetails = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth()
  const { id } = useParams();
  const [vote, setVote] = useState(false);
  
  const {
    data: post = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["postDetails"],
    queryFn: async () => {
      const res = await axiosPublic(`/post/${id}`);
      return res.data;
    },
  });
  const {data:comments=[],refetch:commentRefetch}= useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await axiosPublic(`/comment?id=${id}&email=${user?.email}`);
      return res.data;
    },
  })


  const handleClick = async (action) => {
    console.log(action);

    const { data } = await axiosSecure.patch(`/post/${id}`, { action });
    console.log(data);
    if (data.modifiedCount > 0) {
      refetch();
      setVote(true);
    }
  };
  if (isLoading) {
    return <span className="loading loading-bars loading-lg"></span>;
  }

  const handleSubmit= async(e)=>{
    e.preventDefault()
    const form=e.target
    const data= form.comment.value
   

    const info= {
        email:user?.email,
        comment:data,
        feedBack:'',
        reported:false,
        postId:id
    }
    const res = await axiosSecure.post('/comment', info)
    console.log(res.data);
    if(res.data.insertedId){
        commentRefetch()
        console.log('insertedId');
    }

    // Close the modal
    document.getElementById("my_modal_1").close();
  }

  return (
    <div>
      <div className="card w-full md:w-96 bg-base-100 shadow-xl border border-gray-200 rounded-lg p-4">
        {/* Author Section */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={post.authorImage}
            alt={`${post.authorName}'s avatar`}
            className="w-12 h-12 rounded-full object-cover ring ring-blue-400 ring-offset-base-100 ring-offset-2"
          />
          <div>
            <h2 className="text-lg font-semibold">{post.authorName}</h2>
            <p className="text-sm text-gray-500">Posted on {post.date}</p>
          </div>
        </div>

        {/* Post Title */}
        <h3 className="text-xl font-bold mb-2 text-gray-800">{post.title}</h3>

        {/* Post Description */}
        <p className="text-gray-700 mb-4">{post.description}</p>

        {/* Tag */}
        <div className="badge badge-primary mb-4">{post.tag}</div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-4">
            {/* Upvote */}
            <button
              onClick={() => handleClick("up")}
              disabled={vote}
              className="btn btn-sm btn-outline btn-primary flex items-center gap-1"
            >
              <FaThumbsUp /> {post.upVote}
            </button>

            {/* Downvote */}
            <button
              onClick={() => handleClick("down")}
              className="btn btn-sm btn-outline btn-error flex items-center gap-1"
            >
              <FaThumbsDown /> {post.downVote}
            </button>
          </div>

          {/* Share and Comment */}
          <div className="flex gap-4">
            <button
              onClick={() => document.getElementById("my_modal_1").showModal()}
              className="btn btn-sm btn-outline btn-accent flex items-center gap-1"
            >
              <FaCommentDots />{comments.length} Comment
            </button>
            <button className="btn btn-sm btn-outline btn-success flex items-center gap-1">
              <FaShareSquare /> Share
            </button>
          </div>
        </div>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Comment!</h3>
          
          <div className="modal-action ">
            <form onSubmit={handleSubmit} className="w-full ">
            <textarea 
            name="comment"
            className="textarea textarea-accent w-full" 
            placeholder="Comment">
            </textarea> <br />
              {/* if there is a button in form, it will close the modal */}
              <button  className="btn" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PostDetails;
