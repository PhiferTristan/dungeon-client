import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteCharacter,
  getCharacterById,
} from "../../managers/CharacterManager";
import PropTypes from "prop-types";
import { HiTrash, HiCog } from "react-icons/hi";
import { getAllSavingThrows } from "../../managers/SavingThrowsManager";
import { getAllDnDClasses } from "../../managers/DnDClassManager";
import { getAllSkills } from "../../managers/SkillManager";
import { getAllBackgrounds } from "../../managers/BackgroundManager";
// import { getAllLanguages } from "../../managers/LanguageManager";
import { getAllRaces } from "../../managers/RaceManager";

export const CharacterDetails = ({ token }) => {
  const [character, setCharacter] = useState([]);
  const [savingThrows, setSavingThrows] = useState([]);
  const [classes, setClasses] = useState([]);
  const [skills, setSkills] = useState([]);
  const [backgrounds, setBackgrounds] = useState([]);
  const [races, setRaces] = useState([]);
  // const [languages, setLanguages] = useState([]);

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

      getAllSavingThrows(token).then((savingThrowsArray) => {
        setSavingThrows(savingThrowsArray);
      });

      getAllDnDClasses(token).then((dndClassesArray) => {
        setClasses(dndClassesArray);
      });

      getAllBackgrounds(token).then((backgroundsArray) => {
        setBackgrounds(backgroundsArray);
      });

      getAllSkills(token).then((skillsArray) => {
        setSkills(skillsArray);
      });

      getAllRaces(token).then((racesArray) => {
        setRaces(racesArray);
      });

      // getAllLanguages(token).then((languagesArray) => {
      //   setLanguages(languagesArray);
      // });
    }
  }, [token, characterId]);

  console.log(character);

  const characterClass = classes.find(
    (dndClass) => dndClass.id === character.class_id
  );

  const characterBackground = backgrounds.find(
    (background) => background.id === character.background_id
  );
  console.log(characterBackground);

  const characterRace = races.find((race) => race.id === character.race_id);
  console.log(characterRace);

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
      <div className="max-w-2xl mx-auto flex flex-col p-4 bg-white rounded shadow-lg mt-3">
        <div className="character-sheet flex-row border border-black">
          {/* Top of the Character Sheet */}
          <div className="flex flex-row justify-center">
            {/* Buttons for Owner */}
            {/* Character Edit */}
            <div className="flex items-center justify-center mr-4 p-3">
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
            <div className="flex flex-row mr-4 p-3">
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
            <div className="flex flex-row mr-4 p-3">
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
              <div className="flex flex-row p-3">
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
          </div>
          {/* Next Row */}
          <div className="flex flex-row justify-center">
            {/* Character Name */}
            <div className="flex flex-row mr-4">
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
            <div className="flex flex-row mr-4">
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
            <div className="flex flex-row mr-4">
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
                <div className="border border-black w-17 h-10 text-center">
                  <h2 className="text-2xl mb-2 mr-2 ml-2 flex items-center justify-center"></h2>
                </div>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Experience Points
                </p>
              </div>
            </div>
          </div>
          {/* Proficiency */}
          <div className="proficiency-container flex flex-col items-center justify-center mb-4">
            <div className="border border-black mb-2">
              <span className="mr-2 ml-2">
                +{calculateProficiencyBonus(character.level)}
              </span>
              <span className="mr-2 ml-2">Proficiency Bonus</span>
            </div>

            {/* Speed */}
            <div className="border border-black">
              <span className="mr-2 ml-2">{characterRace?.speed}</span>
              <span className="mr-2 ml-2">Speed</span>
            </div>
          </div>
          {/* Abilities */}
          <div className="abilities-container p-4 bg-white rounded shadow-lg">
          <h1 className="text-center text-xl font-semibold p-2 ">Abilities</h1>
          <div className="abilities-container flex flex-row items-center h-full rounded shadow-lg ">
            {character.character_abilities?.map((ability, index) => (
              <div
                className="ability-cube flex flex-col items-center mt-2 mb-2 mr-2 ml-2 justify-center w-[125px] h-[150px] border border-black"
                key={index}
              >
                <span className="ability-label">{ability.ability_label}</span>
                <span className="ability-score text-xl font-semibold">
                  {ability.score_value}
                </span>
                <span className="ability-modifier">
                  +{calculateAbilityModifier(ability.score_value)}
                </span>
              </div>
            ))}
          </div>
          </div>
          {/* Saving Throws */}
          {character.character_abilities && characterClass && (
            <div className="saving-throws-container p-4 bg-white rounded shadow-lg">
              <h1 className="text-center text-xl font-semibold mb-4">
                Saving Throws
              </h1>
              {savingThrows?.map((savingThrow, index) => {
                const correspondingAbility = character.character_abilities.find(
                  (ability) => ability.ability_id === savingThrow.id
                );

                const abilityScore = correspondingAbility
                  ? correspondingAbility.score_value
                  : 0;

                const isProficient =
                  characterClass &&
                  (characterClass.saving_throw_prof_1 === savingThrow.id ||
                    characterClass.saving_throw_prof_2 === savingThrow.id);

                const modifier = calculateSavingThrowModifier(
                  abilityScore,
                  character.level,
                  isProficient
                );

                return (
                  <div
                    key={index}
                    className="saving-throw flex items-center justify-between p-3 mb-2 border border-black"
                  >
                    <span className="saving-throw-label">
                      {savingThrow.label} Save
                    </span>
                    <div className="flex items-center">
                      <span
                        className={`saving-throw-proficient w-4 h-4 rounded-full mr-2 ${
                          isProficient ? "bg-green-500" : "bg-gray-300"
                        }`}
                      ></span>
                      <span className="saving-throw-modifier">+{modifier}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Skills */}
          {character.character_skills && characterBackground && (
            <div className="skills-container p-4 bg-white rounded shadow-lg mt-3">
              <h1 className="text-center text-xl font-semibold mb-4">Skills</h1>
              {skills?.map((skill, index) => {
                const correspondingAbility = character.character_abilities.find(
                  (ability) => ability.ability_id === skill.ability.id
                );

                const abilityScore = correspondingAbility
                  ? correspondingAbility.score_value
                  : 0;

                const isProficient =
                  characterBackground &&
                  (characterBackground.skill_prof_1.id === skill.id ||
                    characterBackground.skill_prof_2.id === skill.id);

                const modifier = calculateSavingThrowModifier(
                  abilityScore,
                  character.level,
                  isProficient
                );

                return (
                  <div
                    key={index}
                    className="skill flex flex-row items-center justify-between border border-black p-3 mb-3"
                  >
                    <div className="flex items-center">
                      <span
                        className={`skill-proficient w-4 h-4 rounded-full mr-2 ${
                          isProficient ? "bg-green-500" : "bg-gray-300"
                        }`}
                      ></span>
                      <span className="skill-modifier">
                        +{modifier} {skill.label}
                      </span>
                    </div>
                    <span className="text-xs">
                      {"( "}
                      {skill.ability.label}
                      {" )"}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Languages */}
          <div className="languages-container p-4 bg-white rounded shadow-lg mt-3">
            <h1 className="text-center text-xl underline mb-4">Languages</h1>
            <div className="text-center">
              <p className="text-sm mb-2 mr-2 ml-2">
                {characterRace?.first_language.label}
              </p>
              <p className="text-sm mb-2 mr-2 ml-2">
                {characterRace?.second_language.label}
              </p>
            </div>
          </div>

          {/* Personality Trait */}
          <div className="personality-trait-container flex flex-row bg-white rounded shadow-lg mt-3 justify-center">
            <div className="">
              <h1 className="text-center text-xl underline p-2">
                Personality Trait
              </h1>
              <div className="text-center">
                <p className="text-sm mb-2 mr-2 ml-2">
                  {character.character_personality_trait?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Ideal */}
          <div className="ideal-container flex flex-row bg-white rounded shadow-lg mt-3 justify-center">
            <div className="">
              <h1 className="text-center text-xl underline p-2">Ideal</h1>
              <div className="text-center">
                <p className="text-sm mb-2 mr-2 ml-2">
                  {character.character_ideal?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Bond */}
          <div className="bond-container flex flex-row bg-white rounded shadow-lg mt-3 justify-center">
            <div className="">
              <h1 className="text-center text-xl underline p-2">Bond</h1>
              <div className="text-center">
                <p className="text-sm mb-2 mr-2 ml-2">
                  {character.character_bond?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Flaw */}
          <div className="flaw-container flex flex-row bg-white rounded shadow-lg mt-3 justify-center">
            <div className="">
              <h1 className="text-center text-xl underline p-2">Flaw</h1>
              <div className="text-center">
                <p className="text-sm mb-2 mr-2 ml-2">
                  {character.character_flaw?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="appearance-container flex flex-row bg-white rounded shadow-lg mt-3 justify-center">
            <div className="">
              <h1 className="text-center text-xl underline p-2">
                Character Appearance
              </h1>
              <div className="text-center">
                <p className="text-sm mb-2 mr-2 ml-2">
                  {character.character_appearance}
                </p>
              </div>
            </div>
          </div>

          {/* Bio/ Backstory */}
          <div className="backstory-container flex flex-row bg-white rounded shadow-lg mt-3 justify-center">
            <div className="">
              <h1 className="text-center text-xl underline p-2">
                Character Backstory
              </h1>
              <div className="text-center">
                <p className="text-sm mb-2 mr-2 ml-2">{character.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
