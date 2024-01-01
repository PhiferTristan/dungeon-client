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

  const handleDeleteClick = (characterId) => {
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
      <h1 className="text-center text-4xl text-white">Character Sheet</h1>
      <p className="text-center text-white">Created: {character.created_on}</p>
      <body className="max-w-2xl mx-auto flex flex-col p-4 bg-white rounded shadow-lg mt-3">
        <article className="character-sheet flex-row border border-black">
          {/* Top of the Character Sheet */} # the top of character sheet
          <body className="flex flex-row border border-red-600 justify-center">
            {/* Buttons for Owner */}
            {/* Character Edit */}
            <div className="flex items-center justify-center">
              <div className="">
                <div className="border border-black text-center">
                  <button
                    onClick={() => handleEditClick(characterId)}
                    className="text-2xl mb-2 mr-2 ml-2 hover:text-green-600 transition border-slate-900 border-b-2 hover:border-green-600 cursor-pointer"
                  >
                    <HiCog className="h-7 w-7 mr-1" />
                  </button>
                  {/* Character Delete */}
                  <button
                    className="text-2xl mb-2 mr-2 ml-2 hover:text-red-600 transition border-slate-900 border-b-2 hover:border-red-600 cursor-pointer"
                    onClick={() => handleDeleteClick(characterId)}
                  >
                    <HiTrash className="h-7 w-7" />
                  </button>
                </div>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Owner Control
                </p>
              </div>
            </div>
            {/*  */}
            {/* Class and Level */}
            <div className="flex flex-row">
              <div className="">
                <div className="border border-black text-center">
                  <h2 className="text-2xl mb-2 mr-2 ml-2">
                    {character.class_label} {character.level}
                  </h2>
                </div>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Class & Level
                </p>
              </div>
            </div>
            {/* Background */}
            <div className="flex flex-row">
              <div className="">
                <div className="border border-black text-center">
                  <h2 className="text-2xl mb-2 mr-2 ml-2">
                    {character.background?.label}
                  </h2>
                </div>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Background
                </p>
              </div>
            </div>
            <div>
              {/* Player Username */}
              <div className="flex flex-row">
                <div className="">
                  <div className="border border-black text-center">
                    <h2 className="text-2xl mb-2 mr-2 ml-2">
                      {character.user_username}
                    </h2>
                  </div>
                  <p className="text-sm text-gray-500 text-center mt-2">
                    Player
                  </p>
                </div>
              </div>
            </div>
          </body>
          {/* Next Row */}# the next row
          <body className="flex flex-row justify-center border border-green-500">
            {/* Character Name */}
            <div className="flex flex-row">
              <div className="">
                <div className="border border-black">
                  <h2 className="text-2xl mb-2 mr-2 ml-2">
                    {character.character_name}
                  </h2>
                </div>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Character Name
                </p>
              </div>
            </div>
            {/* Race */}
            <div className="flex flex-row">
              <div className="">
                <div className="border border-black text-center">
                  <h2 className="text-2xl mb-2 mr-2 ml-2">
                    {character.race_label?.label}
                  </h2>
                </div>
                <p className="text-sm text-gray-500 text-center mt-2">Race</p>
              </div>
            </div>
            {/* Alignment */}
            <div className="flex flex-row">
              <div className="">
                <div className="border border-black text-center">
                  <h2 className="text-2xl mb-2 mr-2 ml-2">
                    {character.alignment_id}
                  </h2>
                </div>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Alignment
                </p>
              </div>
            </div>
            {/* Experience Points */}
            <div className="flex flex-row">
              <div className="">
                <div className="border border-black text-center">
                  <h2 className="text-2xl mb-2 mr-2 ml-2">10,000</h2>
                </div>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Experience Points
                </p>
              </div>
            </div>
          </body>
          #the left side of the character sheet for Abilities
          {/* Abilities */}
          <div className="abilities-container flex flex-col items-center border border-green-500 h-full">
            {character.character_abilities?.map((ability, index) => (
              <div
                className="ability-cube flex flex-col items-center mt-2 mb-2 justify-center w-[125px] h-[150px] border border-black"
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
          {/*  */}
        </article>
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
      </body>
    </>
  );
};
