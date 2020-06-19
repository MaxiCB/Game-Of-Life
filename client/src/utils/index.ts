import { GameType, OffsetReturn, Offset } from "../types";

export const makeEmptyBoard = (grid: GameType) => {
  let temp: any[][] = [];
  for (let i = 0; i < grid.rows; i++) {
    temp[i] = [];
    for (let j = 0; j < grid.cols; j++) {
      temp[i][j] = false;
    }
  }
  return temp;
};

const makeCells = (board: any[][], grid: GameType) => {
  let temp = [];
  if (board.length > 0) {
    for (let i = 0; i < grid.rows; i++) {
      for (let j = 0; j < grid.cols; j++) {
        if (board[i][j]) {
          temp.push({ x: j, y: i });
        }
      }
    }
  }
  return temp;
};

export const handleBoardClick = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  cellSize: number,
  grid: GameType,
  board: any[][],
  offset: Offset
) => {
  const xOff = e.clientX - offset!.x;
  const yOff = e.clientY - offset!.y;
  const x = Math.floor(xOff / cellSize);
  const y = Math.floor(yOff / cellSize);

  if (x >= 0 && x <= grid.cols && y >= 0 && y <= grid.rows) {
    board[y][x] = !board[y][x];
  }
  return makeCells(board, grid);
};

export const getElementOffset = (elem: HTMLDivElement): OffsetReturn => {
  const rect = elem.getBoundingClientRect();
  const doc = document.documentElement;
  const x = rect.left + window.pageXOffset - doc.clientLeft;
  const y = rect.top + window.pageYOffset - doc.clientTop;
  return { offset: { x: x, y: y }, rect: rect };
};
