import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { Homepage } from "../components/homepage/Homepage";
import PropTypes from "prop-types";
import { MyProfile } from "../components/profiles/MyProfile";
import { EditProfile } from "../components/profiles/EditProfile";
import { PlayersList } from "../components/players/PlayersList";
import { Profile } from "../components/profiles/Profile";
import { CharactersList } from "../components/characters/CharactersList";
import { CharacterDetails } from "../components/characters/CharacterDetails";
import { DungeonMastersList } from "../components/dungeonmasters/DungeonMastersList";
import { MyCharactersList } from "../components/characters/MyCharactersList";
import { PartiesList } from "../components/parties/PartiesList";
import { MyPartiesList } from "../components/parties/MyPartiesList";
import { PartyDetails } from "../components/parties/PartyDetails";
import { UpdateParty } from "../components/parties/UpdateParty";
import { PartyForm } from "../components/parties/PartyForm";

export const ApplicationViews = ({
  token,
  setToken,
  // staff,
  setStaff,
  currentUserId,
  currentUserType,
}) => {
  ApplicationViews.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func.isRequired,
    staff: PropTypes.bool,
    setStaff: PropTypes.func,
    currentUserId: PropTypes.string,
    currentUserType: PropTypes.string,
  };

  return (
    <>
      <div className="h-screen bg-gradient-to-b from-gray-800">
        <Routes>
          <Route
            path="/login"
            element={<Login setToken={setToken} setStaff={setStaff} />}
          />
          <Route
            path="/register"
            element={<Register setToken={setToken} setStaff={setStaff} />}
          />
          <Route element={<Authorized token={token} />}>
            <Route
              path="/"
              element={
                <Homepage
                  setToken={setToken}
                  currentUserId={currentUserId}
                  currentUserType={currentUserType}
                />
              }
            />

            <Route path="profiles">
              <Route
                path="mine"
                element={
                  <MyProfile
                    token={token}
                    currentUserId={currentUserId}
                    currentUserType={currentUserType}
                  />
                }
              />
              <Route
                path="edit"
                element={
                  <EditProfile token={token} currentUserId={currentUserId} />
                }
              />
              <Route
                path="details/:userId"
                element={<Profile token={token} />}
              />
            </Route>

            <Route path="dungeonmasters">
              <Route path="all" element={<DungeonMastersList token={token} />} />
            </Route>

            <Route path="players">
              <Route path="all" element={<PlayersList token={token} />} />
            </Route>

            <Route path="characters">
              <Route path="all" element={<CharactersList token={token} />} />
              <Route path="details/:characterId" element={<CharacterDetails token={token} />} />
              <Route path="mine" element={<MyCharactersList token={token} />} />
            </Route>

            <Route path="parties">
                <Route path="all" element={<PartiesList token={token} />} />
                <Route path="mine" element={<MyPartiesList token={token} />} />
                <Route path="details/:partyId" element={<PartyDetails token={token} />} />
                <Route path="edit/:partyId" element={<UpdateParty token={token} />} />
                <Route path="create" element={<PartyForm token={token} />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  );
};
