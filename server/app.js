const express = require("express");
const socketio = require("socket.io");
const path = require("path");
const http = require("http");

const app = express();
app.use(express.static(path.join(__dirname, "../build")));
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

const server = http.createServer(app);
const io = socketio(server);
const initialState = [
  { value: null, index: 0, row: 1, cut: false },
  { value: null, index: 1, row: 1, cut: false },
  { value: null, index: 2, row: 1, cut: false },
  { value: null, index: 3, row: 2, cut: false },
  { value: null, index: 4, row: 2, cut: false },
  { value: null, index: 5, row: 2, cut: false },
  { value: null, index: 6, row: 3, cut: false },
  { value: null, index: 7, row: 3, cut: false },
  { value: null, index: 8, row: 3, cut: false },
];
let squares = [
  { value: null, index: 0, row: 1, cut: false },
  { value: null, index: 1, row: 1, cut: false },
  { value: null, index: 2, row: 1, cut: false },
  { value: null, index: 3, row: 2, cut: false },
  { value: null, index: 4, row: 2, cut: false },
  { value: null, index: 5, row: 2, cut: false },
  { value: null, index: 6, row: 3, cut: false },
  { value: null, index: 7, row: 3, cut: false },
  { value: null, index: 8, row: 3, cut: false },
];
let current = true;
io.on("connection", (socket) => {
  console.log("Connected!");
  socket.on("joinroom", (data) => {
    console.log(data);
  });
  socket.on("nextrole", (data) => {
    squares = data;
    current = !current;
    io.emit("squares", squares);
    io.emit("nextrole", current);
  });
  socket.on("reset", () => {
    io.emit("resetClient", initialState);
    squares = initialState;
  });

  socket.on("mounted", () => {
    io.emit("squares", squares);
    io.emit("initial", current);
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log("Server working on port 5000");
});
