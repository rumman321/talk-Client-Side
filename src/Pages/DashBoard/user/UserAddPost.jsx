import moment from "moment";
import Select from "react-select";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const UserAddPost = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState(null);
  const handleTagChange = (selectedOption) => {
    setSelectedTag(selectedOption ? selectedOption.value : null);
  };
  const handleAddPost = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Get the current date in DD/MM/YYYY format
    const formattedDate = moment().format("DD/MM/YYYY");

    const newPost = {
      authorImage: user?.photoURL,
      authorName: user?.displayName,
      authorEmail: user?.email,
      title: formData.get("title"),
      description: formData.get("description"),
      tag: selectedTag,
      upVote: 0,
      downVote: 0,
      date: formattedDate, // Add the formatted date here
    };

    console.log("New Post Data:", newPost);
    //   POST request here
    try {
      const res = await axiosPublic.post("/myPost", newPost);
      console.log(res.data);

      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your post has been added",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      } else {
        throw new Error("Failed to add post");
      }
    } catch (error) {
      console.error("Error adding post:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again!",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Add a New Post</h2>
      <form onSubmit={handleAddPost} className="space-y-4">
        <div className="form-control">
          <label htmlFor="authorName" className="label">
            <span className="label-text">Author Image</span>
          </label>
          <input
            type="text"
            name="authorImage"
            value={user?.photoURL}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label htmlFor="authorName" className="label">
            <span className="label-text">Author Name</span>
          </label>
          <input
            type="text"
            value={user?.displayName}
            name="authorName"
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label htmlFor="authorEmail" className="label">
            <span className="label-text">Author Email</span>
          </label>
          <input
            type="email"
            value={user?.email}
            name="authorEmail"
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label htmlFor="title" className="label">
            <span className="label-text">Post Title</span>
          </label>
          <input
            type="text"
            name="title"
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label htmlFor="description" className="label">
            <span className="label-text">Post Description</span>
          </label>
          <textarea
            name="description"
            rows="4"
            required
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>
        <div className="form-control">
          <label htmlFor="tag" className="label">
            <span className="label-text">Tag</span>
          </label>
          <Select
            options={[
              { value: "technology", label: "Technology" },
              { value: "health", label: "Health" },
              { value: "education", label: "Education" },
              { value: "sports", label: "Sports" },
            ]}
            isClearable
            className="react-select-container"
            classNamePrefix="react-select"
            onChange={handleTagChange}
          />
          ;
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Add Post
        </button>
      </form>
    </div>
  );
};

export default UserAddPost;
