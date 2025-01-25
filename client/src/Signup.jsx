import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("volunteer"); // Default role
  const [error, setError] = useState(""); // To handle error messages
  const navigate = useNavigate(); // Use useNavigate for redirection

  useEffect(() => {
    const box = gsap.timeline();

    // Set explicit initial state for the animation
    gsap.set(".bg-white", { width: "0%" });

    // Sequential animations
    box.to(".bg-white", { width: "100%", duration: 1.5, ease: "power2.out" });
    box.fromTo(
      ".form__title",
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1 },
      "-=0.5"
    );
    box.fromTo(
      ".form__input-group input, .role-buttons button",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, stagger: 0.3, duration: 0.4 }
    );
    box.fromTo(
      ".form__button",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.4 }
    );
    box.fromTo(
      ".forgot",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.4 }
    );
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    // Email format validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Invalid email address");
      return;
    }

    try {
      // Send POST request to signup endpoint
      const response = await axios.post("http://localhost:5000/api/signup", {
        username,
        email,
        password,
        role,
      });

      // If signup is successful, redirect to login page
      navigate("/Hero");
    } catch (error) {
      // Handle error if signup fails
      console.error(error.response);
      setError(error.response?.data?.message || "Error signing up");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#ede9f8]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[400px]">
        <h1 className="text-2xl font-semibold text-center mb-8 text-[#2d3436] form__title">
          Create an Account
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="form__input-group">
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d3436] bg-[#eeeeee]"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form__input-group">
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d3436] bg-[#eeeeee]"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form__input-group">
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d3436] bg-[#eeeeee]"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="role-buttons flex space-x-4">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md font-medium border ${
                    role === "volunteer"
                      ? "bg-[#2d3436] text-white"
                      : "bg-[#eeeeee] text-[#2d3436]"
                  }`}
                  onClick={() => setRole("volunteer")}
                >
                  Volunteer
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md font-medium border ${
                    role === "organizer"
                      ? "bg-[#2d3436] text-white"
                      : "bg-[#eeeeee] text-[#2d3436]"
                  }`}
                  onClick={() => setRole("organizer")}
                >
                  Organizer
                </button>
              </div>
            </div>
            <div className="pt-4">
              <button
                type="submit"
                className="form__button w-full py-2 bg-[#2d3436] text-white rounded-md font-bold hover:bg-[#0a0269]"
              >
                Sign Up
              </button>
            </div>
          </div>
          <div className="forgot text-[blue] text-center mt-4">
            <Link to="/login">Already have an account? Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
