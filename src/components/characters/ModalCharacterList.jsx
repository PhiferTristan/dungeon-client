import PropTypes from "prop-types";
import { getAllCharactersByPlayerId } from "../../managers/CharacterManager";
import { useEffect, useState } from "react";

export const ModalCharacterList = ({ token, playerId, onSelectCharacter }) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    // Fetch characters based on playerId
    getAllCharactersByPlayerId(token, playerId)
      .then((charactersArray) => {
        setCharacters(charactersArray);
      })
      .catch((error) => {
        console.error("Error fetching characters:", error);
      });
  }, [token, playerId]);

  return (
    <ul>
      {characters.map((character) => (
        <li key={character.id}>
          <button onClick={() => onSelectCharacter(character.id)} type="button">
            {character.character_name}
          </button>
        </li>
      ))}
    </ul>
  );
};

ModalCharacterList.propTypes = {
  token: PropTypes.string,
  playerId: PropTypes.string,
  onSelectCharacter: PropTypes.func.isRequired,
};
