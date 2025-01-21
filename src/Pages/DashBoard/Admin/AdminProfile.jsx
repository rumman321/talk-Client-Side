import useAuth from "../../../Hooks/useAuth";

const AdminProfile = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>admin</h1>
      <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="card w-full md:w-96 bg-white shadow-xl border border-gray-200 rounded-lg">
          <div className="card-body items-center text-center">
            <div className="avatar">
              <div className="w-24 h-24 rounded-full ring ring-blue-400 ring-offset-base-100 ring-offset-2">
                <img src="https://via.placeholder.com/150" alt="User avatar" />
              </div>
            </div>
            <h2 className="card-title text-gray-800 text-2xl font-bold mt-4">
              John Doe
            </h2>
            <p className="text-gray-600">johndoe@example.com</p>
            <div className="badge badge-primary mt-2">Admin</div>
            <div className="card-actions mt-4">
              <button className="btn btn-primary">Edit</button>
              <button className="btn btn-error">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
