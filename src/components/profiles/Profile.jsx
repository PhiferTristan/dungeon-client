import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { getUserById } from "../../managers/UserManager";

export const Profile = ({ token }) => {
  const [user, setUser] = useState([]);

    const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    getUserById(token, userId).then((userObj) => {
      setUser(userObj);
      console.log(user)
    });
  }, [token, userId]);

  const handlePlayerCharactersClick = (playerId) => {
    navigate(`/characters/players_characters/${playerId}`)
  }

  const handlePlayerPartiesClick = (playerId) => {
    navigate(`/parties/players_parties/${playerId}`)
  }

  const handleDMPartiesClick = (dungeonMasterId) => {
    navigate(`/parties/dms_parties/${dungeonMasterId}`)
  }

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
          {/* Profile Image */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Profile Image:
            </label>
            <p className="text-gray-700">{user.profile_image_url}</p>
          </div>
          {/* Profile Username */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username:
            </label>
            <p className="text-gray-700">{user.username}</p>
          </div>
          {/* Profile Discord Username */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Discord Username:
            </label>
            <p className="text-gray-700">{user.discord_username}</p>
          </div>
          {/* Profile Email Address */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <p className="text-gray-700">{user.email_address}</p>
          </div>
          {/* Profile User Type */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              User Type:
            </label>
            <p className="text-gray-700">{user.user_type}</p>
          </div>
          {/* Buttons based on user type */}
          {user.user_type === "Player" && (
            <div className="mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {handlePlayerPartiesClick(user.player_user.id)
                }}
              >
                Parties
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
                onClick={() => {handlePlayerCharactersClick(user.player_user.id)}}
              >
                Characters
              </button>
            </div>
          )}
          {user.user_type === "DM" && (
            <div className="mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {handleDMPartiesClick(user.dungeon_master_user.id)
                }}
              >
                Parties
              </button>
            </div>
          )}
          {/* Profile Bio */}
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
