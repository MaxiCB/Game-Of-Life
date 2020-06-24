import {
  SET_CELL_SIZE,
  SET_GRID_SIZE,
  SET_GRID,
  SET_BOARD,
  SET_CELLS,
  SET_OFFSET,
  SET_RECT,
  AppState,
  AppStatActions,
  SET_ITERATIONS,
  SET_RUNNING,
} from "./types";
import { Grid, GameType } from "../types";

const intialGrid: Grid = { width: 800, height: 800 };
const intiailCellSize: number = 20;
const initialGame: GameType = {
  rows: intialGrid.width / intiailCellSize,
  cols: intialGrid.height / intiailCellSize,
};

export const initialState: AppState = {
  cell_size: intiailCellSize,
  grid: initialGame,
  grid_size: intialGrid,
  board: [],
  cells: [],
  offset: null,
  rect: null,
  iterations: 0,
  running: false,
};

export const reducer = (
  state = initialState,
  action: AppStatActions
): AppState => {
  switch (action.type) {
    case SET_CELL_SIZE:
      return {
        ...state,
        cell_size: action.payload,
      };
    case SET_GRID_SIZE:
      return {
        ...state,
        grid_size: action.payload,
      };
    case SET_GRID:
      return {
        ...state,
        grid: action.payload,
      };
    case SET_BOARD:
      return {
        ...state,
        board: action.payload,
      };
    case SET_CELLS:
      return {
        ...state,
        cells: action.payload,
      };
    case SET_OFFSET:
      return {
        ...state,
        offset: action.payload,
      };
    case SET_RECT:
      return {
        ...state,
        rect: action.payload,
      };
    case SET_ITERATIONS:
      return {
        ...state,
        iterations: action.payload,
      };
    case SET_RUNNING:
      return {
        ...state,
        running: action.payload,
      };
    default:
      return state;
  }
};
