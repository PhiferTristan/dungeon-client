import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import PropTypes from "prop-types";

export const NavBar = ({
  token,
  setToken,
  //  staff,
  currentUserType,
}) => {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken("");
    navigate("/login");
  };

  const renderAuthLinks = () => {
    if (token) {
      // User is logged in
      if (currentUserType === "DM") {
        // Dungeon Master links
        return (
          <ul className="flex gap-8 mr-16 text-[18px] flex-wrap nowrap">
            <Link
              spy="true"
              smooth="true"
              to="players"
              className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer"
            >
              Players
            </Link>
            <Link
              spy="true"
              smooth="true"
              to="parties"
              className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer"
            >
              Parties
            </Link>
            <Link
              spy="true"
              smooth="true"
              to="myparties"
              className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer"
            >
              My Parties
            </Link>
            <Link
              spy="true"
              smooth="true"
              to="characters"
              className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer"
            >
              Characters
            </Link>
            <Link
              spy="true"
              smooth="true"
              to="profile"
              className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer"
            >
              Profile
            </Link>
            <button
              className="button is-outlined hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </ul>
        );
      } else if (currentUserType === "Player") {
        // Player links
        return (
          <ul className="flex gap-8 mr-16 text-[18px] flex-wrap nowrap">
            <Link
              spy="true"
              smooth="true"
              to="dungeonmasters"
              className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer"
            >
              Dungeon Masters
            </Link>
            <Link
              spy="true"
              smooth="true"
              to="parties"
              className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer"
            >
              Parties
            </Link>
            <Link
              spy="true"
              smooth="true"
              to="myparties"
              className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer"
            >
              My Parties
            </Link>
            <Link
              spy="true"
              smooth="true"
              to="characters"
              className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer"
            >
              Characters
            </Link>
            <Link
              spy="true"
              smooth="true"
              to="mycharacters"
              className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer"
            >
              My Characters
            </Link>
            <Link
              spy="true"
              smooth="true"
              to="profile"
              className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer"
            >
              Profile
            </Link>
            <button
              className="button is-outlined hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </ul>
        );
      }
    } else {
      // User is not logged in
      return (
        <ul className="flex gap-8 mr-16 text-[18px] flex-wrap nowrap">
          <Link
            spy="true"
            smooth="true"
            to="/register"
            className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer"
          >
            Register
          </Link>
          <Link
            spy="true"
            smooth="true"
            to="/login"
            className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer"
          >
            Login
          </Link>
        </ul>
      );
    }
  };

  NavBar.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func.isRequired,
    staff: PropTypes.bool,
    currentUserType: PropTypes.string,
  };

  const renderMobileLinks = () => {
    if (token) {
      // User is logged in
      if (currentUserType === "DM") {
        // Dungeon Master links
        return (
          <>
            <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-slate-900 transition">
              <ul className="text-center text-xl p-20">
                <Link spy="true" smooth="true" to="players">
                  <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
                    Players
                  </li>
                </Link>
                <Link spy="true" smooth="true" to="parties">
                  <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
                    Parties
                  </li>
                </Link>
                <Link spy="true" smooth="true" to="myparties">
                  <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
                    My Parties
                  </li>
                </Link>
                <Link spy="true" smooth="true" to="characters">
                  <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
                    Characters
                  </li>
                </Link>
                <Link spy="true" smooth="true" to="profile">
                  <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
                    Profile
                  </li>
                </Link>
                <button
                  className="button is-outlined my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </ul>
            </div>
          </>
        );
      } else if (currentUserType === "Player") {
        // Player links
        return (
          <>
            <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-slate-900 transition">
              <ul className="text-center text-xl p-20">
                <Link spy="true" smooth="true" to="dungeonmasters">
                  <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
                    Dungeon Masters
                  </li>
                </Link>
                <Link spy="true" smooth="true" to="parties">
                  <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
                    Parties
                  </li>
                </Link>
                <Link spy="true" smooth="true" to="myparties">
                  <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
                    My Parties
                  </li>
                </Link>
                <Link spy="true" smooth="true" to="characters">
                  <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
                    Characters
                  </li>
                </Link>
                <Link spy="true" smooth="true" to="mycharacters">
                  <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
                    My Characters
                  </li>
                </Link>
                <Link spy="true" smooth="true" to="profile">
                  <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
                    Profile
                  </li>
                </Link>
                <button
                  className="button is-outlined my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </ul>
            </div>
          </>
        );
      }
    } else {
      // User is not logged in
      return (
        <>
          <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-slate-900 transition">
            <ul className="text-center text-xl p-20">
              <Link spy="true" smooth="true" to="/register">
                <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
                  Register
                </li>
              </Link>
              <Link spy="true" smooth="true" to="/login">
                <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
                  Login
                </li>
              </Link>
            </ul>
          </div>
        </>
      );
    }
  };

  return (
    <nav className="bg-slate-900">
      <div className="h-10vh flex justify-between z-50 text-white lg:py-5 px-20 py-4 flex-1">
        <div className="flex items-center flex-1">
          <Link
            spy="true"
            smooth="true"
            to="/"
            className="text-3xl font-bold hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer"
          >
            Dungeon Docs
          </Link>
        </div>

        <div className="lg:flex md:flex lg: flex-1 items-center justify-end font-normal hidden">
          <div className="flex-10">{renderAuthLinks()}</div>
        </div>

        <div>{click && renderMobileLinks()}</div>

        <button className="block sm:hidden transition" onClick={handleClick}>
          {click ? <FaTimes /> : <CiMenuFries />}
        </button>
      </div>
    </nav>
  );
};
