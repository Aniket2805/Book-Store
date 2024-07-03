import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useAuth } from "../store/auth";
import { GiSecretBook } from "react-icons/gi";
import Spinner from "../components/Spinner";
const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, loading } = useAuth();
  const [menu, setMenu] = useState(false);
  const handleMenue = () => {
    setMenu(!menu);
  };
  return (
    <>
      {loading ? (
        <div className="bg-slate-200">
          <Spinner />
        </div>
      ) : (
        <div className="text-white shadow-lg drop-shadow-lg bg-[#0C1844] h-[10vh] flex items-center z-[999] fixed w-screen justify-between px-10 md:px-28">
          <Link to="/">
            <h1 className="text-center text-xl md:text-3xl font-bold font-mono">
              Books Store
            </h1>
          </Link>
          <div>
            {isLoggedIn ? (
              <div className="flex items-center">
                <h1 className="text-lg md:text-xl font-semibold">
                  {"Hi, " + user?.name}
                </h1>
                <FaAngleDown
                  className={`text-xl md:text-2xl ml-2 transition-all duration-300 cursor-pointer ${
                    menu ? "rotate-180" : "rotate-0"
                  }`}
                  onClick={handleMenue}
                />
                <div
                  className={`absolute top-20 right-24 bg-[#0C1844] transition-all rounded-lg duration-300 ease-linear text-white px-8 py-4 ${
                    menu
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-6"
                  }`}
                >
                  {user.isAdmin ? (
                    <Link
                      to="/auth/admin/allusers"
                      onClick={() => setMenu(!menu)}
                    >
                      <h1 className="text-lg md:text-xl font-semibold flex items-center mb-3">
                        <FaUsers className="mr-2" />
                        Users List
                      </h1>
                    </Link>
                  ) : (
                    <Link to="/books/booklist" onClick={() => setMenu(!menu)}>
                      <h1 className="text-lg md:text-xl font-semibold flex items-center mb-3">
                        <GiSecretBook className="mr-2" />
                        My Books
                      </h1>
                    </Link>
                  )}
                  <Link to="/logout" onClick={() => setMenu(!menu)}>
                    <h1 className="text-lg md:text-xl font-semibold flex items-center">
                      <RiLogoutCircleLine className="mr-2" />
                      Sign Out
                    </h1>
                  </Link>
                </div>
              </div>
            ) : (
              <button
                className="px-4 py-1 text-lg md:text-xl bg-white text-black font-semibold rounded-lg shadow-md hover:shadow-slate-400 hover:bg-[#0C1844] hover:text-white transform duration-200 flex items-center"
                onClick={() => {
                  navigate("/signin");
                }}
              >
                <IoMdLogIn className="mr-1" />
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
