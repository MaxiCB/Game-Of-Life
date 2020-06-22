import {
  SET_CELL_SIZE,
  SET_GRID_SIZE,
  SET_GRID,
  SET_BOARD,
  SET_CELLS,
  SET_OFFSET,
  SET_RECT,
} from "./types";

import { Dispatch } from "redux";
import { GameType, Cell, OffsetReturn } from "../types";
import { AppState } from ".";

export const testRedux = (message: string) => (dispatch: Dispatch) => {
  dispatch({ type: SET_CELL_SIZE, payload: 200 });
  console.log(message);
};

// Creation of the empty board
export const make_empty_board = () => (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  // Grabbing the grid from state
  const state = getState();
  const grid = state.app.grid;
  // Temporary holder of the grid we will create
  let temp: boolean[][] = [];
  // Iterating over rows
  for (let y = 0; y < grid.rows; y++) {
    // Setting the y/row to empty array
    temp[y] = [];
    // Iterating over all cols
    for (let x = 0; x < grid.cols; x++) {
      // Adding cell state to [y][x]
      temp[y][x] = false;
    }
  }
  dispatch({ type: SET_BOARD, payload: temp });
};

// Setting of the cells
export const make_cells = (board: boolean[][], grid: GameType) => (
  dispatch: Dispatch
) => {
  // Temporary hold of the board with cells
  let temp: Cell[] = [];
  //   Iterate over rows && cols and add cell to array
  for (let y = 0; y < grid.rows; y++) {
    for (let x = 0; x < grid.cols; x++) {
      if (board[y][x]) {
        temp.push({ state: "alive", x: x, y: y });
      }
    }
  }
  dispatch({ type: SET_CELLS, payload: temp });
};

// Setting element offset
// Setting the DOMRect
export const get_element_offset = (elem: HTMLDivElement) => (
  dispatch: Dispatch
) => {
  const rect = elem.getBoundingClientRect();
  const doc = document.documentElement;
  const x = rect.left + window.pageXOffset - doc.clientLeft;
  const y = rect.top + window.pageYOffset - doc.clientTop;
  dispatch({ type: SET_OFFSET, payload: { x: x, y: y } });
  dispatch({ type: SET_RECT, payload: rect });
};

// Setting grid size

// Defining all possible neighbor direction
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

// Find all living neighbors
export const find_neighbors = (
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
// Running an iteration
// This may be a source of any bugs
// May need to grab a reference before we empty the board
export const run_iteration = (grid: GameType, board: any[][]) => (
  getState: () => AppState
) => {
  // Create a new board
  const state = getState();
  let new_board = state.app.board;
  make_empty_board();
  // Iterate over all rows and columns
  for (let y = 0; y < grid.rows; y++) {
    for (let x = 0; x < grid.cols; x++) {
      // Fins all neighbors of the current cell
      let neighbors = find_neighbors(grid, board, x, y);
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

  make_cells(new_board, grid);
};
