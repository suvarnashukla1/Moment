import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({ username: "", email: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage

      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      try {
        // Send a GET request to the backend with Authorization header containing the JWT token
        const response = await axios.get("http://localhost:5000/api/user-profile", {
          headers: {
            Authorization: `Bearer ${token}`,  // Authorization header with Bearer token
          },
        });

        setUserDetails({
          username: response.data.username,
          email: response.data.email,
        }); // Set the fetched user details to state
      } catch (err) {
        console.error("Error fetching user details:", err.response?.data || err);
        setError(err.response?.data?.message || "Failed to fetch user details");
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">User Profile</h1>
          <p className="mb-2">
            <strong>Username:</strong> {userDetails.username}
          </p>
          <p>
            <strong>Email:</strong> {userDetails.email}
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
