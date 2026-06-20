import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative w-16 h-16">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-500 border-r-primary-400 animate-spin"></div>
        {/* Middle rotating ring */}
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-secondary-500 border-l-secondary-400 animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.8s" }}></div>
        {/* Inner circle */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 opacity-20"></div>
      </div>
    </div>
  );
};

export default Spinner;
