import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getAllCharacters } from "../../managers/CharacterManager";

export const CharactersList = ({ token }) => {
  const [allCharacters, setAllCharacters] = useState([]);
  //   const navigate = useNavigate();

  console.log(allCharacters);

  useEffect(() => {
    getAllCharacters(token).then((charactersArray) => {
      setAllCharacters(charactersArray);
    });
  }, [token]);

  CharactersList.propTypes = {
    token: PropTypes.string,
  };

  return (
    <>
      <div>
      <h1 className="text-3xl text-white text-center mb-4">All Characters</h1>
        <ul className="w-full">
          {allCharacters.map((character) => (
            <li
              key={character.id}
              className="mb-4 p-4 bg-white shadow-md flex"
            >
              <div className="flex-1 pr-4 border">
                <h2 className="text-center">Character Name:</h2>
                <Link to={`/characters/details/${character.id}`}>
                <h3 className="font text-center">{character.character_name}</h3>
                </Link>
              </div>

              <div className="flex-1 pr-4 border">
              <h2 className="text-center">Player Username:</h2>
                <h3 className="font text-center">
                    {character.user_username}
                </h3>
              </div>

              <div className="flex-1 pr-4 border">
              <h2 className="text-center">Class or Classes:</h2>
                <h3 className="text-center">
                  placeholder
                </h3>
              </div>

              <div className="flex-1 border">
              <h2 className="text-center">Race:</h2>
                <h3 className="text-center">
                  {character.race}
                </h3>
              </div>

              <div className="flex-1 border">
              <h2 className="text-center">Level:</h2>
                <h3 className="text-center">
                  {character.level}
                </h3>
              </div>

              <div className="flex-1 border">
              <h2 className="text-center">Party:</h2>
                <h3 className="text-center">
                  placeholder
                </h3>
              </div>

            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
