import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  editCharacter,
  getCharacterById,
} from "../../managers/CharacterManager";
import { getAllRaces } from "../../managers/RaceManager";
import { getAllAlignments } from "../../managers/AlignmentManager";
import { getAllBackgrounds } from "../../managers/BackgroundManager";
import { getBondsByBackgroundId } from "../../managers/BondManager";
import { getAllAbilities } from "../../managers/AbilityManager";
import { getAllDnDClasses } from "../../managers/DnDClassManager";
import { getFlawsByBackgroundId } from "../../managers/FlawManager";
import { getIdealsByBackgroundId } from "../../managers/IdealManager";
import { getPersonalityTraitsByBackgroundId } from "../../managers/PersonalityTraitManager";
import { getAllSavingThrows } from "../../managers/SavingThrowsManager";

export const UpdateCharacter = ({ token }) => {
  const [currentCharacter, setCurrentCharacter] = useState({});
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [races, setRaces] = useState([]);
  const [alignments, setAlignments] = useState([]);
  const [backgrounds, setBackgrounds] = useState([]);
  const [bonds, setBonds] = useState([]);
  const [flaws, setFlaws] = useState([]);
  const [ideals, setIdeals] = useState([]);
  const [personalityTraits, setPersonalityTraits] = useState([]);
  const [selectedBackground, setSelectedBackground] = useState(0);
  const [abilities, setAbilities] = useState([]);
  const [abilityScores, setAbilityScores] = useState({});
  const [savingThrows, setSavingThrows] = useState([]);

  const { characterId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // Fetch character data
      const characterObj = await getCharacterById(token, characterId);
      setCurrentCharacter(characterObj);

      // Fetch other data after setting currentCharacter
      const classesArray = await getAllDnDClasses(token);
      setClasses(classesArray);

      const racesArray = await getAllRaces(token);
      setRaces(racesArray);

      const alignmentsArray = await getAllAlignments(token);
      setAlignments(alignmentsArray);

      const backgroundsArray = await getAllBackgrounds(token);
      setBackgrounds(backgroundsArray);

      const abilitiesArray = await getAllAbilities(token);
      setAbilities(abilitiesArray);

      const savingThrowsArray = await getAllSavingThrows(token);
      setSavingThrows(savingThrowsArray);

      // Continue with fetching background-related data
      const characterBackgroundId = parseInt(characterObj.background_id);
      setSelectedBackground(characterBackgroundId);

      if (characterBackgroundId !== 0) {
        const bondsArray = await getBondsByBackgroundId(
          token,
          characterBackgroundId
        );
        setBonds(bondsArray);

        const flawsArray = await getFlawsByBackgroundId(
          token,
          characterBackgroundId
        );
        setFlaws(flawsArray);

        const idealsArray = await getIdealsByBackgroundId(
          token,
          characterBackgroundId
        );
        setIdeals(idealsArray);

        const personalityTraitsArray = await getPersonalityTraitsByBackgroundId(
          token,
          characterBackgroundId
        );
        setPersonalityTraits(personalityTraitsArray);
      }
    };

    fetchData();
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

    // If the selected field is background, update selectedBackground
    if (e.target.name === "background_id") {
      setSelectedBackground(e.target.value);
    }

    // If the selected field is class, update selectedClass
    if (e.target.name === "class_id") {
      const selectedClassId = parseInt(e.target.value);
      const classDetails = classes.find((cls) => cls.id === selectedClassId);
      setSelectedClass(classDetails);
    }
  };

  const changeAbilityScore = (abilityId, score) => {
    setAbilityScores({
      ...abilityScores,
      [abilityId]: score,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const character = {
      character_name: currentCharacter.character_name,
      dnd_class_id: parseInt(currentCharacter.class_id),
      level: currentCharacter.level,
      race_id: parseInt(currentCharacter.race_id),
      sex: currentCharacter.sex,
      alignment_id: parseInt(currentCharacter.alignment_id),
      background_id: parseInt(currentCharacter.background_id),
      bio: currentCharacter.bio,
      character_appearance: currentCharacter.character_appearance,
      notes: currentCharacter.notes,
      bond_id: parseInt(currentCharacter.bond_id),
      flaw_id: parseInt(currentCharacter.flaw_id),
      ideal_id: parseInt(currentCharacter.ideal_id),
      personality_trait_id: parseInt(currentCharacter.personality_trait_id),
      ability_scores: abilityScores,
    };

    editCharacter(character, characterId, token).then(() => {
      navigate(`/characters/details/${characterId}`);
    });
  };

  console.log(currentCharacter);

  UpdateCharacter.propTypes = {
    token: PropTypes.string,
  };

  return (
    <>
      <div className="character-container flex flex-col items-center justify-center">
        <h1 className="text-4xl text-white text-center">
          Edit Character Sheet
        </h1>
        <form className="bg-gray-200 p-4 mb-4 rounded-md" onSubmit={handleSave}>
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
          {/* Input Character Level */}
          <div className="mb-2">
            <fieldset className="field">
              <label
                htmlFor="characterLevel"
                className="block text-sm font-medium text-gray-600"
              >
                Character Level:
              </label>
              <div>
                <input
                  type="text"
                  id="character_level"
                  name="level"
                  autoFocus
                  value={currentCharacter.level}
                  onChange={changeCharacterState}
                  className="input mt-1 p-2 border rounded-md w-full"
                />
              </div>
            </fieldset>
            <div className="proficiency-container">
              <span>+{calculateProficiencyBonus(currentCharacter.level)} </span>
              <span>Proficiency Bonus</span>
            </div>
          </div>
          {/* Class Selection */}
          <fieldset className="field">
            <label className="label">D&D Class: </label>
            <div className="control">
              <div className="select">
                <select
                  name="class_id"
                  value={currentCharacter.class_id}
                  required
                  autoFocus
                  onChange={changeCharacterState}
                >
                  <option value={0}>Please select a D&D class</option>
                  {classes.map((dndClass) => (
                    <option key={dndClass.id} value={dndClass.id}>
                      {dndClass.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>
          {/* Display additional details based on the selected Class */}
          {selectedClass && (
            <div>
              <h2 className="text-2xl">{selectedClass.label} Details</h2>
              <p>Description: {selectedClass.description}</p>
              <p>Primary Ability: {selectedClass.primary_ability}</p>
              <p>Hit Die: {selectedClass.hit_die}</p>
              <p>
                Saving Throw Proficiencies: {selectedClass.saving_throw_prof_1}{" "}
                and {selectedClass.saving_throw_prof_2}
              </p>
            </div>
          )}
          {/* Saving Throws */}
          <div className="saving-throws-container">
            {savingThrows?.map((savingThrow, index) => {
              const correspondingAbility =
                currentCharacter.character_abilities.find(
                  (ability) =>
                    ability.ability_id === savingThrow.id
                );

              const abilityScore = correspondingAbility
                ? correspondingAbility.score_value
                : 0;

              const isProficient =
                selectedClass &&
                (selectedClass.saving_throw_prof_1 ===
                  savingThrow.id ||
                  selectedClass.saving_throw_prof_2 ===
                    savingThrow.id);

              const modifier = calculateSavingThrowModifier(abilityScore, currentCharacter.level, isProficient)

              return (
                <div key={index} className="saving-throw flex items-center">
                  <span
                    className={`saving-throw-proficient w-4 h-4 rounded-full mr-2 ${
                      isProficient ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></span>
                  <span className="saving-throw-modifier">
                    +
                    {modifier}
                  </span>
                  <span className="saving-throw-label">
                    {savingThrow.label} Saving Throw
                  </span>
                </div>
              );
            })}
          </div>
          {/* Race Selection */}
          <fieldset className="field">
            <label className="label">Race: </label>
            <div className="control">
              <div className="select">
                <select
                  name="race_id"
                  value={currentCharacter.race_id}
                  required
                  autoFocus
                  onChange={changeCharacterState}
                >
                  <option value={0}>Please select a race</option>
                  {races.map((race) => {
                    return (
                      <option key={race.id} value={race.id}>
                        {race.label}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </fieldset>
          {/* Input Sex */}
          <div className="mb-2">
            <fieldset className="field">
              <label
                htmlFor="characterSex"
                className="block text-sm font-medium text-gray-600"
              >
                Character Sex:
              </label>
              <div>
                <input
                  type="text"
                  id="character_sex"
                  name="sex"
                  autoFocus
                  value={currentCharacter.sex}
                  onChange={changeCharacterState}
                  className="input mt-1 p-2 border rounded-md w-full"
                />
              </div>
            </fieldset>
          </div>
          {/* Alignment Selection */}
          <fieldset className="field">
            <label className="label">Alignment: </label>
            <div className="control">
              <div className="select">
                <select
                  name="alignment_id"
                  value={currentCharacter.alignment_id}
                  required
                  autoFocus
                  onChange={changeCharacterState}
                >
                  <option value={0}>Please select an alignment</option>
                  {alignments.map((alignment) => {
                    return (
                      <option key={alignment.id} value={alignment.id}>
                        {alignment.label}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </fieldset>
          {/* Abilities Section */}
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-600">
              Ability Scores:
            </label>
            <div className="grid grid-cols-4 gap-4">
              {abilities.map((ability) => (
                <div key={ability.id}>
                  <label className="text-sm font-medium text-gray-600">
                    {ability.label}:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={abilityScores[ability.id] || ""}
                    onChange={(e) =>
                      changeAbilityScore(
                        ability.id,
                        parseInt(e.target.value, 10)
                      )
                    }
                    className="input mt-1 p-2 border rounded-md w-full"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Previous Ability Scores*/}
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
          {/* Background Selection */}
          <fieldset className="field">
            <label className="label">Background: </label>
            <div className="control">
              <div className="select">
                <select
                  name="background_id"
                  value={currentCharacter.background_id}
                  required
                  autoFocus
                  onChange={changeCharacterState}
                >
                  <option value={0}>Please select a background</option>
                  {backgrounds.map((background) => {
                    return (
                      <option key={background.id} value={background.id}>
                        {background.label}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </fieldset>
          {/* Bond Selection */}
          <fieldset className="field">
            <label className="label">Bond: </label>
            <div className="control">
              <div className="select">
                <select
                  name="bond_id"
                  value={currentCharacter.bond_id}
                  required
                  autoFocus
                  onChange={changeCharacterState}
                  disabled={selectedBackground === 0} // Disable until background is selected
                >
                  <option value={""} disabled={selectedBackground === 0}>
                    {selectedBackground === 0
                      ? "Please select a background first"
                      : "Please select a bond"}
                  </option>
                  {bonds.map((bond) => (
                    <option key={bond.id} value={bond.id}>
                      {bond.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>
          {/* Flaw Selection */}
          <fieldset className="field">
            <label className="label">Flaw: </label>
            <div className="control">
              <div className="select">
                <select
                  name="flaw_id"
                  value={currentCharacter.flaw_id}
                  required
                  autoFocus
                  onChange={changeCharacterState}
                  disabled={selectedBackground === 0} // Disable until background is selected
                >
                  <option value={""} disabled={selectedBackground === 0}>
                    {selectedBackground === 0
                      ? "Please select a background first"
                      : "Please select a flaw"}
                  </option>
                  {flaws.map((flaw) => (
                    <option key={flaw.id} value={flaw.id}>
                      {flaw.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>
          {/* Ideal Selection */}
          <fieldset className="field">
            <label className="label">Ideal: </label>
            <div className="control">
              <div className="select">
                <select
                  name="ideal_id"
                  value={currentCharacter.ideal_id}
                  required
                  autoFocus
                  onChange={changeCharacterState}
                  disabled={selectedBackground === 0} // Disable until background is selected
                >
                  <option value={""} disabled={selectedBackground === 0}>
                    {selectedBackground === 0
                      ? "Please select a background first"
                      : "Please select a ideal"}
                  </option>
                  {ideals.map((ideal) => (
                    <option key={ideal.id} value={ideal.id}>
                      {ideal.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>
          {/* Personality Trait Selection */}
          <fieldset className="field">
            <label className="label">Personality Trait: </label>
            <div className="control">
              <div className="select">
                <select
                  name="personality_trait_id"
                  value={currentCharacter.personality_trait_id}
                  required
                  autoFocus
                  onChange={changeCharacterState}
                  disabled={selectedBackground === 0} // Disable until background is selected
                >
                  <option value={""} disabled={selectedBackground === 0}>
                    {selectedBackground === 0
                      ? "Please select a background first"
                      : "Please select a personality trait"}
                  </option>
                  {personalityTraits.map((personality_trait) => (
                    <option
                      key={personality_trait.id}
                      value={personality_trait.id}
                    >
                      {personality_trait.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>
          {/* Input Bio */}
          <div className="mb-2">
            <fieldset className="field">
              <label
                htmlFor="characterBio"
                className="block text-sm font-medium text-gray-600"
              >
                Character Bio:
              </label>
              <div>
                <input
                  type="text"
                  id="character_bio"
                  name="bio"
                  autoFocus
                  value={currentCharacter.bio}
                  onChange={changeCharacterState}
                  className="input mt-1 p-2 border rounded-md w-full"
                />
              </div>
            </fieldset>
          </div>
          {/* Input Character Appearance */}
          <div className="mb-2">
            <fieldset className="field">
              <label
                htmlFor="characterAppearance"
                className="block text-sm font-medium text-gray-600"
              >
                Character Appearance:
              </label>
              <div>
                <input
                  type="text"
                  id="character_appearance"
                  name="character_appearance"
                  autoFocus
                  value={currentCharacter.character_appearance}
                  onChange={changeCharacterState}
                  className="input mt-1 p-2 border rounded-md w-full"
                />
              </div>
            </fieldset>
          </div>
          {/* Input Character Notes */}
          <div className="mb-2">
            <fieldset className="field">
              <label
                htmlFor="characterNotes"
                className="block text-sm font-medium text-gray-600"
              >
                Character Notes:
              </label>
              <div>
                <input
                  type="text"
                  id="character_notes"
                  name="notes"
                  autoFocus
                  value={currentCharacter.notes}
                  onChange={changeCharacterState}
                  className="input mt-1 p-2 border rounded-md w-full"
                />
              </div>
            </fieldset>
          </div>
          {/* Saving Throws */}
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
                        savingThrow.proficient ? "bg-green-500" : "bg-gray-300"
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
      </div>
    </>
  );
};
