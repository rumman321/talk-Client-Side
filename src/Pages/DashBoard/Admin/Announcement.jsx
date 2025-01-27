import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const Announcement = () => {
  const { user } = useAuth();
  console.log(user);
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm()
  const onSubmit =async (data) => {
    console.log(data)
    const info={
        title:data?.title ,  
        description:data?.description,
        AuthorName: user?.displayName,
        AuthorImage: user?.photoURL

          
    }
     const res = await axiosSecure.post('/announcement',info)
     console.log(res.data);
     if (res.data.insertedId) {
        
        navigate("/notification");
      }
}
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
         
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-3xl font-bold">Make  Announcement!</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                {...register("title", { required: true })}
                  type="text"
                  placeholder="title"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <input
                {...register("description", { required: true })}
                  type="text"
                  placeholder="description"
                  className="input input-bordered"
                  required
                />
               
              </div>
              <div className="form-control">
                <label className="label">
                  <h3 className="label-text text-2xl font-bold">Author </h3>
                </label>
               <div className="flex justify-between items-center gap-5">
                <img className="w-12 rounded-full" src={user?.photoURL} alt={user?.displayName} />
                <p>{user?.displayName}</p>
               </div>
               
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
