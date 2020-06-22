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

export const initialState: AppState = {
  cell_size: 20,
  grid: {
    rows: 800 / 20,
    cols: 800 / 20,
  },
  grid_size: { width: 800, height: 800 },
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
