import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllPlayersCharacterById } from "../../managers/CharacterManager";

export const PlayerCharactersList = ({ token }) => {
  const [characters, setCharacters] = useState([]);
  const { playerId } = useParams();

  useEffect(() => {
    getAllPlayersCharacterById(token, playerId).then((characterArray) => {
      setCharacters(characterArray);
    });
  }, [token, playerId]);

  console.log(characters)

  PlayerCharactersList.propTypes = {
    token: PropTypes.string,
  };

  return (
    <>
      <div>
        <h1 className="text-4xl text-center text-white">
          {characters[0]?.user_username}
          {"'"}s Characters
        </h1>
        <ul className="w-full">
          {characters.map((character) => (
            <li key={character.id} className="mb-4 p-4 bg-white shadow-md flex">
              <div className="flex-1 pr-4 border">
                <h2 className="text-center">Character Name:</h2>
                <Link to={`/characters/details/${character.id}`}>
                  <h3 className="text-center">{character.character_name}</h3>
                </Link>
              </div>

              <div className="flex-1 pr-4 border">
                <h2 className="text-center">Player Username:</h2>
                <Link to={`/profiles/details/${character.player_user}`}>
                  <h3 className="text-center">
                    {character.user_username}
                  </h3>
                </Link>
              </div>

              <div className="flex-1 pr-4 border">
                <h2 className="text-center">Class:</h2>
                <h3 className="text-center">placeholder</h3>
              </div>

              <div className="flex-1 pr-4 border">
                <h2 className="text-center">Race:</h2>
                <h3 className="text-center">{character.race}</h3>
              </div>

              <div className="flex-1 pr-4 border">
                <h2 className="text-center">Level:</h2>
                <h3 className="text-center">{character.level}</h3>
              </div>

              <div className="flex-1 border">
                <h2 className="text-center">Party:</h2>
                <h3 className="text-center">
                  {character.lfp_status ? "Active" : "Not Active"}
                </h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};