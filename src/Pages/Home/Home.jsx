import { useQuery } from "@tanstack/react-query";
import PostCard from "../../Components/PostCard/PostCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";
import Tecnology from "@/Components/Tecnology/Tecnology";
import Banner from "@/Components/Banner/Banner";
import Worldmap from "@/Components/WorldMap/Worldmap";
import LoadSkeletion from "@/Components/LoadingSkeleton/LoadSkeletion";
import Instruction from "@/Components/Instruction/Instruction";

const Home = () => {
  const axiosPublic = useAxiosPublic();

  const [search, setSearchQuery] = useState("");
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 6;
  const { data: posts = [], refetch, isLoading } = useQuery({
    queryKey: ["posts", currentPage, search],
    queryFn: async () => {
      const res = await axiosPublic(
        `/myPost?page=${currentPage - 1}&size=${itemPerPage}&search=${search}`
      );
      return res.data;
    },
  });
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
  if(isLoading){
    return <LoadSkeletion></LoadSkeletion>
  }

  return (
    <div>
      <div className="">
      <Banner></Banner>
      </div>
      <div className="my-4 text-center">
  <div className="p-[2px] rounded-lg bg-gradient-to-r from-purple-500 via-violet-500 to-purple-700 w-full max-w-md mx-auto">
    <input
      type="text"
      placeholder="Search by tag"
      className="input input-bordered w-full rounded-lg bg-white text-black"
      value={search}
      onChange={handleSearch}
    />
  </div>
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
          <p className="text-center">Current Page : {currentPage}</p>
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
      <Worldmap></Worldmap>
      <Instruction></Instruction>
      <Tecnology></Tecnology>
    </div>
  );
};

export default Home;
