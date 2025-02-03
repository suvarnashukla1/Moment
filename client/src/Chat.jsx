import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:9000"); // Replace with your server URL

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("Socket connected with ID:", socket.id);
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("user-patr", message); // Emit message to server
      setMessage(""); // Clear input after sending
    }
  };

  return (
    <div>
      <h1>Chat with Organizers</h1>
      <input
        type="text"
        placeholder="Type your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
};

export default Chat;
