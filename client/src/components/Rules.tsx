import React from "react";

const Rules = () => {
  return (
    <div style={{ display: "flex" }}>
      <div className="rules">
        <h1>Rules: </h1>
        <ul>
          <li>
            Any live cell with fewer than two live neighbours dies, as if by
            underpopulation.
          </li>
          <li>
            Any live cell with two or three live neighbours lives on to the next
            generation.
          </li>
          <li>
            Any live cell with more than three live neighbours dies, as if by
            overpopulation.
          </li>
          <li>
            Any dead cell with exactly three live neighbours becomes a live
            cell, as if by reproduction.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Rules;
