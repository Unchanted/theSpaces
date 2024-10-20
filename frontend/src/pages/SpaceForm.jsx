import { useState } from "react";

export default function SpaceForm() {
  const [profilePicture, setProfilePicture] = useState(null);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Space</h2>
        <form>
          <div className="mb-4 flex justify-center">
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePictureChange}
              required
            />
            <label
              htmlFor="profilePicture"
              className="w-32 h-32 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden"
            >
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500">Upload</span>
              )}
            </label>
          </div>
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
