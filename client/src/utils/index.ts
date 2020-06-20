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

export const makeCells = (board: any[][], grid: GameType) => {
  let temp = [];
  if (board.length > 0) {
    for (let i = 0; i < grid.rows; i++) {
      for (let j = 0; j < grid.cols; j++) {
        if (board[i][j]) {
          temp.push({ state: "alive", x: j, y: i });
        }
      }
    }
  }
  return temp;
};

export const makeRandom = (grid: GameType, board: any[][]) => {
  for (let y = 0; y < grid.rows; y++) {
    for (let x = 0; x < grid.cols; x++) {
      board[y][x] = Math.random() >= 0.5;
    }
  }

  return makeCells(board, grid);
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

export const findNeighbors = (
  grid: GameType,
  board: any[][],
  x: number,
  y: number
) => {
  let neighbors = 0;
  const dirs = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
  ];
  for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i];
    let y1 = y + dir[0];
    let x1 = x + dir[1];

    if (
      x1 >= 0 &&
      x1 < grid.cols &&
      y1 >= 0 &&
      y1 < grid.rows &&
      board[y1][x1]
    ) {
      neighbors++;
    }
  }

  return neighbors;
};

export const runIteration = (grid: GameType, board: any[][]) => {
  for (let y = 0; y < grid.rows; y++) {
    for (let x = 0; x < grid.cols; x++) {
      let neighbors = findNeighbors(grid, board, x, y);
      if (board[y][x]) {
        if (neighbors === 2 || neighbors === 3) {
          board[y][x] = true;
        } else {
          board[y][x] = false;
        }
      } else {
        if (!board[y][x] && neighbors === 3) {
          board[y][x] = true;
        } 
      }
    }
  }
  return makeCells(board, grid);
};
