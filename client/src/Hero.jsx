import React, { useState, useEffect } from "react";
import { PiHamburgerLight } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { FaUserAlt } from "react-icons/fa";
import axios from "axios";

const Hero = ({ ontog }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ username: "" });
  const [error, setError] = useState(null);

  const events = [
    {
      id: 1,
      title: "Cookie workshop",
      description:
        "Join us for an exciting decorative cookie workshop and pick your fun icing! Get Festive with Cookies & Creativity!",
      imageUrl:
        "https://assets-in.bmscdn.com/nmcms/events/banner/mobile/media-mobile-cookie-decoration-workshop-0-2024-12-8-t-3-51-46.jpg",
      venue: "Bandra, Mumbai",
      price: "Rs 200",
    },
    {
      id: 2,
      title: "Resin Beach Art",
      description:
        "Dive into the captivating world of resin art with our hands-on Resin Beach Art workshop! Perfect for both beginners and experienced artists.",
      imageUrl:
        "https://assets-in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-resin-beach-art-0-2024-6-4-t-5-17-45.jpg",
      venue: "Andheri, Mumbai",
      price: "Rs 500",
    },
    {
      id: 3,
      title: "Leadership From The Bhagavad Gita",
      description:
        "In today’s cutthroat competition, productivity of organizations and individuals is the most important cog in the wheel.",
      imageUrl:
        "https://assets-in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-leadership-from-the-bhagavad-gita-0-2024-11-21-t-11-4-34.jpg",
      venue: "Bada, Gwalior",
      price: "Rs 400",
    },
  ];

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      try {
        // Sending token in Authorization header
        const response = await axios.get("http://localhost:5000/api/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.user) {
          setUserDetails(response.data.user);
        } else {
          setError("User not found");
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Failed to fetch user details");
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".navbar",
      { opacity: 0, y: -80 },
      { opacity: 1, y: 0, duration: 1 }
    );
    gsap.fromTo(
      ".hero-text",
      { opacity: 0, y: -150 },
      { opacity: 1, y: 0, duration: 1.5, delay: 0.5 }
    );
    gsap.fromTo(
      ".hero-button",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.7, delay: 1 }
    );
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="bg-red-900 overflow-hidden">
      {/* Navbar */}
      <nav className="navbar bg-black p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="text-2xl font-bold font-eczar text-white">CauseCrew</div>
        <button className="text-white flex items-center ml-auto">
          <Link to="/Profile">
            <FaUserAlt className="h-6 w-6 mr-4" />
          </Link>
          <PiHamburgerLight className="h-12 w-12" onClick={toggleMenu} />
        </button>
      </nav>

      {/* Sidebar */}
      {isOpen && (
        <div className="fixed top-0 right-0 w-64 h-full bg-[#0f0e0e] opacity-95 p-4 space-y-4 z-50">
          <button
            className="text-white text-2xl absolute top-4 right-4"
            onClick={toggleMenu}
          >
            &times;
          </button>
          <Link
            to="/dash"
            className="block text-lg text-white hover:text-red-400 hover:line-through"
          >
            Home
          </Link>
          <Link
            to="/Logout"
            className="block text-lg text-white hover:text-red-400 hover:line-through"
          >
            Log out
          </Link>
          <Link
            to="/event"
            className="block text-lg text-white hover:text-red-400 hover:line-through"
          >
            Event-list
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <div
        className="flex h-screen items-center justify-center bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url('https://st.depositphotos.com/1516574/55060/v/600/depositphotos_550601530-stock-video-professional-microphone-in-red-smoke.jpg')",
        }}
      >
        <div className="text-center">
          {error ? (
            <h1 className="hero-text text-6xl font-semibold mb-20">
              Error: {error}
            </h1>
          ) : (
            <h1 className="hero-text text-6xl font-semibold mb-20">
              Welcome Back {userDetails.username}!
            </h1>
          )}

          <div className="space-x-4">
            <Link to="/Eventform">
              <button className="hero-button bg-white text-red-600 py-3 px-8 text-lg rounded-full border-2 border-red-600 hover:bg-red-600 hover:text-white">
                Create Event
              </button>
            </Link>
            <Link to="/Eventlist">
              <button className="hero-button bg-red-600 text-white py-3 px-8 text-lg rounded-full border-2 border-red-600 hover:bg-white hover:text-red-600">
                See Events
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <section className="relative min-h-screen bg-black text-gray-100 py-12">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          Upcoming Events
        </h2>
        <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-black rounded-lg border-2 border-red-600 shadow-lg w-64 p-4 transform transition-all hover:scale-105"
            >
              <img src={event.imageUrl} alt={event.title} className="rounded-lg mb-4" />
              <h3 className="text-xl font-semibold text-red-600">
                {event.title}
              </h3>
              <p className="text-gray-400">{event.description}</p>
              <p className="text-red-800 font-bold">{event.price}</p>
              <p className="text-red-400">{event.venue}</p>
              <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-full hover:bg-red-500">
                See details
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate("/events")}
          className="mt-8 bg-red-600 text-white py-3 px-8 rounded-lg hover:bg-red-500"
        >
          View More
        </button>
      </section>

      {/* About Us */}
      <section className="bg-red-900 text-white py-12">
        <h2 className="text-5xl text-center mb-8">About Us</h2>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <img
            src="https://otaokitchen.com.au/files/thumb/700/500//uploads//blog-images/01-2024/DSC06350_preview_jpeg.jpeg"
            alt="About Us"
            className="rounded-lg w-1/2"
          />
          <div className="md:ml-8">
            <h3 className="text-3xl text-red-600 font-bold mb-4">We Spread Word</h3>
            <p className="text-gray-200 mb-6">
              We are passionate about spreading the word about your event to a
              wider audience. Our goal is to ensure that your event gets the
              attention it deserves, creating buzz and anticipation from the
              moment it’s announced.
            </p>
            <button className="bg-red-600 px-6 py-3 text-white rounded-lg hover:bg-red-500">
              Know More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-6 text-center">
        <p>Suvarna 2024 &copy; All Rights Reserved</p>
        <ul className="flex justify-center space-x-4 mt-4">
          <li>
            <a href="#" className="hover:text-white">
              Contact
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white">
              Terms of Use
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Hero;
