import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [genreFilter, setGenreFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/Eventform");
        setEvents(response.data);
        setFilteredEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        alert(`Error fetching events: ${error.message || "Unknown error"}`);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = [...events];

    if (genreFilter) {
      filtered = filtered.filter((event) => event.genre === genreFilter);
    }

    if (monthFilter) {
      filtered = filtered.filter(
        (event) => new Date(event.date).getMonth() + 1 === parseInt(monthFilter)
      );
    }


    setFilteredEvents(filtered);
  }, [genreFilter, monthFilter, events]);

  return (
    <div className="bg-red-200 min-h-screen p-6">
      <div className="flex flex-wrap justify-between items-center bg-white p-4 mb-6 rounded-lg shadow-lg">
        {/* Genre Filter Dropdown */}
        <div className="flex items-center mb-2 md:mb-0">
          <label className="mr-3 font-semibold text-gray-700">Filter by Genre:</label>
          <select
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            className="p-2 border rounded-lg bg-gray-100 hover:bg-gray-200 focus:outline-none"
          >
              <option value="">Select Event Type</option>
          <option value="Food Distribution">Food Distribution</option>
          <option value="Cloth Donation">Cloth Donation</option>
          <option value="Mental Health Talk">Mental Health Talk</option>
          <option value="Yoga Session">Yoga Session</option>
          <option value="Community Clean-Up">Community Clean-Up</option>
          <option value="Tree Planting">Tree Planting</option>
          <option value="Health Check-Up Camp">Health Check-Up Camp</option>
          <option value="Others">Others</option>
          </select>
        </div>
        
        <div className="flex items-center mb-2 md:mb-0">
          <label className="mr-3 font-semibold text-gray-700">Filter by Month:</label>
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="p-2 border rounded-lg bg-gray-100 hover:bg-gray-200 focus:outline-none"
          >
            <option value="">All</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Displaying Filtered Events */}
      <div className="flex flex-wrap justify-between">
        {filteredEvents.length === 0 ? (
          <p className="text-center text-lg font-bold text-gray-700 w-full">
            No events found.
          </p>
        ) : (
          filteredEvents.map((event) => (
            <div
              key={event._id}
              className="w-[30%] m-2 p-4 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out"
            >
              <Link to={`/Eventview/${event._id}`}>
                <h3 className="text-lg font-bold mb-2 text-gray-800">{event.title}</h3>
                <img
  src={`http://localhost:5000${event.image}`}
  alt={event.title}
/>
                <p className="text-sm text-gray-600">
                  <strong>Genre:</strong> {event.genre || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Location:</strong> {event.location || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Date:</strong> {event.date ? new Date(event.date).toLocaleDateString() : "N/A"}
                </p>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventList;
