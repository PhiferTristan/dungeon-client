// import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { getUserById } from "../../managers/UserManager";
import PropTypes from "prop-types";
import { getMostRecentCharacter } from "../../managers/CharacterManager";
import { useEffect, useState } from "react";
import { getAllPlayers } from "../../managers/PlayerManager";

export const Homepage = ({ token, setToken }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    getAllPlayers(token).then((playersArray) => {
      setPlayers(playersArray);
    });
  }, [token]);

  const navigate = useNavigate();
  const playerId = parseInt(localStorage.getItem("playerId"));
  const player = players.find((player) => player.id === playerId);
  const character = getMostRecentCharacter(token, player);

  const handleLogout = () => {
    localStorage.clear();
    setToken("");
    navigate("/login");
  };

  Homepage.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func.isRequired,
    currentUserId: PropTypes.string,
    currentUserType: PropTypes.string,
  };

  return (
    <>
      <div>
        <div>
          <div className="flex-1 pr-4 border">
            <h2 className="text-3xl text-center text-white">Most Recent Character: </h2>
            <div className="font text-center text-white">
              {character ? (
                <div className="flex">
                  {/* Character Name */}
                  <div className="flex-1 pr-4 border">
                    <h2 className="text-center">Character Name:</h2>
                    <Link to={`/characters/details/${character.id}`}>
                      <h3 className="font text-center">
                        {character.character_name}
                      </h3>
                    </Link>
                  </div>
                  {/* Player Username */}
                  <div className="flex-1 pr-4 border">
                    <h2 className="text-center">Player Username:</h2>
                    <Link to={`/profiles/details/${character?.user_id}`}>
                      <h3 className="font text-center">
                        {player?.user.username}
                      </h3>
                    </Link>
                  </div>
                  {/* Class */}
                  <div className="flex-1 pr-4 border">
                    <h2 className="text-center">Class:</h2>
                    <h3 className="text-center">{character?.class_label}</h3>
                  </div>
                  {/* Race */}
                  <div className="flex-1 border">
                    <h2 className="text-center">Race:</h2>
                    <h3 className="text-center">
                      {character.race_label?.label}
                    </h3>
                  </div>
                  {/* Level */}
                  <div className="flex-1 border">
                    <h2 className="text-center">Level:</h2>
                    <h3 className="text-center">{character.level}</h3>
                  </div>
                  {/* Created On */}
                  <div className="flex-1 border">
                    <h2 className="text-center">Created On:</h2>
                    <h3 className="text-center">{character.created_on}</h3>
                  </div>
                </div>
              ) : (
                "No Character"
              )}
            </div>
          </div>
          <ul>
            <button
              className="button is-outlined hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </ul>
        </div>
      </div>
    </>
  );
};
