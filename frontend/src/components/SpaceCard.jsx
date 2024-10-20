import { useNavigate } from "react-router-dom";

export default function SpaceCard({ space }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/spacechat");
  };

  return (
    <div
      onClick={handleCardClick}
      className="flex items-center border rounded-lg shadow-md p-4 mb-4 w-full max-w-lg cursor-pointer hover:bg-gray-100"
    >
      <div className="w-1/4">
        <img
          src={space.dp}
          alt="Space DP"
          className="w-16 h-16 rounded-full object-cover"
        />
      </div>
      <div className="w-3/4 pl-4">
        <h2 className="text-xl font-bold">{space.name}</h2>
        <p className="text-gray-600">
          {space.members.slice(0, 3).join(", ")}
          {space.members.length > 3 ? ", ..." : ""}
        </p>
      </div>
    </div>
  );
}
