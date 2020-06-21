import {
  SET_CELL_SIZE,
  SET_GRID_SIZE,
  SET_GRID_ROW,
  SET_GRID_COL,
  SET_BOARD,
  SET_CELLS,
  SET_OFFSET,
  SET_RECT,
  AppState,
  AppStatActions,
} from "./types";

export const initialState: AppState = {
  cell_size: 20,
  grid_size: 800,
  grid_rows: 800 / 20,
  grid_cols: 800 / 20,
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
    case SET_GRID_ROW:
      return {
        ...state,
        grid_rows: action.payload,
      };
    case SET_GRID_COL:
      return {
        ...state,
        grid_cols: action.payload,
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
