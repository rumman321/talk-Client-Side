
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { TiDeleteOutline } from "react-icons/ti";
import { FaUsers } from "react-icons/fa";


const MyPost = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
   

    const { data:  allPosts= [], refetch, isLoading } = useQuery({
        queryKey: ["allPost"],
        queryFn: async () => {
          const res = await axiosSecure(`/myPost/${user?.email}`);
          return res.data;
          
        },
      });
      console.log(allPosts);
      
     if(isLoading){
       return <span className="loading loading-bars loading-lg"></span>
     }
     
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
                        {allPosts.map((user, i) => (
                          <tr key={user._id}>
                            <th>{i + 1}</th>
                            <td>{user.title}</td>
                            <td>{user.upVote}</td>
                            <td>{user.Status}</td>
                            
                            <td>
                              <button
                                className="btn btn-ghost btn-sm bg-red-600"
                                
                              >
                                <TiDeleteOutline size={30} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
        </div>
    );
};

export default MyPost;