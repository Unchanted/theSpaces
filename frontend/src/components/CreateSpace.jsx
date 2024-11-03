import { useNavigate } from "react-router-dom";
import CreateSpaceIcon from "../assets/CreateSpace.svg";

export default function CreateSpace() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/spaces/create");
  };

  return (
    <div className="flex flex-col items-center">
      <img
        src={CreateSpaceIcon}
        alt="Create Space Icon"
        className="mb-4 max-w-sm"
      />
      <div className="flex items-center">
        <button
          className="px-4 py-2 bg-primary text-textWhite font-bold rounded-2xl hover:bg-red-700"
          onClick={handleButtonClick}
        >
          Create Your Space
        </button>
      </div>
    </div>
  );
}
