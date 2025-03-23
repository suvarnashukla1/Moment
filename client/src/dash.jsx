import React, { useState } from 'react';

const Dash = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="font-sans bg-pink-300 min-h-screen">
      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }

          .animate-marquee {
            animation: marquee 15s linear infinite;
          }
        `}
      </style>

      {/* Running Text Strip with Tailwind CSS Animation */}
      <div className="bg-white text-black w-full py-2 text-center overflow-hidden top-0 left-0 z-50">
        <div className="inline-block whitespace-nowrap animate-marquee">
          <span className="text-black ">Welcome to Eventify - Your Event Management Platform. Join Now!✿</span>
          <span className="text-white">Welcome to Eventify - Your Event Management Platform. Join Now!</span>
        </div>
      </div>

    
    </div>
  );
};

export default Dash;
