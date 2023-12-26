import { useState } from "react";
import { ApplicationViews } from "./views/ApplicationViews";
import { NavBar } from "./components/nav/NavBar";

export const DungeonDocs = () => {
  const [token, setTokenState] = useState(localStorage.getItem("auth_token"));
  const staff = JSON.parse(localStorage.getItem("staff")); // should be a boolean value
  const currentUserId = JSON.parse(localStorage.getItem("id"));
  const userType = JSON.parse(localStorage.getItem("userType"));

  const setToken = (newToken) => {
    localStorage.setItem("auth_token", newToken);
    setTokenState(newToken);
  };

  return (
    <>
      <div className="h-screen bg-gradient-to-b from-gray-800">
        <NavBar token={token} setToken={setToken} staff={staff} />
        <ApplicationViews
          token={token}
          setToken={setToken}
          staff={staff}
          currentUserId={currentUserId}
          userType={userType}
        />
      </div>
    </>
  );
};
