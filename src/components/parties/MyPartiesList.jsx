import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { HiTrash, HiCog } from "react-icons/hi";
import {
  deletePartyById,
  getAllPartiesByDungeonMasterId,
  getAllPartiesByPlayerId,
} from "../../managers/PartyManager";

export const MyPartiesList = ({ token }) => {
  const [allParties, setAllParties] = useState([]);
  const userType = localStorage.getItem("userType");
  const playerId = localStorage.getItem("playerId");
  const dungeonMasterId = localStorage.getItem("dungeonMasterId");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect for MyPartiesList is running");
    // Fetch parties based on user type
    if (userType === "Player" && playerId) {
      getAllPartiesByPlayerId(token, playerId).then((partiesArray) => {
        setAllParties(partiesArray);
      });
    } else if (userType === "DM" && dungeonMasterId) {
      getAllPartiesByDungeonMasterId(token, dungeonMasterId).then(
        (partiesArray) => {
          setAllParties(partiesArray);
        }
      );
    }
  }, [token, userType, playerId, dungeonMasterId]);

  const handleEditButtonClick = (partyId) => {
    navigate(`/parties/edit/${partyId}`);
  };

  const handleDeleteButtonClick = async (partyId) => {
    const isConfirmed = window.confirm(
      "Are you positive you want to delete this party?"
    );

    if (isConfirmed) {
      try {
        await deletePartyById(token, partyId).then(() => {
          // getAllPartiesByDungeonMasterId(token, dungeonMasterId);
        });
      } catch (error) {
        console.error("Error deleting party", error);
      }
    }
  };

  MyPartiesList.propTypes = {
    token: PropTypes.string,
  };

  return (
    <>
      <div>
        <h1 className="text-3xl text-white text-center mb-4">My Parties</h1>
        <ul className="w-full">
          {allParties.map((party) => (
            <li key={party.id} className="mb-4 p-4 bg-white shadow-md flex">
              <div className="flex-1 pr-4 border">
                <h2 className="text-center">Party Name:</h2>
                <Link to={`/parties/details/${party.id}`}>
                  <h3 className="text-center">{party.name}</h3>
                </Link>
              </div>

              <div className="flex-1 pr-4 border">
                <h2 className="text-center">Dungeon Master:</h2>
                <Link to={`/profiles/details/${party.dungeon_master?.user.id}`}>
                  <h3 className="text-center">
                    {party.dungeon_master?.user.username}
                  </h3>
                </Link>
              </div>

              <div className="flex-1 pr-4 border">
                <h2 className="text-center">Players:</h2>
                <h3 className="text-center">
                  {party.characters?.map((character) => (
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
                <h3 className="text-center">{party.characters?.length}</h3>
              </div>

              <div className="flex-1 border">
                <h2 className="text-center">Looking for Player Status:</h2>
                <h3 className="text-center">
                  {party.lfp_status ? "Active" : "Not Active"}
                </h3>
              </div>

              {/* Conditionally render delete button for DM */}
              {userType === "DM" && (
                <div className="flex-1 border items-center justify-center">
                  <button
                    onClick={() => handleEditButtonClick(party.id)}
                    className="hover:text-green-600 transition border-slate-900 border-b-2 hover:border-green-600 cursor-pointer"
                  >
                    <div className="flex items-center">
                      <HiCog className="h-7 w-7 mr-1" />
                    </div>
                  </button>
                  <button
                    className="hover:text-red-600 transition border-slate-900 border-b-2 hover:border-red-600 cursor-pointer"
                    onClick={() => handleDeleteButtonClick(party.id)}
                  >
                    <HiTrash className="h-7 w-7" />
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
