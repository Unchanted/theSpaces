export default function SpaceCard({ space }) {
  const truncatedMembers = space.members.slice(0, 3).join(", ");
  const remainingMembers = space.members.length > 3 ? `, ...` : "";

  return (
    <div className="flex items-center border rounded-lg shadow-md p-4 mb-4 w-full ">
      <div className="w-1/4">
        <img
          src={space.dp}
          alt="Space DP"
          className="w-16 h-16 rounded-lg object-cover"
        />
      </div>
      <div className="w-3/4 pl-4">
        <h2 className="text-xl font-bold">{space.name}</h2>
        <p className="text-gray-600">
          {truncatedMembers}
          {remainingMembers}
        </p>
      </div>
    </div>
  );
}
