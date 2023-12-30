import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { createCharacter } from "../../managers/CharacterManager";
import { getAllRaces } from "../../managers/RaceManager";
import { getAllAlignments } from "../../managers/AlignmentManager";
import { getAllBackgrounds } from "../../managers/BackgroundManager";

export const CharacterForm = ({ token }) => {
  const [newCharacter, setNewCharacter] = useState({});
  const [races, setRaces] = useState([]);
  const [alignments, setAlignments] = useState([]);
  const [backgrounds, setBackgrounds] = useState([]);

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
  }, [token]);

  const changeCharacterState = (e) => {
    setNewCharacter({
      ...newCharacter,
      [e.target.name]: e.target.value,
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
    };

    createCharacter(token, character).then(() => {
      navigate(`/characters/mine`);
    });
  };

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

{
  /* Level Selection */
}
{
  /* <fieldset className="field">
    <label className="label">Level: </label>
    <div className="control">
      <div className="select">
        <select
          name="level"
          value={newCharacter.level?.id}
          required
          autoFocus
          onChange={changeCharacterState}
        >
          <option value={""}>Please select a level</option> */
}
{
  /* {levels.map((level) => {
            return (
              <option key={level.id} value={level.id}>
                {level.label}
              </option>
            );
          })} */
}
{
  /* </select>
      </div>
    </div>
  </fieldset> */
}
