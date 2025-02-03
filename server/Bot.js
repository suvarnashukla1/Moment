import React, { useState } from "react";
import axios from "axios";

const EventForm = ({ onAISuggestions }) => {
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
    organisers: "",
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

  const fetchAISuggestions = async (eventDetails) => {
    try {
      const response = await axios.post("http://localhost:5000/api/groq-suggestions", {
        prompt: `Suggest improvements for a charity event with details: ${eventDetails}`,
      });

      console.log("AI Suggestions:", response.data.suggestions);
      onAISuggestions(response.data.suggestions);
    } catch (error) {
      console.error("Error fetching AI suggestions:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "roles") {
        formDataToSend.append(key, JSON.stringify(value));
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

      // Generate AI suggestions
      const eventDetails = `
        Title: ${formData.title}
        Description: ${formData.description}
        Date: ${formData.date}
        Time: ${formData.time}
        Duration: ${formData.duration} hours
        Location: ${formData.location}
        Expected Participants: ${formData.expectedParticipants}
        Type: ${formData.genre}
        Roles: ${JSON.stringify(formData.roles)}
      `;

      fetchAISuggestions(eventDetails);

      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        duration: "",
        location: "",
        contact: "",
        expectedParticipants: "",
        organisers: "",
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
    <form onSubmit={handleSubmit} className="w-4/5 max-w-4xl mx-auto bg-white text-black p-6 rounded-lg shadow space-y-4">
      <h2 className="text-2xl font-bold text-center">Create Charity Event</h2>

      {/* Form fields remain unchanged */}

      {/* Submit Button */}
      <div className="text-center">
        <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black">
          Create Charity Event
        </button>
      </div>
    </form>
  );
};

export default EventForm;
