import React, { useState } from "react";
import SpaceCard from "../components/SpaceCard";
import CreateSpace from "../components/CreateSpace";

export default function Home() {
  const username = "Om Dwivedi";
  const [ifSpace, setIfSpace] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="absolute top-4 left-4">
        <h1 className="text-2xl font-bold  text-primary whitespace-pre-line">
          Welcome, {"\n"}
          {username} to spaces!
        </h1>
      </div>
      {ifSpace === 0 ? <CreateSpace /> : <SpaceCard />}
    </div>
  );
}
