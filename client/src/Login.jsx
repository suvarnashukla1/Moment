import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import { useAuth0 } from "@auth0/auth0-react"; // Import Auth0

const Login = () => {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate(); 

  // Destructure Auth0 hooks
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  useEffect(() => {
    const box = gsap.timeline();

    gsap.set(".bg-white", { width: "0%" });

    box.to(".bg-white", { width: "100%", duration: 1.5, ease: "power2.out" });
    box.fromTo(".form__title", { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 1 }, "-=0.5");
    box.fromTo(".form__input-group input", { opacity: 0, y: -20 }, { opacity: 1, y: 0, stagger: 0.3, duration: 0.8 });
    box.fromTo(".form__button", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 });
    box.fromTo(".forgot", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/hero");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username, 
        password,
      });

      localStorage.setItem("token", response.data.token);  
      navigate("/Hero"); 
    } catch (error) {
      setError(error.response?.data?.message || "Error logging in");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#ede9f8]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[400px]">
        <h1 className="text-2xl font-semibold text-center mb-8 text-[#2d3436] form__title">
          Welcome Back
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
                type="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d3436] bg-[#eeeeee]"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="pt-4">
              <button
                type="submit"
                className="form__button w-full py-2 bg-[#2d3436] text-white rounded-md font-bold hover:bg-[#0a0269]"
              >
                Sign In
              </button>
            </div>
          </div>
          <div className="forgot text-[blue] text-center mt-4">
            <Link to="/signup">Sign up</Link>
          </div>
          <div className="pt-4">
            <button
              type="button"
              onClick={loginWithRedirect}
              className="form__button w-full py-2 bg-[#2d3436] text-white rounded-md font-bold hover:bg-[#0a0269]"
            >
              Sign In with Auth0
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
