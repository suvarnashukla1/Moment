import React, { useState, useEffect } from 'react';
import { PiHamburgerLight, PiCursorClickFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from 'gsap';
import { FaUserAlt } from "react-icons/fa";
import axios from "axios";

const Hero = ({ ontog }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ username: "" });
  const [error, setError] = useState("");

  const events = [
    {
      id: 1,
      title: 'Cookie workshop',
      description: 'Join us for an exciting decorative cookie workshop and pick your fun icing! Get Festive with Cookies & Creativity!',
      imageUrl: 'https://assets-in.bmscdn.com/nmcms/events/banner/mobile/media-mobile-cookie-decoration-workshop-0-2024-12-8-t-3-51-46.jpg',
      venue: 'Bandra,Mumbai',
      price: 'Rs 200',
    },
    {
      id: 2,
      title: 'Resin Beach Art',
      description: 'Dive into the captivating world of resin art with our hands-on Resin Beach Art workshop! Perfect for both beginners and experienced artists, this event is designed to unlock your creative potential through the vibrant and versatile medium of resin.',
      imageUrl: 'https://assets-in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-resin-beach-art-0-2024-6-4-t-5-17-45.jpg',
      venue: 'Andheri,Mumbai',
      price: 'Rs 500',
    },
    {
      id: 3,
      title: 'Leadership From The Bhagavad Gita',
      description: 'In today’s cut throat competition, productivity of organizations and individual is the most important cog in the wheel.',
      imageUrl: 'https://assets-in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-leadership-from-the-bhagavad-gita-0-2024-11-21-t-11-4-34.jpg',
      venue: 'Bada,Gwalior',
      price: 'Rs 400',
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
        const response = await axios.get("http://localhost:5000/api/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserDetails(response.data.user);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch user details");
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
     gsap.fromTo(".hero-text", 
          { opacity: 0, y: -150 },  // Start from above the screen
          { opacity: 1, y: 0, duration: 1.5, delay: 0.5 }
        );
      
        gsap.fromTo(".hero-button", 
          { opacity: 0, y: 50 }, // Start from below
          { opacity: 1, y: 0, duration: 1.7, delay: 1 }
        );
      }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
   
    <div className="bg-red-900 overflow-hidden">
      <nav className="navbar bg-black p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="text-2xl font-bold font-eczar text-white">CauseCrew</div>
        <button className="text-white flex items-center ml-auto">
            <Link to='/Profile'>       <FaUserAlt  className="h-6 w-6 mr-[40px]" /></Link> 
          <PiCursorClickFill className="h-12 w-12 mr-[25%]" onClick={ontog} />
          <PiHamburgerLight className="h-12 w-12" onClick={toggleMenu} />
        </button>
      </nav>

      {isOpen && (
        <div className="fixed top-0 right-0 w-64 h-full bg-[#0f0e0e] opacity-95 p-4 space-y-4 z-50">
          <button
            className="text-white text-2xl absolute top-4 right-4"
            onClick={toggleMenu}
          >
            &times;
          </button>
          <Link to="/dash" className="block text-lg text-white hover:text-red-400 hover:line-through">
            Home
          </Link>
          <Link to="/Logout" className="block text-lg text-white hover:text-red-400 hover:line-through">
            Log out
          </Link>
          <Link to="/event" className="block text-lg text-white hover:text-red-400 hover:line-through">
            Event-list
          </Link>
          <Link to="/dash" className="block text-lg text-white hover:text-red-400 hover:line-through">Profile</Link>
        </div>
      )}
 <div 
        className="flex h-screen items-center justify-center bg-cover bg-center text-white"
        style={{
          backgroundImage: "url('https://st.depositphotos.com/1516574/55060/v/600/depositphotos_550601530-stock-video-professional-microphone-in-red-smoke.jpg')" 
        }}
      >
<div className='text-center'>
<h1 className='hero-text text-6xl font-semibold mb-20 text-[white] '>Welcome Back {userDetails.username}!</h1>
<div className="space-x-4"> <Link to="/Eventform"><button className='hero-button bg-white   text-[#eb0e29] py-3 px-8 text-lg rounded-full border-2 border-[#eb0e29] hover:bg-[#eb0e29] hover:text-white'>Create Event</button></Link>
<Link to="/Eventlist"><button className="hero-button bg-[#cc1026] text-white py-3 px-8 text-lg rounded-full border-2 border-[#c9c0c1] hover:bg-white hover:text-[#eb0e29]">
             See Events
            </button> </Link>
</div>
</div>
      </div>

      <section className="relative min-h-screen bg-black flex flex-col justify-center items-center text-gray-100 py-12">
  <h2 className="text-3xl font-bold text-center text-[#eb0e29] mb-6">
    Upcoming Events
  </h2>
  <div
    className="grid gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center"
  >
    {events.map((event, index) => (
      <div
        key={index}
        className="bg-black rounded-lg border-2 border-[#eb0e29] shadow-lg w-64 p-4 transform transition-all hover:scale-105"
       
      >
        <div className="hover:scale-105 hover:-translate-y-2 transform transition duration-300">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="rounded-lg mb-4"
          />
        </div>
        <h3 className="text-xl font-semibold text-[#eb0e29]">
          {event.title}
        </h3>
        <p className="text-gray-400">{event.description}</p>
        <p className="text-red-800 font-bold">{event.price}</p>
        <p className="text-red-400">{event.venue}</p>
        <button className="mt-4 w-full bg-[#eb0e29] text-white py-2 rounded-full hover:bg-[#d75363]">
          See details
        </button>
      </div>
    ))}
  </div>

  {/* View More Button */}
  <button 
          onClick={() => navigate('/events')} 
          className="relative group px-6 py-6 font-semibold text-black bg-red-600 border-2 border-transparent rounded-lg mx-auto my-12 overflow-hidden flex items-center justify-center"
        >
          View More
          <span class="absolute top-0 left-0 w-1/2 h-full text-black bg-white transform -translate-x-full group-hover:translate-x-0 transition-all duration-500">View</span>
          <span class="absolute top-0 right-0 w-1/2 h-full text-black bg-white transform translate-x-full group-hover:translate-x-0 transition-all duration-500">  More</span>
        </button>
</section>

      <h2 className="text-5xl text-white justify-center flex mt-[30px]">About Us</h2>
      <div className="bg-red-900 text-white h-screen flex items-center justify-center ">
  <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto p-8 space-y-8 md:space-y-0 relative mr-[300px] ">
   
    <div className="relative flex flex-col items-center justify-center md:w-1/2 ml-[160px] z-10">
      <div>
        <img src="https://otaokitchen.com.au/files/thumb/700/500//uploads//blog-images/01-2024/DSC06350_preview_jpeg.jpeg"  className="rounded-3xl w-[500px] h-[300px]"></img>
      </div>
    </div>

    <div className="relative flex flex-col bg-white p-8 rounded-lg shadow-lg md:w-1/2 -ml-10">
      <h3 className="text-black text-5xl font-bold mb-4 text-center ml-[40px]">
        We spread <span className="text-red-600">Word</span>
      </h3>
      <p className="text-m text-center mb-6 text-black ml-[40px] flex justify-start md:justify-end">
        We are passionate about spreading the word about your event to a wider
        audience. Our team of experts knows exactly how to deliver your message
        to the right people at the right time, utilizing the latest trends and
        technologies. Our goal is to ensure that your event gets the attention
        it deserves, creating buzz and anticipation from the moment it’s
        announced.
      </p>
      <button className="bg-red-500 px-0.5 text-white border-2 border-red-500  py-2 rounded-2xl hover:bg-white hover:text-red-500 transition duration-300">
        Know More
      </button>
    </div>
  </div>
</div>

    <footer class=" my-[2%] mx-auto flex flex-wrap items-center justify-between">
        <div class="w-full md:w-1/2 md:text-center md:mb-0 mb-8">
            <p class="text-xs text-gray-400 md:text-sm">Suvarna 2024 &copy; All Rights Reserved</p>
        </div>
        <div class="w-full md:w-1/2 md:text-center md:mb-0 mb-8">
            <ul class="list-reset flex justify-center flex-wrap text-xs md:text-sm gap-3">
                <li><a href="#" class="text-gray-400 hover:text-white">Contact</a></li>
                <li class="mx-4"><a href="#" class="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white">Terms of Use</a></li>
            </ul>
        </div>
    
</footer>
    </div>
    
  );
};

export default Hero;
