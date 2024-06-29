import React from "react";
import { ImEyeBlocked } from "react-icons/im";
import { MdSearchOff } from "react-icons/md";

const Error = () => {
  return (
    <div className="min-h-[90vh] flex flex-col justify-center items-center px-6 sm:px-10">
      <MdSearchOff className="ml-2 sm:ml-4 text-5xl sm:text-7xl md:text-9xl text-red-600" />
      <h1 className="text-3xl md:text-5xl border-b-2 mb-4 text-red-600 flex items-center border-red-500">
        404 ! That's an error{" "}
      </h1>
      <h3 className="text-2xl sm:text-3xl flex items-center text-center">
        The page you are looking for does not exists.
      </h3>
    </div>
  );
};

export default Error;
