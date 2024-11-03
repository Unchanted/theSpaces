import CreateSpaceIcon from "../assets/CreateSpace.svg";

function Gupshup() {
  return (
    <div className="flex flex-col items-center bg-background h-screen">
      <img
        src={CreateSpaceIcon}
        alt="Create Space Icon"
        className="mb-4 max-w-sm"
      />
      <div className="flex items-center">
        <div className="p-6 text-xl text-black/80 font-bold italic ">
          Coming soon ...
        </div>
      </div>
    </div>
  );
}

export default Gupshup;
