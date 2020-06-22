import { Offset, Board, GameType, Cell, Grid } from "../types";

export const SET_CELL_SIZE = "SET_CELL_SIZE";
export const SET_GRID_SIZE = "SET_GRID_SIZE";
export const SET_GRID = "SET_GRID";
export const SET_BOARD = "SET_BOARD";
export const SET_CELLS = "SET_CELLS";
export const SET_OFFSET = "SET_OFFSET";
export const SET_RECT = "SET_RECT";
export const SET_ITERATIONS = "SET_ITERATION";

export interface AppState {
  cell_size: number;
  grid: GameType;
  grid_size: Grid;
  board: boolean[][];
  cells: Cell[];
  offset: Offset | null;
  rect: DOMRect | null;
  iterations: number;
}

interface SetCellSizeAction {
  type: typeof SET_CELL_SIZE;
  payload: number;
}

interface SetGridAction {
  type: typeof SET_GRID;
  payload: GameType;
}

interface SetGridSizeAction {
  type: typeof SET_GRID_SIZE;
  payload: Grid;
}

interface SetBoardAction {
  type: typeof SET_BOARD;
  payload: any[][];
}

interface SetCellsAction {
  type: typeof SET_CELLS;
  payload: Cell[];
}
interface SetOffsetAction {
  type: typeof SET_OFFSET;
  payload: Offset;
}

interface SetRectAction {
  type: typeof SET_RECT;
  payload: DOMRect;
}

interface SetIterationAction {
  type: typeof SET_ITERATIONS;
  payload: number;
}

export type AppStatActions =
  | SetCellSizeAction
  | SetGridAction
  | SetGridSizeAction
  | SetBoardAction
  | SetCellsAction
  | SetOffsetAction
  | SetRectAction
  | SetIterationAction;
