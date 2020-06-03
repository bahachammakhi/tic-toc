import React from "react";

const Square = ({ value, index, cut, winner, onClick }) => {
  const squareCSS = {
    width: "12vw",
    height: "12vw",
    cursor: "pointer",
    fontSize: "10vw",
    backgroundColor: cut ? "red" : "",
    border: "1px solid red",
  };
  const squareFinshedCSS = {
    width: "12vw",
    height: "12vw",
    pointerEvents: "none",
    fontSize: "10vw",
    backgroundColor: cut ? "red" : "",

    border: "1px solid red",
  };
  return (
    <div
      onClick={() => onClick(index)}
      style={winner ? squareFinshedCSS : squareCSS}
    >
      {value}
    </div>
  );
};

export default Square;
