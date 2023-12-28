import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getAllDungeonMasters } from "../../managers/DungeonMasterManager";

export const DungeonMastersList = ({ token }) => {
  const [allDungeonMasters, setAllDungeonMasters] = useState([]);
//   const navigate = useNavigate();

  console.log(localStorage);
  console.log(token);

  useEffect(() => {
    getAllDungeonMasters(token).then((dungeonMastersArray) => {
      setAllDungeonMasters(dungeonMastersArray);
    });
  }, [token]);

  DungeonMastersList.propTypes = {
    token: PropTypes.string,
  };

  return (
    <>
      <div>
        <h1 className="text-3xl text-white text-center mb-4">All Dungeon Masters</h1>
        <ul className="w-full">
          {allDungeonMasters.map((dungeonMaster) => (
            <li
              key={dungeonMaster.id}
              className="mb-4 p-4 bg-white shadow-md flex"
            >
              <div className="flex-1 pr-4 border">
                <h2 className="text-center">Username:</h2>
                <Link to={`/profiles/details/${dungeonMaster.user.id}`}>
                <h3 className="font text-center">{dungeonMaster.user.username}</h3>
                </Link>
              </div>

              <div className="flex-1 pr-4 border">
              <h2 className="text-center">Recent Party:{" "}</h2>
                <h3 className="font text-center">
                  placholder: Recent Party
                </h3>
              </div>

              <div className="flex-1 pr-4 border">
              <h2 className="text-center">Number of Parties:</h2>
                <h3 className="font-bold text-center">
                  placeholder: # of parties
                </h3>
              </div>

              <div className="flex-1 border">
              <h2 className="text-center">Looking for Players Status:</h2>
                <h3 className="font-bold text-center">
                  {dungeonMaster.lfp_status ? "Active" : "Not Active"}
                </h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};