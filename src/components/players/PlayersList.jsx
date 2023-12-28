import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPlayers } from "../../managers/PlayerManager";
import PropTypes from "prop-types";
import { getMostRecentCharacter } from "../../managers/CharacterManager";

export const PlayersList = ({ token }) => {
  const [allPlayers, setAllPlayers] = useState([]);
//   const navigate = useNavigate();

  console.log(localStorage);
  console.log(token);

  useEffect(() => {
    getAllPlayers(token).then((playersArray) => {
      setAllPlayers(playersArray);
    });
  }, [token]);

  PlayersList.propTypes = {
    token: PropTypes.string,
  };

  return (
    <>
      <div>
        <h1 className="text-3xl text-white text-center mb-4">All Players</h1>
        <ul className="w-full">
          {allPlayers.map((player) => (
            <li
              key={player.id}
              className="mb-4 p-4 bg-white shadow-md flex"
            >
              <div className="flex-1 pr-4 border">
                <h2 className="text-center">Username:</h2>
                <Link to={`/profiles/details/${player.user.id}`}>
                <h3 className="font text-center">{player.user.username}</h3>
                </Link>
              </div>

              <div className="flex-1 pr-4 border">
              <h2 className="text-center">Most Recent Character:{" "}</h2>
                <h3 className="font text-center">
                  {getMostRecentCharacter(token, player)?.character_name ||
                    "No Character"}
                </h3>
              </div>

              <div className="flex-1 pr-4 border">
              <h2 className="text-center">Number of Characters:</h2>
                <h3 className="font-bold text-center">
                  {player.characters.length}
                </h3>
              </div>

              <div className="flex-1 border">
              <h2 className="text-center">Looking for Group Status:</h2>
                <h3 className="font-bold text-center">
                  {player.lfg_status ? "Active" : "Not Active"}
                </h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
