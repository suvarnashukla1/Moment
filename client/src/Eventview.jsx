import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Eventview = () => {
  const { id } = useParams(); 
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/Eventform/${id}`);
        setEvent(response.data); 
      } catch (err) {
        console.error("Error fetching event details:", err);
        setError("Failed to load event details. Please try again.");
      }
    };

    fetchEvent();
  }, [id]);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!event) {
    return null; 
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <img
          src={event.image ? `http://localhost:5000${event.image}` : 'path_to_placeholder_image'} // Adjust with your placeholder image path
          alt={event.title}
          className="w-full h-60 object-cover rounded-md mb-4"
        />
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h2>

        <p className="text-gray-600 mb-2">
          <strong>Description:</strong> {event.description || "No description available."}
        </p>
        
        <p className="text-gray-600 mb-2">
          <strong>Price:</strong> Rs {event.price || "Free"}
        </p>

        {/* Event Location */}
        <p className="text-gray-600 mb-2">
          <strong>Location:</strong> {event.location || "N/A"}
        </p>

        {/* Event Date */}
        <p className="text-gray-600 mb-2">
          <strong>Date:</strong> 
          {event.date ? new Date(event.date).toLocaleDateString() : "N/A"}
        </p>

        {/* Event Timing */}
        <p className="text-gray-600 mb-2">
          <strong>Timing:</strong> {event.timing || "N/A"}
        </p>

        {/* Event Genre */}
        <p className="text-gray-600 mb-2">
          <strong>Genre:</strong> {event.genre || "N/A"}
        </p>

        {/* Event Child Safe */}
        <p className="text-gray-600 mb-2">
          <strong>Child Safe:</strong> {event.childSafe ? "Yes" : "No"}
        </p>

        {/* Event Public/Private */}
        <p className="text-gray-600 mb-2">
          <strong>Status:</strong> {event.isPublic ? "Public" : "Private"}
        </p>

        {/* Event Total Seats Available */}
        <p className="text-gray-600 mb-2">
          <strong>Total Seats:</strong> {event.seats || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default Eventview;
