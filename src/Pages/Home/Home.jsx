import Navber from "../../Components/Navber/Navber";
import PostCard from "../../Components/PostCard/PostCard";

const Home = () => {
  const posts = [
    {
      id: 1,
      authorImage: "https://via.placeholder.com/48",
      authorName: "John Doe",
      title: "How to Learn React Effectively",
      tags: ["React", "JavaScript", "Frontend"],
      time: "2 hours ago",
      comments: 12,
      upvotes: 45,
      votes: 5,
    },
    {
      id: 2,
      authorImage: "https://via.placeholder.com/48",
      authorName: "Jane Smith",
      title: "Understanding Node.js Event Loop",
      tags: ["Node.js", "Backend", "JavaScript"],
      time: "5 hours ago",
      comments: 20,
      upvotes: 70,
      votes: 8,
    },
  ];

  return (
    <div>
      <h2>this is home</h2>
      <Navber></Navber>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Recent Posts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              authorImage={post.authorImage}
              authorName={post.authorName}
              title={post.title}
              tags={post.tags}
              time={post.time}
              comments={post.comments}
              upvotes={post.upvotes}
              votes={post.votes}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
