import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const BackButton = ({ destination = "/" }) => {
  return (
    <div>
      <Link
        to={destination}
        className="bg-[#0C1844] text-white px-4 py-1 rounded-3xl flex items-center justify-center mt-4 w-24 shadow-blue-950 shadow-[0px_0px_6px] transition-all hover:shadow-blue-950 hover:shadow-[0px_0px_12px]"
      >
        <BsArrowLeft className="text-2xl" />
      </Link>
    </div>
  );
};

export default BackButton;
