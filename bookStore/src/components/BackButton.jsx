import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const BackButton = ({ destination = "/" }) => {
  return (
    <div>
      <Link
        to={destination}
        className="bg-sky-800 text-white px-4 py-1 rounded-lg flex items-center justify-center mt-4 w-24"
      >
        <BsArrowLeft className="text-2xl" />
      </Link>
    </div>
  );
};

export default BackButton;
