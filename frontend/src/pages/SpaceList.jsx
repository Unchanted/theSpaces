import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../contexts/userContext";

export default function SpaceList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [spaces, setSpaces] = useState([]);
  const navigate = useNavigate();
  const { userData } = useContext(UserDataContext);

  const handleCardClick = (space) => {
    setSelectedSpace(space);
    setIsModalOpen(true);
  };

  const handleJoinSpace = async () => {
    // Logic to join the space

    const response = await axios.post(
      import.meta.env.VITE_SERVER_URL + "/spaces/" + selectedSpace.id + "/join",
      {
        user_id: userData.id,
      }
    );
    console.log(response.data);

    setIsModalOpen(false);
    navigate("/");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_SERVER_URL + "/spaces"
        );
        const data = await response.json();
        setSpaces(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSpaces();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start h-screen gap-4 p-4">
      <h1 className="text-3xl font-bold text-primary mb-4">All Spaces</h1>
      {spaces.map((space) => (
        <div
          key={space.id}
          onClick={() => handleCardClick(space)}
          className="flex items-center border rounded-lg shadow-md p-4 mb-4 w-full max-w-lg cursor-pointer hover:bg-gray-100"
        >
          <div className="w-1/4">
            <img
              src={space.photo_url}
              alt="Space DP"
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
          <div className="w-3/4 pl-4">
            <h2 className="text-xl font-bold">{space.name}</h2>
            <p className="text-gray-600">
              {space.members
                .slice(0, 3)
                .map((member) => member.name)
                .join(", ")}
              {space.members.length > 3 ? ", ..." : ""}
            </p>
          </div>
        </div>
      ))}

      {isModalOpen && selectedSpace && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-center mb-4">
              <img
                src={selectedSpace.photo_url}
                alt="Space DP"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">
              {selectedSpace.name}
            </h2>
            <p className="text-gray-600 text-center mb-4">
              {selectedSpace.description}
            </p>
            <h3 className="text-xl font-bold mb-2">Members</h3>
            <ul className="list-disc list-inside">
              {selectedSpace.members.map((member) => (
                <li key={member.id} className="text-gray-800">
                  {member.name}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleModalClose}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleJoinSpace}
                className="bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Join Space
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
