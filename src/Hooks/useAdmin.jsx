import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()

    const {data: isAdmin=[], refetch, isPending : isAdminLoading} = useQuery({
        queryKey:['isAdmin', user?.email],
        enabled: !!user,
        queryFn:async()=>{
            const res = await axiosSecure.get(`/users/admin/${user.email}`)
            // console.log(res.data);
            return res.data?.admin
        },
        
    })

    return [isAdmin,refetch,isAdminLoading]
};

export default useAdmin;