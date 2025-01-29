const express = require("express");
const http = require("http");
const path = require("path");
const {Server} = require ("socket.io");
const app = express();
const server = http.createServer(app);

const io = new Server(server);
app.use(express.static(path.join(__dirname, "uploads", "public")));
io.on("connection",(socket)=>{
  console.log("A new product has been connected",socket.id)
})
// Serve index.html for the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "uploads", "public", "index.html"));
});

// Start the server on port 9000
const PORT = 9000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
