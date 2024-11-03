import { useState, useContext, useEffect } from "react";
import SpaceCard from "../components/SpaceCard";
import CreateSpace from "../components/CreateSpace";
import { UserDataContext } from "../contexts/userContext";
import axios from "axios";

export default function Home() {
  const { userData } = useContext(UserDataContext);
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_SERVER_URL + "/users/" + userData.id + "/spaces",
        );
        setSpaces(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSpaces();
  }, []);

  return (
    <div className="flex flex-col bg-background items-center justify-start h-screen gap-4 p-4">
      <div className="absolute top-4 left-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary whitespace-pre-line">
          Welcome, {"\n"}
          {userData.name} to spaces!
        </h1>
      </div>
      <div className="mt-24 w-full flex flex-col items-center">
        {spaces.length === 0 ? (
          <CreateSpace />
        ) : (
          spaces.map((space) => <SpaceCard key={space.id} space={space} />)
        )}
      </div>
    </div>
  );
}
