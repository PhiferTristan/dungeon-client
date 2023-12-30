import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { createParty } from "../../managers/PartyManager";

export const PartyForm = ({ token }) => {
  const [newParty, setNewParty] = useState({
    name: "",
    description: "",
    lfp_status: "false",
  });

  const navigate = useNavigate();

  useEffect(() => {}, []);

  const changePartyState = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setNewParty({
      ...newParty,
      [e.target.name]: value,
    });
    console.log(value)
  };

  const handleSave = async (e) => {
    e.preventDefault();

    let party = {
      name: newParty.name,
      description: newParty.description,
      lfp_status: newParty.lfp_status === "true",
    };

    console.log(party)

    createParty(party, token).then((partyObj) => {
      navigate(`/parties/details/${partyObj["id"]}`);
    });
  };

  PartyForm.propTypes = {
    token: PropTypes.string,
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Create Party Form</h1>

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
                  value={newParty.name}
                  onChange={changePartyState}
                  className="input mt-1 p-2 border rounded-md w-full"
                />
              </div>
            </fieldset>
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
                  value={newParty.description}
                  onChange={changePartyState}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
            </fieldset>
          </div>

          {/* Radio buttons for lfp_status */}
          <div className="mb-2">
            <fieldset>
              <legend className="block text-sm font-medium text-gray-600">
                Looking for Players:
              </legend>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="lfp_status"
                    value="true"
                    checked={newParty.lfp_status === "true"}
                    onChange={changePartyState}
                    className="ml-2"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    name="lfp_status"
                    value="false"
                    checked={newParty.lfp_status === "false"}
                    onChange={changePartyState}
                    className="ml-2"
                  />
                  <span className="ml-2">No</span>
                </label>
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
  /* Checkbox for lfp_status
<div className="mb-2">
  <fieldset>
    <label className="block text-sm font-medium text-gray-600">
      Looking for Players:
      <input
        type="checkbox"
        name="lfp_status"
        checked={newParty.lfp_status}
        onChange={changePartyState}
        className="ml-2"
      />
    </label>
  </fieldset>
</div> */
}
