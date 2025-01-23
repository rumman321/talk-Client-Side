
import { useQuery } from "@tanstack/react-query";
import PostCard from "../../Components/PostCard/PostCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Home = () => {
 

  const axiosPublic = useAxiosPublic()
  const { data: posts = [], refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosPublic(`/myPost`);
      return res.data;
    },
  });
 
  return (
    <div>
      
      <div className="my-4 text-center">
        <input
          type="text"
          placeholder="Search by tag"
          className="input input-bordered w-full max-w-md"
          value={null} // Bind to the search state
          onChange={null} // Trigger handleSearch on every change
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
              
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
