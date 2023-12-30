import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  editCharacter,
  getCharacterById,
} from "../../managers/CharacterManager";

export const UpdateCharacter = ({ token }) => {
  const [currentCharacter, setCurrentCharacter] = useState({});

  const { characterId } = useParams();
  const navigate = useNavigate();

  console.log(token);

  useEffect(() => {
    getCharacterById(token, characterId).then((characterObj) => {
      setCurrentCharacter(characterObj);
    });
  }, [characterId, token]);

  const calculateAbilityModifier = (score) => {
    return Math.floor((score - 10) / 2);
  };

  const calculateProficiencyBonus = (level) => {
    return Math.ceil(level / 4) + 1;
  };

  const calculateSavingThrowModifier = (abilityScore, level, isProficient) => {
    const baseModifier = Math.floor((abilityScore - 10) / 2);
    const proficiencyBonus = isProficient ? Math.ceil(level / 4) + 1 : 0;

    return baseModifier + proficiencyBonus;
  };

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
      <div className="character-container flex flex-col items-center justify-center">
        <section>
          <form className="" onSubmit={handleSave}>
            <h1 className="text-4xl text-white text-center">
              Edit Character Sheet
            </h1>
            # the top left of character sheet
            {/* Character Name */}
            <fieldset className="">
              <label className="label">Character Name: </label>
              <div className="control">
                <input
                  type="text"
                  name="character_name"
                  required
                  autoFocus
                  className="input"
                  value={currentCharacter.character_name}
                  onChange={changeCharacterState}
                />
              </div>
            </fieldset>
            # the top middle to top right of the character sheet
            <div>
              <div>
                <span>{currentCharacter.dnd_class_label}</span>
              </div>

              <div>
                <span>{currentCharacter.level}</span>
              </div>

              <div>
                <span>{currentCharacter.user_username}</span>
              </div>

              <div>
                <span>{currentCharacter.race}</span>
              </div>

              <div>
                <span>{currentCharacter.alignment}</span>
              </div>

              <div>
                <span>placeholder: exp</span>
              </div>
            </div>
            #the left side of the character sheet for Abilities
            <div className="abilities-container flex flex-row gap-4">
              {currentCharacter.character_abilities?.map((ability, index) => (
                <div
                  className="ability-cube flex flex-col items-center justify-center w-[125px] h-[150px] p-4 bg-slate-300 border border-black rounded-md"
                  key={index}
                >
                  <span className="ability-label">{ability.ability_label}</span>
                  <span className="ability-score">{ability.score_value}</span>
                  <span className="ability-modifier">
                    +{calculateAbilityModifier(ability.score_value)}
                  </span>
                </div>
              ))}
            </div>
            <div className="inspiration-container">
              <span>placeholder: inspo count</span>
              <span>Inspiration</span>
            </div>
            <div className="proficiency-container">
              <span>+{calculateProficiencyBonus(currentCharacter.level)}</span>
              <span>Proficiency Bonus</span>
            </div>
            <div className="saving-throws-container">
              {currentCharacter.character_saving_throws?.map(
                (savingThrow, index) => {
                  const correspondingAbility =
                    currentCharacter.character_abilities.find(
                      (ability) =>
                        ability.ability_label === savingThrow.saving_throw_label
                    );

                  const abilityScore = correspondingAbility
                    ? correspondingAbility.score_value
                    : 0;

                  return (
                    <div key={index} className="saving-throw flex items-center">
                      <span
                        className={`saving-throw-proficient w-4 h-4 rounded-full mr-2 ${
                          savingThrow.proficient
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></span>
                      <span className="saving-throw-modifier">
                        +
                        {calculateSavingThrowModifier(
                          abilityScore,
                          currentCharacter.level,
                          savingThrow.proficient
                        )}
                      </span>
                      <span className="saving-throw-label">
                        {savingThrow.saving_throw_label}
                      </span>
                    </div>
                  );
                }
              )}
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button type="submit" className="button is-success">
                  Save
                </button>
              </div>
              <div className="control">
                <button
                  className="button is-danger is-light"
                  onClick={() => {
                    navigate(`/characters/mine`);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};