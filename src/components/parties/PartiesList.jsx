import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getAllParties, joinParty } from "../../managers/PartyManager";
import { CharacterModal } from "../characters/CharacterModal";

export const PartiesList = ({ token }) => {
  const [allParties, setAllParties] = useState([]);
  console.log(localStorage);
  const userType = localStorage.getItem("userType");
  const playerId = localStorage.getItem("playerId");
  const [showCharacterModal, setShowCharacterModal] = useState(false);
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const [selectedPartyId, setSelectedPartyId] = useState(null);

  useEffect(() => {
    getAllParties(token).then((partiesArray) => {
      setAllParties(partiesArray);
    });
  }, [token]);

  const handleJoinParty = (partyId) => {
    setSelectedPartyId(partyId);
    setShowCharacterModal(true);
  };

  PartiesList.propTypes = {
    token: PropTypes.string,
  };

  return (
    <>
      <div>
        <h1 className="text-3xl text-white text-center mb-4">All Parties</h1>
        {/* Parties List */}
        <ul className="w-full">
          {allParties.map((party) => (
            <li key={party.id} className="mb-4 p-4 bg-white shadow-md flex">
              <div className="flex-1 pr-4 border">
                <h2 className="text-center">Party Name:</h2>
                <Link to={`/parties/details/${party.id}`}>
                  <h3 className="text-center">{party.name}</h3>
                </Link>
              </div>
              {/* Dungeon Master */}
              <div className="flex-1 pr-4 border">
                <h2 className="text-center">Dungeon Master:</h2>
                <Link to={`/profiles/details/${party.dungeon_master.user.id}`}>
                  <h3 className="text-center">
                    {party.dungeon_master.user.username}
                  </h3>
                </Link>
              </div>
            {/* Player Names List */}
              <div className="flex-1 pr-4 border">
                <h2 className="text-center">Players:</h2>
                <h3 className="text-center">
                  {party.characters.map((character) => (
                    <li className="" key={character.id}>
                      <Link
                        to={`/profiles/details/${character.player_user.user.id}`}
                      >
                        {character.player_user.user.username}
                      </Link>
                    </li>
                  ))}
                </h3>
              </div>
                    {/* # of Characters */}
              <div className="flex-1 pr-4 border">
                <h2 className="text-center">Number of Characters:</h2>
                <h3 className="text-center">{party.characters.length}</h3>
              </div>
                    {/* LFP Status */}
              <div className="flex-1 border">
                <h2 className="text-center">Looking for Player Status:</h2>
                <h3 className="text-center">
                  {party.lfp_status ? "Active" : "Not Active"}
                </h3>
              </div>
              {/* Conditionally render the join button for player users */}
              {userType === "Player" && (
                <div className="flex-1 border">
                  <button
                    className="text-center bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={() => handleJoinParty(party.id)}
                  >
                    Join Party
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
        {/* Character list modal */}
        <CharacterModal
          isOpen={showCharacterModal}
          onClose={() => setShowCharacterModal(false)}
          token={token}
          playerId={playerId}
          onSelectCharacter={(characterId) => {
            setSelectedCharacterId(characterId);
            setShowCharacterModal(false); // Close the modal
            // Call joinParty after character selection
            if (selectedPartyId) {
              joinParty(token, selectedPartyId, characterId)
                .then((response) => {
                  // Handle the response as needed
                  console.log(response);
                })
                .catch((error) => {
                  // Handle errors
                  console.error(error);
                });
            }
          }}
        />
      </div>
    </>
  );
};