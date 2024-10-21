// import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function SpaceForm() {
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    const spaceName = e.target.spaceName.value;
    const photoUrl = e.target.photoUrl.value;
    const description = e.target.description.value;

    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER_URL + "/spaces",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: spaceName,
            photo_url: photoUrl,
            description: description,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      navigate("/spaces");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Space</h2>
        <form onSubmit={onSubmit}>
          {/* Space Name */}
          <div className="mb-4">
            <label htmlFor="spaceName" className="block text-gray-700 mb-2">
              Name of Space
            </label>
            <input
              type="text"
              id="spaceName"
              name="spaceName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Photo Url */}
          <div className="mb-4">
            <label htmlFor="photoUrl" className="block text-gray-700 mb-2">
              Photo URL
            </label>
            <input
              type="text"
              id="photoUrl"
              name="photoUrl"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-primary font-bold text-textWhite py-2 rounded-md hover:bg-blue-600"
            >
              Create Space
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
