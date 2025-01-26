import { FaRegComments, FaRegClock, FaThumbsUp, FaTags } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const PostCard = ({
  authorImage,
  authorName,
  title,
  tag,
  time,
  id,
  upvotes,
  count
}) => {
  
  return (
    <div>
      <NavLink to={`/postDetail/${id}`}>
        <div className="card bg-base-100 shadow-lg border md:flex md:items-center md:gap-4 p-4">
          {/* Author Info */}
          <div className="flex-shrink-0">
            <img
              src={authorImage}
              alt={`${authorName}'s profile`}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto md:mx-0"
            />
          </div>

          {/* Post Content */}
          <div className="card-body p-0 md:py-4">
            <div className="mb-4">
              <h3 className="text-lg font-bold">{authorName}</h3>
              <div className="text-sm text-gray-500 flex items-center">
                <FaRegClock className="mr-2" /> {time}
              </div>
            </div>

            {/* Post Title */}
            <h2 className="card-title mb-2 text-blue-600 break-words">
              {title}
            </h2>

            {/* Tags */}
            <div className="mb-4 flex flex-wrap items-center">
              <FaTags className="text-gray-500 mr-2" />
              <span className="badge badge-outline mr-2 mb-1 text-sm md:text-base">
                {tag}
              </span>
              {/* {tag?.map((tag, index) => (
              <span
                key={index}
                className="badge badge-outline mr-2 mb-1 text-sm md:text-base"
              >
                {tag}
              </span>
            ))} */}
            </div>

            {/* Stats */}
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-500 text-sm md:text-base">
                  <FaRegComments className="mr-2" />{count} Comments
                </div>
                <div className="flex items-center text-gray-500 text-sm md:text-base">
                  <FaThumbsUp className="mr-2" /> {upvotes} Upvotes
                </div>
              </div>
              <div className="text-gray-500 text-sm md:text-base">
                Votes: <span className="font-bold">vote</span>
              </div>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default PostCard;
