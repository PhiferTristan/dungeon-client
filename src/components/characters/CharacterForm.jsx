import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { createCharacter } from "../../managers/CharacterManager";
import { getAllRaces } from "../../managers/RaceManager";
import { getAllAlignments } from "../../managers/AlignmentManager";
import { getAllBackgrounds } from "../../managers/BackgroundManager";
import { getBondsByBackgroundId } from "../../managers/BondManager";
import { getAllAbilities } from "../../managers/AbilityManager";

export const CharacterForm = ({ token }) => {
  const [newCharacter, setNewCharacter] = useState({});
  const [races, setRaces] = useState([]);
  const [alignments, setAlignments] = useState([]);
  const [backgrounds, setBackgrounds] = useState([]);
  const [bonds, setBonds] = useState([]);
  const [selectedBackground, setSelectedBackground] = useState(0);
  const [abilities, setAbilities] = useState([]);
  const [abilityScores, setAbilityScores] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    getAllRaces(token).then((racesArray) => {
      setRaces(racesArray);
    });

    getAllAlignments(token).then((alignmentsArray) => {
      setAlignments(alignmentsArray);
    });

    getAllBackgrounds(token).then((backgroundsArray) => {
      setBackgrounds(backgroundsArray);
    });

    getAllAbilities(token).then((abilitiesArray) => {
      setAbilities(abilitiesArray);
    });
  }, [token]);

  // Fetch bonds for the selected background
  useEffect(() => {
    if (selectedBackground !== 0) {
      getBondsByBackgroundId(token, selectedBackground).then((bondsArray) => {
        setBonds(bondsArray);
        console.log(bonds);
      });
    }
  }, [token, selectedBackground]);

  const changeCharacterState = (e) => {
    setNewCharacter({
      ...newCharacter,
      [e.target.name]: e.target.value,
    });

    // If the selected field is background, update selectedBackground
    if (e.target.name === "background_id") {
      setSelectedBackground(e.target.value);
    }
  };

  const changeAbilityScore = (abilityId, score) => {
    setAbilityScores({
      ...abilityScores,
      [abilityId]: score,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    let character = {
      character_name: newCharacter.character_name,
      level: newCharacter.level,
      race_id: parseInt(newCharacter.race_id),
      sex: newCharacter.sex,
      alignment_id: parseInt(newCharacter.alignment_id),
      background_id: parseInt(newCharacter.background_id),
      bio: newCharacter.bio,
      character_appearance: newCharacter.character_appearance,
      notes: newCharacter.notes,
      bond_id: parseInt(newCharacter.bond_id),
      ability_scores: abilityScores,
    };

    createCharacter(token, character).then(() => {
      navigate(`/characters/mine`);
    });
  };

  console.log("Bonds State:", bonds);
  console.log("New Character State:", newCharacter);

  CharacterForm.propTypes = {
    token: PropTypes.string,
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Create Character Form</h1>

        {/* Party Update Form */}
        <form onSubmit={handleSave} className="bg-gray-200 p-4 mb-4 rounded-md">
          {/* Input Character Name */}
          <div className="mb-2">
            <fieldset className="field">
              <label
                htmlFor="characterName"
                className="block text-sm font-medium text-gray-600"
              >
                Character Name:
              </label>
              <div>
                <input
                  type="text"
                  id="character_name"
                  name="character_name"
                  autoFocus
                  value={newCharacter.character_name}
                  onChange={changeCharacterState}
                  className="input mt-1 p-2 border rounded-md w-full"
                />
              </div>
            </fieldset>
          </div>
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
                  value={newCharacter.level}
                  onChange={changeCharacterState}
                  className="input mt-1 p-2 border rounded-md w-full"
                />
              </div>
            </fieldset>
          </div>
          {/* Race Selection */}
          <fieldset className="field">
            <label className="label">Race: </label>
            <div className="control">
              <div className="select">
                <select
                  name="race_id"
                  value={newCharacter.race_id}
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
                  value={newCharacter.sex}
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
                  value={newCharacter.alignment_id}
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
          {/* Background Selection */}
          <fieldset className="field">
            <label className="label">Background: </label>
            <div className="control">
              <div className="select">
                <select
                  name="background_id"
                  value={newCharacter.background_id}
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
                  value={newCharacter.bond_id}
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
                      {bond.label}
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
                  value={newCharacter.bio}
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
                  value={newCharacter.character_appearance}
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
                  value={newCharacter.notes}
                  onChange={changeCharacterState}
                  className="input mt-1 p-2 border rounded-md w-full"
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
