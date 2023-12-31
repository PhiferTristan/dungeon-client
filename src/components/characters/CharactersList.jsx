import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getAllCharacters } from "../../managers/CharacterManager";

export const CharactersList = ({ token }) => {
  const [allCharacters, setAllCharacters] = useState([]);

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
            <li key={character.id} className="mb-4 p-4 bg-white shadow-md flex">
              <div className="flex-1 pr-4 border">
                <h2 className="text-center">Character Name:</h2>
                <Link to={`/characters/details/${character.id}`}>
                  <h3 className="font text-center hover:text-red-500 transition border-b-2 border-slate-900 hover:border-red-500 cursor-pointer">
                    {character.character_name}
                  </h3>
                </Link>
              </div>

              <div className="flex-1 pr-4 border">
                <h2 className="text-center">Player Username:</h2>
                <Link to={`/profiles/details/${character?.user_id}`}>
                <h3 className="font text-center hover:text-red-500 transition border-b-2 border-slate-900 hover:border-red-500 cursor-pointer">{character.user_username}</h3>
                </Link>
              </div>

              <div className="flex-1 pr-4 border">
                <h2 className="text-center">Class:</h2>
                <h3 className="text-center">{character.class_label}</h3>
              </div>

              <div className="flex-1 border">
                <h2 className="text-center">Race:</h2>
                <h3 className="text-center">{character.race_label?.label}</h3>
              </div>

              <div className="flex-1 border">
                <h2 className="text-center">Level:</h2>
                <h3 className="text-center">{character.level}</h3>
              </div>

              <div className="flex-1 border">
                <h2 className="text-center">Party:</h2>
                <h3 className="text-center">placeholder</h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
