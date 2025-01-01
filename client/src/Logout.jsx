import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const logout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    
    // Redirect the user to the login page immediately after logout
    navigate('/');
  };

  return (
    <div>
      {/* Button to trigger logout */}
      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded justify-center flex">
        Logout
      </button>
    </div>
  );
};

export default Logout;
