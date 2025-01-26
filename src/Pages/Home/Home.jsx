import { useQuery } from "@tanstack/react-query";
import PostCard from "../../Components/PostCard/PostCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";

const Home = () => {
  const axiosPublic = useAxiosPublic();
  
  const [search, setSearchQuery] = useState("");
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 5;
  const { data: posts = [], refetch } = useQuery({
    queryKey: ["posts",currentPage,search],
    queryFn: async () => {
      const res = await axiosPublic(
        `/myPost?page=${currentPage-1}&size=${itemPerPage}&search=${search}`
      );
      return res.data;
    },
  });
  console.log(posts);
  const { data: { count = 0 } = {} } = useQuery({
    queryKey: ["count"],
    queryFn: async () => {
      const res = await axiosPublic(`/postCount`);
      return res.data;
    },
  });
  
  
  const numberOfPages = Math.ceil(count / itemPerPage);
  // const pages = []
  // for(let i =0; i< numberOfPages; i++){
  //   pages.push(i)
  // }
  const pages = [...Array(numberOfPages).keys()];
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleSearch = async (e) => {
    setSearchQuery(e.target.value); // Update the search state
  };

  return (
    <div>
      <div className="my-4 text-center">
        <input
          type="text"
          placeholder="Search by tag"
          className="input input-bordered w-full max-w-md"
          value={search} // Bind to the search state
          onChange={handleSearch} // Trigger handleSearch on every change
        />
      </div>

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Recent Posts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              id={post._id}
              authorImage={post?.authorImage}
              authorName={post?.authorName}
              title={post?.title}
              tag={post?.tag}
              time={post?.date}
              upvotes={post.upVote}
              count={post?.commentCount}
            />
          ))}
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-center my-6">
        <div className="btn-group">
          <p>Current Page : {currentPage}</p>
          <button className="btn mr-3" onClick={handlePrev}>
            Prev
          </button>
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page + 1)}
              className={`btn mr-3 ${
                currentPage == page + 1 ? "btn-error" : ""
              }`}
            >
              {page + 1}
            </button>
          ))}
          <button className="btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
