import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getMostRecentCharacter } from "../../managers/CharacterManager";
import { useEffect, useState } from "react";
import { getAllPlayers } from "../../managers/PlayerManager";
import {
  deletePartyById,
  getAllPartiesByDungeonMasterId,
  getAllPartiesByPlayerId,
} from "../../managers/PartyManager";
import { HiCog, HiTrash } from "react-icons/hi";

export const Homepage = ({ token, currentUserType }) => {
  const [players, setPlayers] = useState([]);
  const [parties, setParties] = useState([]);

  const navigate = useNavigate();
  const playerId = parseInt(localStorage.getItem("playerId"));
  const dungeonMasterId = parseInt(localStorage.getItem("dungeonMasterId"));

  useEffect(() => {
    getAllPlayers(token).then((playersArray) => {
      setPlayers(playersArray);
    });

    // Fetch parties based on user type
    if (currentUserType === "Player" && playerId) {
      getAllPartiesByPlayerId(token, playerId).then((partiesArray) => {
        setParties(partiesArray);
      });
    } else if (currentUserType === "DM" && dungeonMasterId) {
      getAllPartiesByDungeonMasterId(token, dungeonMasterId).then(
        (partiesArray) => {
          setParties(partiesArray);
        }
      );
    }
  }, [token, currentUserType, playerId, dungeonMasterId]);

  const player = players.find((player) => player.id === playerId);
  const character = getMostRecentCharacter(token, player);
  const party = parties[0];

  const handleEditButtonClick = (partyId) => {
    navigate(`/parties/edit/${partyId}`);
  };

  const handleDeleteButtonClick = async (partyId) => {
    const isConfirmed = window.confirm(
      "Are you positive you want to delete this party?"
    );

    if (isConfirmed) {
      try {
        await deletePartyById(token, partyId).then(() => {});
        navigate(`/parties/mine`);
      } catch (error) {
        console.error("Error deleting party", error);
      }
    }
  };

  Homepage.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func.isRequired,
    currentUserId: PropTypes.string,
    currentUserType: PropTypes.string,
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-8 bg-white shadow-md rounded-md">
      {currentUserType === "Player" && (
        <div className="border-b mb-8 pb-6">
          <h2 className="text-3xl font-semibold mb-4 text-center">
            Most Recent Character
          </h2>
          {party ? (
            <div className="flex flex-wrap items-start justify-center">
              {/* Character Info */}
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4">
                <h3 className="text-xl font-semibold text-center mb-2">
                  Character Name
                </h3>
                <Link to={`/characters/details/${character?.id}`}>
                  <p className="text-center hover:text-red-500 transition hover:border-red-500 cursor-pointer">{character?.character_name}</p>
                </Link>
              </div>
  
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4">
                <h3 className="text-xl font-semibold text-center mb-2">
                  Player Username
                </h3>
                <Link to={`/profiles/details/${character?.user_id}`}>
                  <p className="text-center hover:text-red-500 transition hover:border-red-500 cursor-pointer">{player?.user.username}</p>
                </Link>
              </div>
  
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4">
                <h3 className="text-xl font-semibold text-center mb-2">Class</h3>
                <p className="text-center">{character?.class_label}</p>
              </div>
  
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4">
                <h3 className="text-xl font-semibold text-center mb-2">Race</h3>
                <p className="text-center">{character?.race_label?.label}</p>
              </div>
  
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4">
                <h3 className="text-xl font-semibold text-center mb-2">Level</h3>
                <p className="text-center">{character?.level}</p>
              </div>
  
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4">
                <h3 className="text-xl font-semibold text-center mb-2">
                  Created On
                </h3>
                <p className="text-center">{character?.created_on}</p>
              </div>
            </div>
          ) : (
            <p className="text-center">No Character</p>
          )}
        </div>
      )}
  
      {/* Most Recent Party */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Most Recent Party</h1>
      </div>
  
      <div className="bg-gray-200 p-4 mb-8 rounded-md">
        {/* Party Info */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-600">
            Players: {party?.characters?.length || 0}
          </p>
          <p className="text-sm text-gray-600">Created On: {party?.created_on}</p>
        </div>
  
        <h2 className="text-3xl text-center mb-2">{party?.name}</h2>
  
        {/* Edit/Delete Buttons (for DM) */}
        {currentUserType === "DM" && (
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={() => handleEditButtonClick(party?.id)}
              className="hover:text-green-600 transition border-slate-900 border-b-2 hover:border-green-600 cursor-pointer mr-4"
            >
              <div className="flex items-center">
                <HiCog className="h-7 w-7 mr-1" />
              </div>
            </button>
            <button
              className="hover:text-red-600 transition border-slate-900 border-b-2 hover:border-red-600 cursor-pointer"
              onClick={() => handleDeleteButtonClick(party?.id)}
            >
              <HiTrash className="h-7 w-7" />
            </button>
          </div>
        )}
  
        {/* Dungeon Master Info */}
        <div className="bg-white p-4 mb-4 rounded-md">
          <Link to={`/profiles/details/${party?.dungeon_master?.user.id}`}>
            <h2 className="text-2xl text-center mb-2 hover:text-red-500 transition hover:border-red-500 cursor-pointer">
              DM: {party?.dungeon_master?.user.username}
            </h2>
          </Link>
        </div>
  
        {/* Characters Box */}
        <div className="bg-white p-4 mb-4 rounded-md">
          <h2 className="text-2xl text-center mb-2">Characters</h2>
          {/* List of Characters */}
          <ul className="w-full">
            {party?.characters?.map((character) => (
              <li
                key={character.id}
                className="mb-4 p-4 bg-white shadow-md flex flex-wrap items-center justify-center"
              >
                {/* Player Username */}
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-2">
                  <h3 className="text-xl font-semibold text-center mb-1">
                    Player Username
                  </h3>
                  <Link
                    to={`/profiles/details/${character.player_user.user.id}`}
                  >
                    <p className="text-center hover:text-red-500 transition hover:border-red-500 cursor-pointer">{character.player_user.user.username}</p>
                  </Link>
                </div>
  
                {/* Character Name */}
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-2">
                  <h3 className="text-xl font-semibold text-center mb-1">
                    Character Name
                  </h3>
                  <Link to={`/characters/details/${character.id}`}>
                    <p className="text-center hover:text-red-500 transition hover:border-red-500 cursor-pointer">{character.character_name}</p>
                  </Link>
                </div>
  
                {/* Character Class */}
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-2">
                  <h3 className="text-xl font-semibold text-center mb-1">
                    Class
                  </h3>
                  <p className="text-center">{character?.class_label}</p>
                </div>
  
                {/* Character Race */}
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-2">
                  <h3 className="text-xl font-semibold text-center mb-1">
                    Race
                  </h3>
                  <p className="text-center">{character.race}</p>
                </div>
  
                {/* Character Level */}
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-2">
                  <h3 className="text-xl font-semibold text-center mb-1">
                    Level
                  </h3>
                  <p className="text-center">{character.level}</p>
                </div>
  
                {/* Character Health Points */}
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
                  <h3 className="text-xl font-semibold text-center mb-1">HP</h3>
                  <p className="text-center">--</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
