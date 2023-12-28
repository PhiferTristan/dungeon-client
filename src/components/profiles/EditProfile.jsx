import { useState, useEffect } from "react";
import { getUserById, updateUserProfile } from "../../managers/UserManager";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const EditProfile = ({ token, currentUserId }) => {
  const [user, setUser] = useState([]);
  const [editFormData, setEditFormData] = useState({
    first_name: "",
    last_name: "",
    profile_image_url: "",
    email: "",
    bio: "",
    discord_username: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUserId) {
      getUserById(token, currentUserId).then((userObj) => {
        setUser(userObj);
        // Initial form data of the user's current info
        setEditFormData({
          first_name: userObj.first_name,
          last_name: userObj.last_name,
          profile_image_url: userObj.profile_image_url,
          email: userObj.email,
          bio: userObj.bio,
          discord_username: userObj.discord_username,
        });
      });
    }
  }, [token, currentUserId]);

  console.log(user)

  const handleInputChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const updatedUserData = {
      first_name: editFormData.first_name,
      last_name: editFormData.last_name,
      profile_image_url: editFormData.profile_image_url,
      email: editFormData.email,
      bio: editFormData.bio,
      discord_username: editFormData.discord_username,
    };

    updateUserProfile(token, currentUserId, updatedUserData).then(
      (updatedUser) => {
        setUser(updatedUser);
        navigate("/profiles/mine");
      }
    );
  };

  EditProfile.propTypes = {
    token: PropTypes.string,
    currentUserId: PropTypes.string,
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center h-screen">
        <form
          onSubmit={handleFormSubmit}
          className="max-w-md w-full p-5 bg-slate-500 shadow-md rounded"
        >
          <h1 className="text-4xl text-center mb-4">Edit Profile</h1>

          <div className="mb-2 text-center">
          <label className="block text-black text-sm font-bold mb-2">
            First Name:
          </label>
          <input
            type="text"
            name="first_name"
            value={editFormData.first_name}
            onChange={handleInputChange}
            className="mb-2"
          />
            </div>

            <div className="mb-2 text-center">
          <label className="block text-black text-sm font-bold mb-2">
            Last Name:
          </label>
          <input
            type="text"
            name="last_name"
            value={editFormData.last_name}
            onChange={handleInputChange}
            className="mb-2"
          />
          </div>

          <div className="mb-2 text-center">
          <label className="block text-black text-sm font-bold mb-2">
            Profile Image URL:
          </label>
          <input
            type="url"
            name="profile_image_url"
            value={editFormData.profile_image_url}
            onChange={handleInputChange}
            className="mb-2"
          />
          </div>

          <div className="mb-2 text-center">
          <label className="block text-black text-sm font-bold mb-2">
            Email Address:
          </label>
          <input
            type="email"
            name="email"
            value={editFormData.email}
            onChange={handleInputChange}
            className="mb-2"
          />
          </div>

          <div className="mb-2 text-center">
          <label className="block text-black text-sm font-bold mb-2">
            Discord Username:
          </label>
          <input
            type="text"
            name="discord_username"
            value={editFormData.discord_username}
            onChange={handleInputChange}
            className="mb-2"
          />
          </div>

          <div className="mb-2 text-center">
          <label className="block text-black text-sm font-bold mb-2">
            Bio:
          </label>
          <textarea
            name="bio"
            value={editFormData.bio}
            onChange={handleInputChange}
            className="mb-2 h-[125px] w-[250px]"
          />
          </div>

          <button
            type="submit"
            className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 mx-auto"
          >
            Save Changes
          </button>
        </form>
      </section>
    </>
  );
};
