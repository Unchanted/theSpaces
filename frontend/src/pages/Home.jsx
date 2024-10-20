import { useState, useContext } from "react";
import SpaceCard from "../components/SpaceCard";
import CreateSpace from "../components/CreateSpace";
import CreateSpaceIcon from "../assets/CreateSpace.svg";
import { UserDataContext } from "../contexts/userContext";

export default function Home() {
  const { userData } = useContext(UserDataContext);
  const [ifSpace, setIfSpace] = useState(1);

  const spaces = [
    {
      dp: CreateSpaceIcon,
      name: "Space One",
      members: ["Member1", "Member2", "Member3", "Member4", "Member5"],
    },
    {
      dp: CreateSpaceIcon,
      name: "Space Two",
      members: ["Member6", "Member7", "Member8", "Member9", "Member10"],
    },
    {
      dp: CreateSpaceIcon,
      name: "Space Three",
      members: ["Member11", "Member12", "Member13", "Member14", "Member15"],
    },
  ];

  return (
    <div className="flex flex-col bg-background items-center justify-start h-screen gap-4 p-4">
      <div className="absolute top-4 left-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary whitespace-pre-line">
          Welcome, {"\n"}
          {userData.name} to spaces!
        </h1>
      </div>
      <div className="mt-24 w-full flex flex-col items-center">
        {ifSpace === 0 ? (
          <CreateSpace />
        ) : (
          spaces.map((space, index) => <SpaceCard key={index} space={space} />)
        )}
      </div>
    </div>
  );
}
