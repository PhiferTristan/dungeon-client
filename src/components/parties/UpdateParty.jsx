import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import {
  editParty,
  getPartyById,
  removeCharacterFromParty,
} from "../../managers/PartyManager";

export const UpdateParty = ({ token }) => {
  const [currentParty, setCurrentParty] = useState({
    name: "",
    description: "",
    lfp_status: false,
    characters: [],
  });

  const [charactersToRemove, setCharactersToRemove] = useState([]);

  const { partyId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPartyById(token, partyId).then((party) => {
      setCurrentParty(party);
    });
  }, [token, partyId]);

  console.log(currentParty.id);
  console.log(token);

  const changePartyState = (e) => {
    setCurrentParty({
      ...currentParty,
      [e.target.name]: e.target.value,
    });
  };

  const handleRemoveCharacter = (characterId) => {
    // Check if the characterId is already in the list
    if (charactersToRemove.includes(characterId)) {
      // If already marked for removal, remove from the list
      setCharactersToRemove(
        charactersToRemove.filter((id) => id !== characterId)
      );
    } else {
      // If not marked for removal, add to the list
      setCharactersToRemove([...charactersToRemove, characterId]);
    }
  };

  console.log(charactersToRemove);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      // Remove characters marked for removal
      await Promise.all(
        charactersToRemove.map(async (characterId) => {
          await removeCharacterFromParty(token, partyId, characterId);
        })
      );

      setCharactersToRemove([]);

      const party = {
        name: currentParty.name,
        description: currentParty.description,
        lfp_status: currentParty.lfp_status,
      };

      await editParty(party, partyId, token);
      navigate(`/parties/details/${partyId}`);
    } catch (error) {
      console.error("Error removing characters from party", error);
    }
  };

  UpdateParty.propTypes = {
    token: PropTypes.string,
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Edit Party</h1>
        {/* Party Update Form */}
        <form onSubmit={handleSave} className="bg-gray-200 p-4 mb-4 rounded-md">
          {/* Editable Party Name */}
          <div className="mb-2">
            <fieldset className="field">
              <label
                htmlFor="partyName"
                className="block text-sm font-medium text-gray-600"
              >
                Party Name:
              </label>
              <div>
                <input
                  type="text"
                  id="partyName"
                  name="name"
                  autoFocus
                  value={currentParty.name}
                  onChange={changePartyState}
                  className="input mt-1 p-2 border rounded-md w-full"
                />
              </div>
            </fieldset>
          </div>
          {/* Characters List */}
          <div className="bg-white p-4 mb-4 rounded-md">
            <h2 className="text-2xl text-center mb-2">Characters</h2>
            <ul className="w-full">
              {currentParty.characters?.map((character) => (
                <li
                  key={character.id}
                  className={`mb-4 p-4 bg-white shadow-md flex ${
                    charactersToRemove.includes(character.id)
                      ? "bg-red-400"
                      : ""
                  }`}
                >
                  {/* Character Player Username */}
                  <div className="flex-1 pr-4 border">
                    <h2 className="text-center">Player Username:</h2>
                    <h3 className="font text-center">
                      {character.player_user.user.username}
                    </h3>
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
                  {/* Remove Player Button */}
                  <div className="flex-1 border">
                    <h2 className="text-center">Remove Player:</h2>
                    <button
                      type="button"
                      onClick={() => handleRemoveCharacter(character.id)}
                      className="text-red-600 hover:text-red-700 transition"
                    >
                      {charactersToRemove.includes(character.id)
                        ? "Cancel Removal"
                        : "Remove"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Editable Bio */}
          <div className="mb-2">
            <fieldset>
              <label
                htmlFor="partyBio"
                className="block text-sm font-medium text-gray-600"
              >
                Party Description:
              </label>
              <div>
                <textarea
                  id="partyDescription"
                  name="description"
                  value={currentParty.description}
                  onChange={changePartyState}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
            </fieldset>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
};
