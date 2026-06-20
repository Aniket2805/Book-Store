import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const BackButton = ({ destination = "/" }) => {
  return (
    <div className="mt-8 mb-4">
      <Link
        to={destination}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg shadow-glow-md hover:shadow-glow-lg transform hover:scale-105 transition-all duration-300"
      >
        <BsArrowLeft className="text-xl" />
        <span>Go Back</span>
      </Link>
    </div>
  );
};

export default BackButton;
