const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server);

io.on("connection", (socket) => { 
  console.log("A user connected:", socket.id); // Log when a new user connects

  // Listen for the 'user-patr' event and broadcast it to all clients
  socket.on("user-patr", (msg) => {
    console.log("Message received:", msg); // Log the received message
    io.emit("message", msg); // Emit the message to all connected clients
  });

  // Handle user disconnecting
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Serve static files from the "uploads/public" directory
app.use(express.static(path.join(__dirname, "uploads", "public")));

// Serve index.html for the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "uploads", "public", "index.html"));
});

// Start the server on port 9000
const PORT = 9000; 
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
