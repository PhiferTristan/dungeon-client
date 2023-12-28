import { useEffect, useState } from "react";
import { deleteUserById, getUserById } from "../../managers/UserManager";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { updateUserStatus } from "../../managers/UserStatusManager";

export const MyProfile = ({ token, currentUserId, currentUserType }) => {
  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  console.log(currentUserId);

  useEffect(() => {
    if (currentUserId) {
      getUserById(token, currentUserId).then((userObj) => {
        setUser(userObj);
      });
    }
  }, [token, currentUserId]);

  const handleStatusButtonClick = () => {
    if (currentUserType === "DM") {
      updateUserStatus(token, currentUserId, !user.lfp_status); // Toggle the status
      setUser((prevUser) => ({ ...prevUser, lfp_status: !user.lfp_status })); // Update local state
    } else {
      updateUserStatus(token, currentUserId, !user.lfg_status);
      setUser((prevUser) => ({ ...prevUser, lfg_status: !user.lfg_status }));
    }
  };

  const handleDeleteButtonClick = async () => {
    try {
      await deleteUserById(token, currentUserId);
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  MyProfile.propTypes = {
    token: PropTypes.string,
    currentUserId: PropTypes.string,
    currentUserType: PropTypes.string,
  };

  return (
    <>
      <div>
        <div className="flex justify-end p-4">
          <Link
            to="/profiles/edit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Edit Account
          </Link>

          <button
            onClick={handleDeleteButtonClick}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:shadow-outline"
          >
            Delete Account
          </button>
        </div>

        <h2 className="text-4xl text-center">My Profile</h2>
        <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Profile Image:
            </label>
            <p className="text-gray-700">{user.profile_image_url}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username:
            </label>
            <p className="text-gray-700">{user.username}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Discord Username:
            </label>
            <p className="text-gray-700">{user.discord_username}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <p className="text-gray-700">{user.email_address}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              User Type:
            </label>
            <p className="text-gray-700">{user.user_type}</p>
            {user.user_type === "DM" ? (
              <button
                onClick={handleStatusButtonClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {user.lfp_status ? "Disable LFP" : "Enable LFP"}
              </button>
            ) : (
              <button
                onClick={handleStatusButtonClick}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {user.lfg_status ? "Disable LFG" : "Enable LFG"}
              </button>
            )}
            <Link
              to="parties/mine"
              className="hover:text-red-600 transition border-b-2 border-slate-900 hover:border-red-600 cursor-pointer"
            >
              Parties
            </Link>
            <Link
              to="characters/mine"
              className="hover:text-red-600 transition border-b-2 border-slate-900 hover:border-red-600 cursor-pointer"
            >
              Characters
            </Link>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Bio:
            </label>
            <p className="text-gray-700">{user.bio}</p>
          </div>
        </div>
      </div>
    </>
  );
};

// {
/* {user.user_type === "DM" ? (
  <button
    onClick={handleStatusButtonClick}
    className={`${
      user.dungeon_master_user.lfp_status
        ? "bg-green-500 hover:bg-green-700"
        : "bg-red-500 hover:bg-red-700"
    } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
  >
    {user.dungeon_master_user.lfp_status
      ? "Disable LFP"
      : "Enable LFP"}
  </button>
) : (
  <button
    onClick={handleStatusButtonClick}
    className={`${
      user.player_user.lfg_status
        ? "bg-green-500 hover:bg-green-700"
        : "bg-red-500 hover:bg-red-700"
    } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
  >
    {user.player_user.lfg_status ? "Disable LFG" : "Enable LFG"}
  </button>
)} */
// }
