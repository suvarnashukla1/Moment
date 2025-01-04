import React, { useState } from "react";
import axios from "axios";

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    price: "",
    isPublic: true,
    seats: "",
    specialRequirements: "",
    timing: "",
    genre: "",
    childSafe: false,
    image: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      const file = files[0];
      if (file && !file.type.startsWith("image/")) {
        alert("Only image files are allowed!");
        return;
      }
      setFormData({ ...formData, image: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        formDataToSend.append(key, value);
      }
    });

    try {
      setIsSubmitting(true);

      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to log in to create an event.");
        setIsSubmitting(false);
        return;
      }

      const response = await axios.post("http://localhost:5000/api/Eventform", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Event Created:", response.data);
      alert("Event created successfully!");

      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        price: "",
        isPublic: true,
        seats: "",
        specialRequirements: "",
        timing: "",
        genre: "",
        childSafe: false,
        image: null,
      });
    } catch (error) {
      console.error("Error creating event:", error.response?.data || error.message);
      alert("Failed to create event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-4/5 max-w-4xl mx-auto bg-white text-black p-6 rounded-lg shadow space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Create Event</h2>

      {/* Event Title */}
      <div>
        <label className="block mb-2">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Enter event title"
        />
      </div>

      {/* Event Description */}
      <div>
        <label className="block mb-2">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Enter event description"
        ></textarea>
      </div>

      {/* Event Image */}
      <div>
        <label className="block mb-2">Image Upload:</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Event Price */}
      <div>
        <label className="block mb-2">Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Enter event price"
        />
      </div>

      {/* Event Seats */}
      <div>
        <label className="block mb-2">Number of Tickets:</label>
        <input
          type="number"
          name="seats"
          value={formData.seats}
          onChange={handleChange}
          required
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Enter the number of tickets"
        />
      </div>

      {/* Event Date */}
      <div>
        <label className="block mb-2">Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Event Timing */}
      <div>
        <label className="block mb-2">Timing:</label>
        <input
          type="time"
          name="timing"
          value={formData.timing}
          onChange={handleChange}
          required
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Event Genre */}
      <div>
        <label className="block mb-2">Genre:</label>
        <select
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Select Genre</option>
          <option value="Comedy">Comedy</option>
          <option value="Art">Art</option>
          <option value="Music">Music</option>
          <option value="Kids">Kids</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Tech">Tech</option>
          <option value="Meetups">Meetups</option>
          <option value="Cooking & Festival">Cooking & Festival</option>
          <option value="Others">Others</option>
        </select>
      </div>

      {/* Public Event Toggle */}
      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isPublic"
            checked={formData.isPublic}
            onChange={handleChange}
          />
          <span>Public Event</span>
        </label>
      </div>

      {/* Child Safe Toggle */}
      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="childSafe"
            checked={formData.childSafe}
            onChange={handleChange}
          />
          <span>Child Safe</span>
        </label>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
        >
          {isSubmitting ? "Creating..." : "Create Event"}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
