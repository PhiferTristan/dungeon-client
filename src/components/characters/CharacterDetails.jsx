import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteCharacter,
  getCharacterById,
} from "../../managers/CharacterManager";
import PropTypes from "prop-types";
import { HiTrash, HiCog } from "react-icons/hi";

export const CharacterDetails = ({ token }) => {
  const [character, setCharacter] = useState([]);
  console.log(character);

  const { characterId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && characterId) {
      getCharacterById(token, characterId)
        .then((characterObj) => {
          setCharacter(characterObj);
        })
        .catch((error) => {
          console.error("Error fetching character details:", error);
        });
    }
  }, [token, characterId]);

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

  const handleEditClick = (characterId) => {
    navigate(`/characters/edit/${characterId}`);
  };

  const handleDelete = (characterId) => {
    const confirmDelete = window.confirm(
      "Are you sure you positive you want to delete this character?"
    );
    if (confirmDelete) {
      deleteCharacter(token, characterId).then(() => {
        navigate(`/characters/mine`);
      });
    }
  };

  CharacterDetails.propTypes = {
    token: PropTypes.string,
  };

  return (
    <>
      <div className="character-container flex flex-col">
        <h4 className="text-center">Character Sheet</h4># the top left of
        character sheet
        <div>
          <button onClick={() => handleEditClick(characterId)} className="">
            <div className="flex items-center">
              <HiCog className="h-7 w-7 mr-1" />
            </div>
          </button>
        </div>
        <div>
          <button onClick={() => handleDelete(characterId)} className="">
            <div className="flex items-center">
              <HiTrash className="h-7 w-7 mr-1" />
            </div>
          </button>
        </div>
        <div>
          <span>{character.character_name}</span>
        </div>
        # the top middle to top right of the character sheet
        <div>
          <div>
            <span>placeholder: class</span>
          </div>

          <div>
            <span>{character.level}</span>
          </div>

          <div>
            <span>{character.user_username}</span>
          </div>

          <div>
            <span>{character.race}</span>
          </div>

          <div>
            <span>{character.alignment}</span>
          </div>

          <div>
            <span>placeholder: exp</span>
          </div>
        </div>
        #the left side of the character sheet for Abilities
        <div className="abilities-container flex flex-col gap-4">
          {character.character_abilities?.map((ability, index) => (
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
          <span>+{calculateProficiencyBonus(character.level)}</span>
          <span>Proficiency Bonus</span>
        </div>
        <div className="saving-throws-container">
          {character.character_saving_throws?.map((savingThrow, index) => {
            const correspondingAbility = character.character_abilities.find(
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
                    savingThrow.proficient ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></span>
                <span className="saving-throw-modifier">
                  +
                  {calculateSavingThrowModifier(
                    abilityScore,
                    character.level,
                    savingThrow.proficient
                  )}
                </span>
                <span className="saving-throw-label">
                  {savingThrow.saving_throw_label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
