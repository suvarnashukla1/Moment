import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Thank = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-300">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center border border-gray-200">
        {/* Thank You Message */}
        <h1 className="text-4xl font-bold text-red-600 mb-6">🎉 Thank You!</h1>
        <p className="text-lg text-gray-700 mb-6">
          You’ve successfully registered for the event. We’re excited to see you
          there!
        </p>

        {/* Go Back Button */}
        <Link to="/hero">
          <button className="w-full bg-black text-white font-semibold py-3 px-5 rounded-md mb-4 hover:bg-gray-800 shadow-lg transform hover:scale-105 transition duration-300">
            Go Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Thank;
