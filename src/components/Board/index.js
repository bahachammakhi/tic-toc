import React, { useState, useEffect, useRef } from "react";
import Square from "../Square";
import Result from "../Result";
import Client from "socket.io-client";
import { boardClass, squareElement } from "./style";
import {
  CheckFinished,
  initialState,
  calculateWinner,
  winningLines,
  createLine,
} from "../../utils/utils";
const socket = Client(`https://tic-toc-baha.herokuapp.com/`);

const Board = () => {
  const [squares, setSquares] = useState(initialState);
  const [isNext, setIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winnerRef, setRef] = useState(true);
  socket.on("connect", (data) => {
    socket.on("squares", (data) => {
      console.log("test", data);
      setSquares(data);
    });
    socket.on("resetClient", (data) => {
      setSquares(data);
      setWinner(null);
      setRef(true);
    });
    socket.on("initial", (data) => {
      setIsNext(data);
    });
    socket.on("nextrole", (data) => {
      console.log("current", data);
      setIsNext(data);
    });
  });
  useEffect(() => {
    socket.emit("mounted");
  }, []);
  useEffect(() => {
    if (winnerRef) {
      setWinner(calculateWinner(squares));
      if (winner) {
        setRef(false);
        console.log(`Winner is ${winner?.winner}`);
        const createdLines = createLine(squares, winner);
        setSquares(createdLines);
        socket.emit("nextrole", createdLines);
      }
    }
  });
  const handleInit = () => {
    const clone = [
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
    setSquares(clone);
    setIsNext(true);
  };
  const handleClick = (index) => {
    if (CheckFinished(squares) === undefined) {
      handleInit();
    }
    if (squares[index].value !== null) return;
    const clone = [...squares];
    clone[index].value = isNext ? "X" : "O";
    setSquares(clone);
    setIsNext(!isNext);
    socket.emit("nextrole", squares);
  };
  return (
    <>
      <div style={boardClass}>
        {squares.map((element, index) => (
          <div key={index} style={squareElement}>
            <Square onClick={handleClick} winner={winner} {...element} />
          </div>
        ))}{" "}
      </div>
      <h2>Current player : {isNext ? "X" : "O"}</h2>
      <Result winner={winner} />
      <button onClick={() => socket.emit("reset")}>Reset</button>
    </>
  );
};

export default Board;
