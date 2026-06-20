import React from "react";
import { MdSearchOff } from "react-icons/md";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col justify-center items-center px-6 sm:px-10">
      {/* Error Icon */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-400 to-primary-400 blur-3xl opacity-20"></div>
        <MdSearchOff className="text-9xl md:text-[150px] text-secondary-500 relative" />
      </div>

      {/* Error Code */}
      <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-4">404</h1>

      {/* Error Title */}
      <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-4">
        Page Not Found
      </h2>

      {/* Error Description */}
      <p className="text-xl text-gray-600 text-center mb-8 max-w-md">
        Oops! We couldn't find the page you were looking for. It might have been moved or deleted.
      </p>

      {/* Action Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-xl shadow-glow-lg hover:shadow-glow-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:scale-105"
      >
        <span>Back to Home</span>
      </Link>

      {/* Illustration or Decorative Element */}
      <div className="mt-16 text-center">
        <div className="inline-block">
          <div className="w-32 h-32 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full opacity-30 blur-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Error;
