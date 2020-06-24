import React from "react";
import { CellProps } from "../types";

const colorSwitch = (state: string) => {
  switch (state) {
    case "alive":
      return "#2FB5FC";
    case "dying":
      return "red";
    default:
      return "black";
  }
};

const GameCell: React.FC<CellProps> = ({ state, size, x, y }) => {
  return (
    <div
      style={{
        position: "absolute",
        width: `${size - 1}px`,
        height: `${size - 1}px`,
        left: `${size * x + 1}px`,
        top: `${size * y + 1}px`,
        background: colorSwitch(state),
        borderRadius: "10%",
      }}
    />
  );
};

export default GameCell;
