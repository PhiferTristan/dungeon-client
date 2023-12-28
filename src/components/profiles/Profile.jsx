import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { getUserById } from "../../managers/UserManager";

export const Profile = ({ token }) => {
  const [user, setUser] = useState([]);

  //   const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    getUserById(token, userId).then((userObj) => {
      setUser(userObj);
    });
  }, [token, userId]);

  Profile.propTypes = {
    token: PropTypes.string,
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-4xl text-white text-center mb-4">
          {user.username}
          {"'"}s Profile
        </h2>
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
