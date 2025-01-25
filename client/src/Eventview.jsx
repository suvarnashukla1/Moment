import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Eventview = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/Eventform/${id}`);
        setEvent(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching event details:", err);
        setError("Failed to load event details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <p className="text-gray-600 text-lg">Loading event details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <p className="text-gray-600 text-lg">Event not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <img
          src={event.image ? `http://localhost:5000${event.image}` : 'https://via.placeholder.com/150'}
          className="w-full h-full object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h2>
        <p className="text-gray-600 mb-2"><strong>Description:</strong> {event.description || "No description available."}</p>
        <p className="text-gray-600 mb-2"><strong>Price:</strong> Rs {event.price || "Free"}</p>
        <p className="text-gray-600 mb-2"><strong>Location:</strong> {event.location || "N/A"}</p>
        <p className="text-gray-600 mb-2"><strong>Date:</strong> {event.date ? new Date(event.date).toLocaleDateString() : "N/A"}</p>
        <p className="text-gray-600 mb-2"><strong>Timing:</strong> {event.time || "N/A"}</p>
        <p className="text-gray-600 mb-2"><strong>Duration:</strong> {event.duration || "N/A"}</p>
        <p className="text-gray-600 mb-2"><strong>Expected Participants:</strong> {event.  expectedParticipants || "N/A"}</p>
        <p className="text-gray-600 mb-2"><strong>Contact Information:</strong> {event.contact || "N/A"}</p>
        <p className="text-gray-600 mb-2"><strong>Genre:</strong> {event.genre || "N/A"}</p>
        <p className="text-gray-600 mb-2"><strong>Roles:</strong></p>
        {event.roles?.map((role, index) => (
          <div key={index}>
            <p className="text-gray-600 mb-2"><strong>Role Name:</strong> {role.roleName}</p>
            <p className="text-gray-600 mb-2"><strong>Slots:</strong> {role.slots}</p>
          </div>
        ))}
        <p className="text-gray-600 mb-2"><strong>Public Event:</strong> {event.isPublic ? "Yes" : "No"}</p>
        <p className="text-gray-600 mb-2"><strong>Organized By:</strong> {event.organizers || "N/A"}</p>
        <p className="text-gray-600 mb-2"><strong>Status:</strong> {event.isPublic ? "Public" : "Private"}</p>
        <p className="text-gray-600 mb-2"><strong>Total Seats:</strong> {event.seats || "N/A"}</p>
        <Link to="/thank">
          <button className="bg-blue-500 text-white py-2 px-4 w-full rounded hover:bg-blue-700">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Eventview;
