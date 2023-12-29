import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { getPartyById } from "../../managers/PartyManager";

export const PartyDetails = ({ token }) => {
  const [party, setParty] = useState([]);
  const { partyId } = useParams();

  useEffect(() => {
    getPartyById(token, partyId).then((party) => {
      setParty(party);
    });
  }, [token, partyId]);

  console.log(party);

  PartyDetails.propTypes = {
    token: PropTypes.string,
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Party Details</h1>
        {/* Party Details */}
        <div className="bg-gray-200 p-4 mb-4 rounded-md">
          <div className="flex justify-between items-center mb-2">
            {/* Player Count */}
            <p className="text-sm text-gray-600">
              Players: {party.characters?.length || 0}
            </p>
            
            {/* Created On */}
            <p className="text-sm text-gray-600">
              Created On: {party.created_on}
            </p>
          </div>

          {/* Party Name */}
          <h1 className="text-3xl text-center mb-2">{party.name}</h1>

          {/* Dungeon Master Box */}
          <div className="bg-white p-4 rounded-md">
            <Link to={`/profiles/details/${party.dungeon_master?.user.id}`}>
            <h2 className="text-2xl text-center mb-2">
              DM: {party.dungeon_master?.user.username}
            </h2>
            </Link>
          </div>

          {/* Characters Box */}
          <div className="bg-white p-4 mb-4 rounded-md">
            <h2 className="text-2xl text-center mb-2">Characters</h2>

            <ul className="w-full">
              {party.characters?.map((character) => (
                <li
                  key={character.id}
                  className="mb-4 p-4 bg-white shadow-md flex"
                >
                  <div className="flex-1 pr-4 border">
                    <h2 className="text-center">Player Username:</h2>
                    <h3 className="font text-center">
                      {character.player_user.user.username}
                    </h3>
                  </div>

                  <div className="flex-1 pr-4 border">
                    <h2 className="text-center">Character Name:</h2>
                    <Link to={`/characters/details/${character.id}`}>
                      <h3 className="font text-center">
                        {character.character_name}
                      </h3>
                    </Link>
                  </div>

                  <div className="flex-1 pr-4 border">
                    <h2 className="text-center">Class or Classes:</h2>
                    <h3 className="text-center">placeholder</h3>
                  </div>

                  <div className="flex-1 border">
                    <h2 className="text-center">Race:</h2>
                    <h3 className="text-center">{character.race}</h3>
                  </div>

                  <div className="flex-1 border">
                    <h2 className="text-center">Level:</h2>
                    <h3 className="text-center">{character.level}</h3>
                  </div>

                  <div className="flex-1 border">
                    <h2 className="text-center">HP:</h2>
                    <h3 className="text-center">placeholder</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bio Box */}
        <div className="bg-gray-200 p-4 rounded-md">
          <h2 className="text-2xl mb-2">Party Bio</h2>
          <p>{party.description}</p>
        </div>
      </div>
    </>
  );
};