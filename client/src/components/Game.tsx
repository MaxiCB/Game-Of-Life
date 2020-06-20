import React from "react";
// Components
import GameCell from "../components/Cell";
// Types and Utils
import { Cell, Grid, GameType, Offset } from "../types";
import {
  makeEmptyBoard,
  handleBoardClick,
  getElementOffset,
  makeRandom,
  makeCells,
  runIteration,
} from "../utils";

const Game: React.FC = () => {
  const [cellSize, setCellSize] = React.useState<number>(20);
  const [gridSize, setGridSize] = React.useState<Grid>({
    width: 800,
    height: 800,
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
    <div>
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
      >
        {cells.map((cell) => (
          <GameCell
            state={cell.state}
            size={cellSize}
            x={cell.x}
            y={cell.y}
            key={`${cell.x},${cell.y}`}
          />
        ))}
      </div>
      <div className="controls">
        Board Width:
        <input
          value={gridSize.width}
          onChange={(e) =>
            setGridSize({
              width: parseInt(e.target.value, 10),
              height: gridSize.height,
            })
          }
        />{" "}
        Board Height:
        <input
          value={gridSize.height}
          onChange={(e) =>
            setGridSize({
              width: gridSize.width,
              height: parseInt(e.target.value, 10),
            })
          }
        />{" "}
        <button
          className="button"
          onClick={(_) => setCells(makeRandom(grid, board))}
        >
          Randomize
        </button>
        <button
          className="button"
          onClick={(_) => {
            setBoard(makeEmptyBoard(grid));
            setCells(makeCells(board, grid));
          }}
        >
          Clear
        </button>
        <button
          className="button"
          onClick={(_) => {
            setCells(runIteration(grid, board));
          }}
        >
          Run 1X
        </button>
      </div>
    </div>
  );
};

export default Game;
