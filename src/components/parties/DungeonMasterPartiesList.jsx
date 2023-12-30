import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllDMsPartiesById } from "../../managers/PartyManager";

export const DMPartiesList = ({ token }) => {
  const [parties, setParties] = useState([]);
  const { dungeonMasterId } = useParams();

  useEffect(() => {
    getAllDMsPartiesById(token, dungeonMasterId).then((partyArray) => {
      setParties(partyArray);
    });
  }, [token, dungeonMasterId]);

  DMPartiesList.propTypes = {
    token: PropTypes.string,
  };

  return (
    <>
      <div>
        <h1 className="text-4xl text-center text-white">
          {dungeonMasterId}
          {"'"}s Parties
        </h1>
        <ul className="w-full">
          {parties.map((party) => (
            <li key={party.id} className="mb-4 p-4 bg-white shadow-md flex">
              <div className="flex-1 pr-4 border">
                <h2 className="text-center">Party Name:</h2>
                <Link to={`/parties/details/${party.id}`}>
                  <h3 className="text-center">{party.name}</h3>
                </Link>
              </div>

              <div className="flex-1 pr-4 border">
                <h2 className="text-center">Dungeon Master:</h2>
                <Link to={`/profiles/details/${party.dungeon_master.user.id}`}>
                  <h3 className="text-center">
                    {party.dungeon_master.user.username}
                  </h3>
                </Link>
              </div>

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

              <div className="flex-1 pr-4 border">
                <h2 className="text-center">Number of Characters:</h2>
                <h3 className="text-center">{party.characters.length}</h3>
              </div>

              <div className="flex-1 border">
                <h2 className="text-center">Looking for Player Status:</h2>
                <h3 className="text-center">
                  {party.lfp_status ? "Active" : "Not Active"}
                </h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
