import { GameType, OffsetReturn, Offset, Cell } from "../types";

export const makeEmptyBoard = (grid: GameType) => {
  let temp: any[][] = [];
  for (let y = 0; y < grid.rows; y++) {
    temp[y] = [];
    for (let x = 0; x < grid.cols; x++) {
      temp[y][x] = false;
    }
  }
  return temp;
};

export const makeCells = (board: any[][], grid: GameType) => {
  let temp = [];
  for (let y = 0; y < grid.rows; y++) {
    for (let x = 0; x < grid.cols; x++) {
      if (board[y][x]) {
        temp.push({ state: "alive", x: x, y: y });
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

// All possible directions
// Cardinals && Diagonals
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

export const findNeighbors = (
  grid: GameType,
  board: any[][],
  x: number,
  y: number
) => {
  let neighbors = 0;
  // Loop over all possible directions for neighbors
  for (let i = 0; i < dirs.length; i++) {
    // Calculate neighbors coordinates using the dirs array
    const dir = dirs[i];
    let y1 = y + dir[0];
    let x1 = x + dir[1];

    // Ensure all points are within the grid
    // And check if the cell we are looking at is alive
    // If so add to the neighbors count
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
  // Create a new board
  let new_board = makeEmptyBoard(grid);
  // Iterate over all rows and columns
  for (let y = 0; y < grid.rows; y++) {
    for (let x = 0; x < grid.cols; x++) {
      // Fins all neighbors of the current cell
      let neighbors = findNeighbors(grid, board, x, y);
      // If the cell is alive
      if (board[y][x]) {
        // Remain alive if 2 || 3 neighbors
        // Else cell dies
        if (neighbors === 2 || neighbors === 3) {
          new_board[y][x] = true;
        } else {
          new_board[y][x] = false;
        }
        // If cell is dead and has 3 neighbors revive
      } else {
        if (!board[y][x] && neighbors === 3) {
          new_board[y][x] = true;
        }
      }
    }
  }

  return makeCells(new_board, grid);
};
