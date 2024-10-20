import CreateSpaceIcon from "../assets/CreateSpace.svg";
import { Star1 } from "iconsax-react";

export default function CreateSpace() {
  return (
    <div className="flex flex-col items-center">
      <img src={CreateSpaceIcon} alt="Create Space Icon" className="mb-4" />
      <div className="flex items-center">
        <button className="px-4 py-2 bg-primary text-textWhite font-bold rounded-3xl hover:bg-red-700">
          Create Space
        </button>
        <Star1 color="#FF8A65" size="32" variant="Bold" />
      </div>
    </div>
  );
}
