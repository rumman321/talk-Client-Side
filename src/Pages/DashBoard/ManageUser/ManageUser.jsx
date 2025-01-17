import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ManageUser = () => {
    const axiosSecure = useAxiosSecure()
    const {data:users=[], refetch} = useQuery({
        queryKey:['users'],
        queryFn:async()=>{
            const res = await axiosSecure('/users')
            return res.data
        }
    })
    return (
        <div>
            <h1>all users {users.length}</h1>
        </div>
    );
};

export default ManageUser;