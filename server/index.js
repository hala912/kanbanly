const express = require("express");
const cors = require("cors");
// Load settings from the environment file.
require("dotenv").config();
const pool = require("./db");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
io.on("connection", (socket) => {
  console.log("a user connected");
  // Listen for the "disconnect" event and log when a user disconnects.
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  // Listen for the "joinRoom" event and join the specified room. 
  socket.on("joinRoom", (boardId) => {
    socket.join(`board-${boardId}`);
    console.log(`${socket.id} joined board-${boardId}`);
  }) 

})

app.set("io", io);

const PORT = process.env.PORT || 3000;
// Allow requests from the frontend and read JSON request bodies.
app.use(cors());
app.use(express.json());
// Check that the server is running.
app.get("/", (req, res) => {
  res.send("Hello World!");
});
// Check that the server can connect to the database.
app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection failed");
  }
});
// Add the login and signup routes.
app.use("/", require("./routes/auth"));
// Add the boards routes.
app.use("/", require("./routes/boards"));
// Add the columns routes.
app.use("/", require("./routes/colums"));
// Add the cards routes.
app.use("/", require("./routes/cards"));
// Start the server on the configured port.
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { io };