import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  deleteCharacter,
  getAllCharactersByPlayerId,
} from "../../managers/CharacterManager";
import { HiCog, HiTrash } from "react-icons/hi";

export const MyCharactersList = ({ token }) => {
  const [allCharacters, setAllCharacters] = useState([]);
  const playerId = localStorage.getItem("playerId");
  const navigate = useNavigate();

  useEffect(() => {
    getAllCharactersByPlayerId(token, playerId).then((charactersArray) => {
      setAllCharacters(charactersArray);
    });
  }, [token, playerId]);

  const handleDeleteButtonClick = (characterId) => {
    console.log("running delete click");
    const confirmDelete = window.confirm(
      "Are you positive you want to delete this character?"
    );
    if (confirmDelete) {
      deleteCharacter(token, characterId).then(() => {
        navigate(`/characters/mine`);
      });
    }
  };

  MyCharactersList.propTypes = {
    token: PropTypes.string,
  };

  return (
    <>
      <div>
        <h1 className="text-3xl text-white text-center mb-4">My Characters</h1>
        {/* Create Character Button */}
        <div className="text-center mb-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate("/characters/create")}
          >
            Create Character
          </button>
        </div>
        <ul className="w-full">
          {allCharacters.map((character) => (
            <li key={character.id} className="mb-4 p-4 bg-white shadow-md flex">
              {/* Character Name */}
              <div className="flex-1 pr-4 border">
                <h2 className="text-center">Character Name:</h2>
                <Link to={`/characters/details/${character.id}`}>
                  <h2 className="font text-center hover:text-red-500 transition border-b-2 border-slate-900 hover:border-red-500 cursor-pointer">
                    {character.character_name}
                  </h2>
                </Link>
              </div>
              {/* Player Username */}
              <div className="flex-1 pr-4 border">
                <h2 className="text-center">Player Username:</h2>
                <h3 className="font text-center">{character.user_username}</h3>
              </div>
              {/* Character Class */}
              <div className="flex-1 pr-4 border">
                <h2 className="text-center">Class:</h2>
                <h3 className="text-center">{character.class_label}</h3>
              </div>
              {/* Character Race */}
              <div className="flex-1 border">
                <h2 className="text-center">Race:</h2>
                <h3 className="text-center">{character.race_label.label}</h3>
              </div>
              {/* Character Level */}
              <div className="flex-1 border">
                <h2 className="text-center">Level:</h2>
                <h3 className="text-center">{character.level}</h3>
              </div>
              {/* Character Party */}
              <div className="flex-1 border">
                <h2 className="text-center">Party:</h2>
                <h3 className="text-center">placeholder</h3>
              </div>
              {/* Character Edit */}
              <div className="flex-1 border items-center justify-center">
                <p>edit character</p>
                <Link
                  to={`/characters/edit/${character.id}`}
                  className="hover:text-green-600 transition border-slate-900 border-b-2 hover:border-green-600 cursor-pointer"
                >
                  <HiCog className="h-7 w-7 mr-1" />
                </Link>
              </div>
              {/* Character Delete */}
              <div>
                <p>delete character</p>
                <button
                  className="hover:text-red-600 transition border-slate-900 border-b-2 hover:border-red-600 cursor-pointer"
                  onClick={() => handleDeleteButtonClick(character.id)}
                >
                  <HiTrash className="h-7 w-7" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
