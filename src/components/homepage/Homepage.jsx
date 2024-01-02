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
    <>
      <div>
        <div>
          {currentUserType === "Player" && (
            <div className="flex-1 pr-4 border">
              {/* Most Recent Character */}
              <h2 className="text-3xl text-center text-white">
                Most Recent Character:{" "}
              </h2>
              <div className="font text-center text-white">
                {party ? (
                  <div className="flex">
                    {/* Character Name */}
                    <div className="flex-1 pr-4 border">
                      <h2 className="text-center">Character Name:</h2>
                      <Link to={`/characters/details/${character?.id}`}>
                        <h3 className="font text-center">
                          {character?.character_name}
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
                        {character?.race_label?.label}
                      </h3>
                    </div>
                    {/* Level */}
                    <div className="flex-1 border">
                      <h2 className="text-center">Level:</h2>
                      <h3 className="text-center">{character?.level}</h3>
                    </div>
                    {/* Created On */}
                    <div className="flex-1 border">
                      <h2 className="text-center">Created On:</h2>
                      <h3 className="text-center">{character?.created_on}</h3>
                    </div>
                  </div>
                ) : (
                  "No Character"
                )}
              </div>
            </div>
          )}
          {/* Most Recent Party */}
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-white">Party Details</h1>
            {/* Party Details */}
            <div className="bg-gray-200 p-4 mb-4 rounded-md">
              <div className="flex justify-between items-center mb-2">
                {/* Player Count */}
                <p className="text-sm text-gray-600">
                  Players: {party?.characters?.length || 0}
                </p>

                {/* Created On */}
                <p className="text-sm text-gray-600">
                  Created On: {party?.created_on}
                </p>
              </div>

              {/* Party Name */}
              <h1 className="text-3xl text-center mb-2">{party?.name}</h1>
              {/* Conditionally render delete and edit buttons for DM */}
              <div className="text-center">
                {currentUserType === "DM" && (
                  <div className="flex-1 border items-center justify-center">
                    <button
                      onClick={() => handleEditButtonClick(party?.id)}
                      className="hover:text-green-600 transition border-slate-900 border-b-2 hover:border-green-600 cursor-pointer"
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
              </div>
              {/* Dungeon Master */}
              <div className="bg-white p-4 rounded-md">
                <Link
                  to={`/profiles/details/${party?.dungeon_master?.user.id}`}
                >
                  <h2 className="text-2xl text-center mb-2">
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
                      className="mb-4 p-4 bg-white shadow-md flex"
                    >
                      {/* Player Username */}
                      <div className="flex-1 pr-4 border">
                        <h2 className="text-center">Player Username:</h2>
                        <Link
                          to={`/profiles/details/${character.player_user.user.id}`}
                        >
                          <h3 className="font text-center">
                            {character.player_user.user.username}
                          </h3>
                        </Link>
                      </div>
                      {/* Character Name */}
                      <div className="flex-1 pr-4 border">
                        <h2 className="text-center">Character Name:</h2>
                        <Link to={`/characters/details/${character.id}`}>
                          <h3 className="font text-center">
                            {character.character_name}
                          </h3>
                        </Link>
                      </div>
                      {/* Character Class */}
                      <div className="flex-1 pr-4 border">
                        <h2 className="text-center">Class:</h2>
                        <h3 className="text-center">
                          {character?.class_label}
                        </h3>
                      </div>
                      {/* Character Race */}
                      <div className="flex-1 border">
                        <h2 className="text-center">Race:</h2>
                        <h3 className="text-center">{character.race}</h3>
                      </div>
                      {/* Character Level */}
                      <div className="flex-1 border">
                        <h2 className="text-center">Level:</h2>
                        <h3 className="text-center">{character.level}</h3>
                      </div>
                      {/* Character Health Points */}
                      <div className="flex-1 border">
                        <h2 className="text-center">HP:</h2>
                        <h3 className="text-center">placeholder</h3>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* End of Recent Party */}
        </div>
      </div>
    </>
  );
};
