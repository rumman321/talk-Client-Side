import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Notification = () => {
  const axiosPublic = useAxiosPublic();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Fetch announcements when the component mounts
    axiosPublic
      .get("/announcement")
      .then((response) => {
        setAnnouncements(response.data);
      })
      .catch((error) => {
        console.error("Error fetching announcements:", error);
      });
  }, [axiosPublic]); // Dependency array to ensure this runs only once
  return (
    <div className="p-6  min-h-screen">
    <h1 className="text-2xl font-semibold text-gray-800 mb-4">
      All Notifications: {announcements.length}
    </h1>
    <div className="space-y-4">
      {announcements.map((note) => (
        <div
          key={note._id}
          className="card shadow-lg bg-white border border-gray-200 rounded-lg p-5"
        >
          <div className="flex items-center gap-4">
            <div className="avatar">
              <div className="w-12 rounded-full ring ring-blue-400 ring-offset-base-100 ring-offset-2">
                <img
                  src={note?.AuthorImage}
                  alt={`${note?.AuthorName}'s avatar`}
                />
              </div>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-800">
                {note?.AuthorName}
              </p>
              <p className="text-sm text-gray-500">{note?.date || "Unknown Date"}</p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {note?.title}
            </h3>
            <p className="text-gray-700 mt-2">{note?.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default Notification;
