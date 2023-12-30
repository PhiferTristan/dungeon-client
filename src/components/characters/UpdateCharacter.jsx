import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editCharacter, getCharacterById } from "../../managers/CharacterManager";

export const UpdateCharacter = ({token}) => {
  const [currentCharacter, setCurrentCharacter] = useState({});

  const { characterId } = useParams();
  const navigate = useNavigate();

  console.log(token)

  useEffect(() => {
    getCharacterById(token, characterId).then((characterObj) => {
      setCurrentCharacter(characterObj);
    });
  }, [characterId, token]);

  const changeCharacterState = (e) => {
    setCurrentCharacter({
      ...currentCharacter,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const character = {
      character_name: currentCharacter.character_name,
    };

    editCharacter(character, characterId, token).then(() => {
      navigate(`/characters/details/${characterId}`);
    });
  };

  UpdateCharacter.propTypes = {
    token: PropTypes.string,
  };
  return (
    <>
      <div>
        <section>
          <form className="" onSubmit={handleSave}>
            <h1>Update Character</h1>
            <fieldset className="field">
                <label className="label">Character Name:</label>
                <div className="control">
                    <input
                    type="text"
                    name="character_name"
                    required
                    autoFocus
                    className="input"
                    value={currentCharacter.character_name}
                    onChange={changeCharacterState}>
                    </input>
                </div>
            </fieldset>
          </form>
        </section>
      </div>
    </>
  );
};
