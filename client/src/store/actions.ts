import {
  SET_CELL_SIZE,
  SET_GRID_SIZE,
  SET_GRID_ROW,
  SET_GRID_COL,
  SET_BOARD,
  SET_CELLS,
  SET_OFFSET,
  SET_RECT,
} from "./types";

import { Dispatch } from "redux";

export const testRedux = (message: string) => (dispatch: Dispatch) => {
  dispatch({ type: SET_CELL_SIZE, payload: 200 });
  console.log(message);
};
