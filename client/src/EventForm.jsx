import React, { useState } from "react";
import axios from "axios";

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: "",
    location: "",
    contact: "",
    expectedParticipants: "",
    image: null,
    isPublic: true,
    genre: "",
    roles: [{ roleName: "", slots: "" }],
    organisers: "", // Added organisers field
  });

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

  const handleRoleChange = (index, field, value) => {
    const updatedRoles = [...formData.roles];
    updatedRoles[index][field] = value;
    setFormData({ ...formData, roles: updatedRoles });
  };

  const addRoleField = () => {
    setFormData({ ...formData, roles: [...formData.roles, { roleName: "", slots: "" }] });
  };

  const removeRoleField = (index) => {
    const updatedRoles = formData.roles.filter((_, i) => i !== index);
    setFormData({ ...formData, roles: updatedRoles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "roles") {
        formDataToSend.append(key, JSON.stringify(value)); // Convert roles to JSON
      } else if (value !== null && value !== "") {
        formDataToSend.append(key, value);
      }
    });

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to log in to create an event.");
        return;
      }

      const response = await axios.post("http://localhost:5000/api/Eventform", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Event Created:", response.data);
      alert("Charity event created successfully!");

      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        duration: "",
        location: "",
        contact: "",
        expectedParticipants: "",
        organisers: "", // Reset the organisers field
        image: null,
        isPublic: true,
        genre: "",
        roles: [{ roleName: "", slots: "" }],
      });
    } catch (error) {
      console.error("Error creating event:", error.response?.data || error.message);
      alert("Failed to create event. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-4/5 max-w-4xl mx-auto bg-white text-black p-6 rounded-lg shadow space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Create Charity Event</h2>

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

      {/* Event Time */}
      <div>
        <label className="block mb-2">Time:</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Event Duration */}
      <div>
        <label className="block mb-2">Duration (in hours):</label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Enter event duration"
        />
      </div>

      {/* Expected Participants */}
      <div>
        <label className="block mb-2">Expected Participants:</label>
        <input
          type="number"
          name="expectedParticipants"
          value={formData.expectedParticipants}
          onChange={handleChange}
          required
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Enter the number of participants"
        />
      </div>

      {/* Contact Information */}
      <div>
        <label className="block mb-2">Contact Information:</label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          required
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Enter contact details (e.g., phone or email)"
        />
      </div>

      {/* Event Location */}
      <div>
        <label className="block mb-2">Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Enter event location"
        />
      </div>

      {/* Event Genre */}
      <div>
        <label className="block mb-2">Type of Charity Event:</label>
        <select
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
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

      {/* Organizers */}
      <div>
        <label className="block mb-2">Organizers:</label>
        <input
          type="text"
          name="organisers"
          value={formData.organisers}
          onChange={handleChange}
          required
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Enter organizer name(s)"
        />
      </div>

      {/* Roles and Volunteer Slots */}
      <div>
        <label className="block mb-2">Roles and Volunteer Slots:</label>
        {formData.roles.map((role, index) => (
          <div key={index} className="flex items-center space-x-4 mb-2">
            <input
              type="text"
              placeholder="Role Name (e.g., Organizer)"
              value={role.roleName}
              onChange={(e) => handleRoleChange(index, "roleName", e.target.value)}
              className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="number"
              placeholder="Slots"
              value={role.slots}
              onChange={(e) => handleRoleChange(index, "slots", e.target.value)}
              className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="button"
              onClick={() => removeRoleField(index)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addRoleField}
          className="mt-2 text-blue-500 hover:text-blue-700"
        >
          Add Role
        </button>
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

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
        >
          Create Charity Event
        </button>
      </div>
    </form>
  );
};

export default EventForm;
