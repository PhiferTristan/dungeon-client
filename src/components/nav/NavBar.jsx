import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";

// export const NavBar = ({ token, setToken, staff }) => {
//   const navigate = useNavigate();
//   const [click, setClick] = useState(false);
//   const handleClick = () => {
//     setClick(!click);
//   };
//   const content = (
//     <>
//       <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-slate-900 transition">
//         <ul className="text-center text-xl p-20">
//           <Link spy="true" smooth="true" to="parties">
//             <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
//               Parties
//             </li>
//           </Link>
//           <Link spy="true" smooth="true" to="myparties">
//             <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
//               My Parties
//             </li>
//           </Link>
//           <Link spy="true" smooth="true" to="characters">
//             <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
//               Characters
//             </li>
//           </Link>
//           <Link spy="true" smooth="true" to="profile">
//             <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
//               Profile
//             </li>
//           </Link>
//         </ul>
//       </div>
//     </>
//   );

//   return (
//     <nav className="bg-slate-900">
//       <div className="container mx-auto h-10vh flex items-center justify-between z-50 text-white lg:py-5 px-20 py-4 flex-1">
//         <div className="flex items-center flex-1">
//           <Link className="text-xl font-bold hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
//             Dungeon Docs
//           </Link>
//         </div>
//         <div className="lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden">
//           <div className="flex-10">
//             <ul className="flex space-x-8 text-[18px] whitespace-nowrap">
//               {token && (
//                 <>
//                   <Link spy="true" smooth="true" to="parties">
//                     <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
//                       Parties
//                     </li>
//                   </Link>
//                   <Link spy="true" smooth="true" to="myparties">
//                     <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
//                       My Parties
//                     </li>
//                   </Link>
//                   <Link spy="true" smooth="true" to="characters">
//                     <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
//                       Characters
//                     </li>
//                   </Link>
//                   <Link spy="true" smooth="true" to="profile">
//                     <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
//                       Profile
//                     </li>
//                   </Link>
//                 </>
//               )}

//               <div className="navbar-end">
//                 <div className="navbar-item">
//                   <div className="buttons">
//                     {/* Only show Register and Login links when the user is not logged in */}
//                     {!token && (
//                       <>
//                         <Link
//                           to="/register"
//                           className="button is-link mr-6 hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer"
//                         >
//                           Register
//                         </Link>
//                         <Link
//                           to="/login"
//                           className="button is-outlined hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer"
//                         >
//                           Login
//                         </Link>
//                       </>
//                     )}
//                     {/* Show Logout button when the user is logged in */}
//                     {token && (
//                       <button
//                         className="button is-outlined hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer"
//                         onClick={() => {
//                           setToken("");
//                           navigate("/login");
//                         }}
//                       >
//                         Logout
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </ul>
//           </div>
//         </div>
//         <div>{click && content}</div>

//         <button className="block sm:hidden transition" onClick={handleClick}>
//           {click ? <FaTimes /> : <CiMenuFries />}
//         </button>
//       </div>
//     </nav>
//   );
// };

export const NavBar = ({ token, setToken, staff, userType }) => {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };

  const renderAuthLinks = () => {
    if (token) {
      // User is logged in
      if (userType === 'DM') {
        // Dungeon Master links
        return (
          <>
            <Link to="parties">Parties</Link>
            <Link to="myparties">My Parties</Link>
            <Link to="characters">Characters</Link>
            <Link to="profile">Profile</Link>
          </>
        );
      } else if (userType === 'Player') {
        // Player links
        return (
          <>
            <Link to="parties">Parties</Link>
            <Link to="myparties">My Parties</Link>
            <Link to="characters">Characters</Link>
            <Link to="mycharacters">My Characters</Link>
            <Link to="profile">Profile</Link>
          </>
        );
      }
    } else {
      // User is not logged in
      return (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      );
    }
  };

  return (
    <nav className="bg-slate-900">
      <div className="container mx-auto h-10vh flex items-center justify-between z-50 text-white lg:py-5 px-20 py-4 flex-1">
        <div className="flex items-center flex-1">
          <Link className="text-xl font-bold hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">Dungeon Docs</Link>
        </div>
        <div className="lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden">
          <div className="flex-10">
            <ul className="flex space-x-8 text-[18px] whitespace-nowrap">
              {renderAuthLinks()}
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    {token && (
                      <button
                        className="button is-outlined"
                        onClick={() => {
                          setToken("");
                          navigate("/login");
                        }}
                      >
                        Logout
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
        <div>{click && <div>Replace with your mobile navigation content</div>}</div>
        <button className="block sm:hidden" onClick={handleClick}>
          {click ? <FaTimes /> : <CiMenuFries />}
        </button>
      </div>
    </nav>
  );
};