import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../managers/AuthManager";
import PropTypes from "prop-types";

export const Register = ({ setToken }) => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const username = useRef();
  const bio = useRef();
  const profileImageUrl = useRef();
  const discordUsername = useRef();
  const password = useRef();
  const verifyPassword = useRef();
  const navigate = useNavigate();

  const [userType, setUserType] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleCheckboxChange = (type) => {
    setUserType(type);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        bio: bio.current.value,
        profile_image_url: profileImageUrl.current.value,
        discord_username: discordUsername.current.value,
        user_type: userType,
      };

      registerUser(newUser).then((res) => {
        if ("valid" in res && res.valid) {
          setToken(res.token);
          localStorage.setItem("staff", res.staff);
          localStorage.setItem("userType", res.user_type);
          localStorage.setItem("id", res.id);

          // Check and set playerId if user's user_type is "Player"
          if (res.user_type === "Player" && "player_user" in res) {
            localStorage.setItem("playerId", res.player_user.id);
          }

          // Check and set dungeonMasterId if user's user_type is "DM"
          if (res.user_type === "DM" && "dungeon_master_user" in res) {
            localStorage.setItem("dungeonMasterId", res.dungeon_master_user.id);
          }
          setRegistrationSuccess(true);
        }
      });
    } else {
      console.error("Passwords do not match");
    }
  };

  useEffect(() => {
    if (registrationSuccess) {
      navigate("/");
    }
  }, [registrationSuccess, navigate]);

  Register.propTypes = {
    setToken: PropTypes.func.isRequired,
  };

  return (
    <section className="flex items-center justify-center min-h-screen pt-3">
      <form className="w-full max-w-md bg-white p-8 shadow-md rounded-md" onSubmit={handleRegister}>
        <h1 className="text-3xl font-bold mb-4 text-center">
          Registration Form
        </h1>
        <p className="text-lg mb-4 text-center">Create an account</p>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            First Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            ref={firstName}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Last Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            ref={lastName}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            ref={username}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            ref={email}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Profile Pic URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            ref={profileImageUrl}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Discord Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            ref={discordUsername}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <div className="flex items-center">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Password"
              ref={password}
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
              type="password"
              placeholder="Verify Password"
              ref={verifyPassword}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Do you plan to use this app as a Dungeon Master or Player?
          </label>
          <div className="flex flex-col items-center">
            <div className="mb-2">
              <label>
                <input
                  type="checkbox"
                  checked={userType === "DM"}
                  onChange={() => handleCheckboxChange("DM")}
                  className="mr-2"
                />
                <span className="text-gray-700 text-sm">Dungeon Master</span>
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={userType === "Player"}
                  onChange={() => handleCheckboxChange("Player")}
                  className="mr-2"
                />
                <span className="text-gray-700 text-sm">Player</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Bio
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Tell us about yourself..."
            ref={bio}
          ></textarea>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
          <Link
            to="/login"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};
