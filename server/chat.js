const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server);

// Listen for new connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for messages from the client
  socket.on("user-patr", (msg) => {
    console.log("Message received:", msg);
    io.emit("message", msg); // Broadcast the message to all clients
  });

  // Handle user disconnecting
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Serve static files from the React app's 'src' folder (for dev purposes)
// In development, React's dev server will handle the assets
app.use(express.static(path.join(__dirname, "../client/src")));

// Serve the React app's index.html when accessing root route
// Normally, React's dev server serves index.html, so you shouldn't need this unless you're not using it
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/src", "inde.html"));
});

// Start the server on port 9000
const PORT = 9000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
