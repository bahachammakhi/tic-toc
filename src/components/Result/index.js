import React from "react";

const Result = ({ winner }) => {
  return (
    <div style={{ fontSize: "3em" }}>
      {winner ? <> {`And the winner is ${winner?.winner}`}</> : <></>}
    </div>
  );
};

export default Result;
