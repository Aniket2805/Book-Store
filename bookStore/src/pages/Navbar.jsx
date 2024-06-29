import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useAuth } from "../store/auth";
const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  return (
    <div className="text-white shadow-lg drop-shadow-lg bg-slate-700 h-[10vh] flex items-center justify-between px-10 md:px-28">
      <Link to="/">
        <h1 className="text-center text-xl md:text-3xl font-bold font-mono">
          Books Store
        </h1>
      </Link>
      <div>
        {isLoggedIn ? (
          <button
            className="px-4 py-1 text-lg md:text-xl bg-white text-black font-semibold rounded-lg shadow-md hover:shadow-slate-400 hover:bg-gray-700 hover:text-white transform duration-200 flex items-center"
            onClick={() => {
              navigate("/logout");
            }}
          >
            <RiLogoutCircleLine className="mr-1" />
            Sign Out
          </button>
        ) : (
          <button
            className="px-4 py-1 text-lg md:text-xl bg-white text-black font-semibold rounded-lg shadow-md hover:shadow-slate-400 hover:bg-gray-700 hover:text-white transform duration-200 flex items-center"
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
  );
};

export default Navbar;
