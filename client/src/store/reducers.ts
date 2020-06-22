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
} from "./types";
import { GameType, Grid } from "../types";

const default_grid_size: Grid = { width: 100, height: 100 };
const default_cell_size: number = 20;
const default_grid: GameType = {
  rows: default_grid_size.height / default_cell_size,
  cols: default_grid_size.height / default_cell_size,
};

export const initialState: AppState = {
  cell_size: default_cell_size,
  grid: default_grid,
  grid_size: default_grid_size,
  board: [],
  cells: [],
  offset: null,
  rect: null,
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
    default:
      return state;
  }
};
