import React from "react";
import { Cell, Grid, GameType, Offset } from "../types";
import { makeEmptyBoard, handleBoardClick, getElementOffset } from "../utils";
import { off } from "process";

const Game: React.FC = () => {
  const [cellSize, setCellSize] = React.useState<number>(20);
  const [gridSize, setGridSize] = React.useState<Grid>({
    width: 400,
    height: 400,
  });
  const [grid, setGrid] = React.useState<GameType>({
    rows: gridSize.height / cellSize,
    cols: gridSize.width / cellSize,
  });
  const [board, setBoard] = React.useState<any[][]>([]);
  const [cells, setCells] = React.useState<Cell[]>([]);

  //   Offset for clicking cells
  const [offset, setOffset] = React.useState<Offset>();
  const [rect, setRect] = React.useState<DOMRect>();

  React.useEffect(() => {
    setBoard(makeEmptyBoard(grid));
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setCells(handleBoardClick(e, cellSize, grid, board, offset!));
  };

  return (
    <div
      className="board"
      style={{
        width: gridSize.width,
        height: gridSize.height,
        backgroundSize: `${cellSize}px ${cellSize}px`,
      }}
      onClick={(e) => handleClick(e)}
      ref={(el) => {
        if (!el) {
          return;
        }
        if (!rect) {
          const temp = getElementOffset(el);
          setRect(temp.rect);
          setOffset(temp.offset);
        }
      }}
    ></div>
  );
};

export default Game;
