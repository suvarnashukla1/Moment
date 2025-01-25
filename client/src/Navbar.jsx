import React, { useState,useEffect } from 'react';
import { PiHamburgerLight } from "react-icons/pi"; 
import { Link, useNavigate } from "react-router-dom";
import { gsap } from 'gsap';
import { PiCursorClickFill } from "react-icons/pi";

const Navbar = ({ontog}) => {

  const [isOpen, setIsOpen] = useState(false); 
  const navigate = useNavigate();
  useEffect(() => {
    gsap.fromTo(".navbar", 
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
    
  
  const toggleMenu = () => setIsOpen(!isOpen);  

  return (
    <div className="bg-red-900 overflow:hidden">
      <nav className=" navbar bg-[#050404] p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="text-2xl font-bold font-eczar text-white">
       CauseCrew
       
        </div>
        <button className="text-white flex items-center ml-auto">

        <PiCursorClickFill className="h-10 w-10 mr-[25%]" onClick={ontog}  />
        
          <PiHamburgerLight className="h-10 w-10 "  onClick={toggleMenu} />
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
          <Link to="/dash" className="block text-lg text-white hover:text-red-400 hover:line-through">Home</Link>
          <Link to="/login" className="block text-lg text-white hover:text-red-400 hover:line-through">Sign up</Link>
          <Link to="/event" className="block text-lg text-white hover:text-red-400 hover:line-through">Event-list</Link>

          </div>
      )}

      <div 
        className="flex h-screen items-center justify-center bg-cover bg-center text-white"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1503095396549-807759245b35?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGhlYXRyZXxlbnwwfHwwfHx8MA%3D%3D')" 
        }}
      >
        <div className="text-center">
          <h1 className="hero-text text-7xl font-semibold mb-6 font-eczar">
            Plan, Manage, and Join Events Effortlessly.
          </h1>
          
          <div className="space-x-4">
          <Link to="/login">   <button className="hero-button bg-white text-[#eb0e29] py-3 px-8 text-lg rounded-full border-2 border-[#eb0e29] hover:bg-[#eb0e29] hover:text-white">
              Sign In
            </button></Link>
            <button className="hero-button bg-[#eb0e29] text-white py-3 px-8 text-lg rounded-full border-2 border-[#eb0e29] hover:bg-white hover:text-[#eb0e29]">
              Explore More
            </button>
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

      {/* Footer Section */}
      

<footer class="bg-white dark:bg-red-900">
    <div class="mx-auto w-full max-w-screen-xl">
      <div class="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
        <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h2>
            <ul class="text-gray-500 dark:text-gray-400 font-medium">
                <li class="mb-4">
                    <a href="#" class=" hover:underline">About</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">Careers</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">Brand Center</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">Blog</a>
                </li>
            </ul>
        </div>
        <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Help center</h2>
            <ul class="text-gray-500 dark:text-gray-400 font-medium">
                <li class="mb-4">
                    <a href="#" class="hover:underline">Twitter</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">Facebook</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">Contact Us</a>
                </li>
            </ul>
        </div>
        <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Download</h2>
            <ul class="text-gray-500 dark:text-gray-400 font-medium">
                <li class="mb-4">
                    <a href="#" class="hover:underline">iOS</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">Android</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">Windows</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">MacOS</a>
                </li>
            </ul>
        </div>
    </div>
    <div class="px-4 py-6 bg-rred00 dark:bg-black-700 md:flex md:items-center md:justify-between">
        <span class="text-sm text-gray-500 dark:text-gray-300 sm:text-center">© 2023 Sush™. All Rights Reserved.
        </span>
        <div class="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
            <a href="#" class="text-red-900 hover:text-red-900 dark:hover:text-white">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                        <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd"/>
                    </svg>
                  <span class="sr-only">Facebook page</span>
              </a>
              <a href="#" class="text-red-900 hover:text-red-900 dark:hover:text-white">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                        <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z"/>
                    </svg>
                  <span class="sr-only">Discord community</span>
              </a>
              <a href="#" class="text-red-900 hover:text-red-900 dark:hover:text-white">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                    <path fill-rule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clip-rule="evenodd"/>
                </svg>
                  <span class="sr-only">Twitter page</span>
              </a>
              <a href="#" class="text-gray-400 hover:text-red-900 dark:hover:text-white">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
                  </svg>
                  <span class="sr-only">GitHub account</span>
              </a>
              <a href="#" class="text-gray-400 hover:text-red-900 dark:hover:text-white">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z" clip-rule="evenodd"/>
                </svg>
                  <span class="sr-only">Dribbble account</span>
              </a>
        </div>
      </div>
    </div>
</footer>


      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Navbar;
