import { Offset } from "../types";

export const SET_CELL_SIZE = "SET_CELL_SIZE";
export const SET_GRID_SIZE = "SET_GRID_SIZE";
export const SET_GRID_ROW = "SET_GRID_ROW";
export const SET_GRID_COL = "SET_GRID_COL";
export const SET_BOARD = "SET_BOARD";
export const SET_CELLS = "SET_CELLS";
export const SET_OFFSET = "SET_OFFSET";
export const SET_RECT = "SET_RECT";

export interface AppState {
  cell_size: number;
  grid_size: number;
  grid_rows: number;
  grid_cols: number;
  board: [];
  cells: [];
  offset: Offset | null;
  rect: DOMRect | null;
}

interface SetCellSizeAction {
  type: typeof SET_CELL_SIZE;
  payload: number;
}

interface SetGridSizeAction {
  type: typeof SET_GRID_SIZE;
  payload: number;
}

interface SetGridRowsAction {
  type: typeof SET_GRID_ROW;
  payload: number;
}
interface SetGridColsAction {
  type: typeof SET_GRID_COL;
  payload: number;
}

interface SetBoardAction {
  type: typeof SET_BOARD;
  payload: [];
}

interface SetCellsAction {
  type: typeof SET_CELLS;
  payload: [];
}
interface SetOffsetAction {
  type: typeof SET_OFFSET;
  payload: Offset;
}

interface SetRectAction {
  type: typeof SET_RECT;
  payload: DOMRect;
}

export type AppStatActions =
  | SetCellSizeAction
  | SetGridSizeAction
  | SetGridRowsAction
  | SetGridColsAction
  | SetBoardAction
  | SetCellsAction
  | SetOffsetAction
  | SetRectAction;
