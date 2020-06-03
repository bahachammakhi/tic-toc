import React, { useEffect } from "react";
import Client from "socket.io-client";
import logo from "./logo.svg";
import "./App.css";
import Board from "./components/Board";
// const socket = Client("http://localhost:5000");
function App() {
  useEffect(() => {
    // socket.emit("joinroom", { name: "Baha" });
  }, []);
  return <Board />;
}

export default App;
