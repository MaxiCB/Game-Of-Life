import React from "react";
import { connect } from "react-redux";
// Actions
import {
  make_empty_board,
  make_cells,
  get_element_offset,
  run_iteration,
  handle_board_click,
  make_random_board,
  toggle_running,
  set_cell_size,
} from "../store/actions";
import { GameType, Grid, Cell } from "../types";
import { AppState } from "../store/types";
import Button from "./Button";

interface ControlProps {
  make_empty_board: typeof make_empty_board;
  handle_board_click: typeof handle_board_click;
  get_element_offset: typeof get_element_offset;
  make_cells: typeof make_cells;
  run_iteration: typeof run_iteration;
  make_random_board: typeof make_random_board;
  toggle_running: typeof toggle_running;
  set_cell_size: typeof set_cell_size;
  running: boolean;
  grid: GameType;
  rect: DOMRect | null;
  grid_size: Grid;
  cell_size: number;
  cells: Cell[];
  iterations: number;
}

const Controls: React.FC<ControlProps> = ({
  make_empty_board,
  make_cells,
  run_iteration,
  make_random_board,
  toggle_running,
  set_cell_size,
  grid_size,
  cell_size,
  cells,
  iterations,
}) => {
  const [interval, setTimerInterval] = React.useState<NodeJS.Timeout | null>(
    null
  );
  const [speed, setSpeed] = React.useState<number>(300);
  const [size, setSize] = React.useState<number>(cell_size);

  const run_game = () => {
    toggle_running(true);
    let temp = setInterval(() => {
      run_iteration();
      make_cells();
    }, speed);
    setTimerInterval(temp);
  };

  const run_single = () => {
    run_iteration();
    make_cells();
  };

  const stop_game = () => {
    toggle_running(false);
    if (interval) {
      clearInterval(interval);
      setTimerInterval(null);
    }
  };

  const clear_game = () => {
    toggle_running(false);
    if (interval) {
      clearInterval(interval);
      setTimerInterval(null);
    }
    make_empty_board();
    make_cells();
  };

  const make_random = () => {
    make_random_board();
    make_cells();
  };

  const set_cell = () => {
    set_cell_size(size);
  };

  return (
    <div className="controls">
      <h2>Iterations: {iterations}</h2>
      <Button title={"Run 1X"} action={run_single} />
      <Button title={"Run"} action={run_game} />
      <Button title={"Stop"} action={stop_game} />
      <Button title={"Clear"} action={clear_game} />
      <Button title={"Randomize"} action={make_random} />
      Speed:{" "}
      <input
        type="number"
        onChange={(e) => setSpeed(parseInt(e.target.value, 10) * 10)}
      />
      Cell Size:
      <input
        type="number"
        onChange={(e) => setSize(parseInt(e.target.value, 10))}
      />
      <Button title={"Set Size"} action={set_cell} />
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    make_empty_board: make_empty_board,
    handle_board_click: handle_board_click,
    get_element_offset: get_element_offset,
    make_cells: make_cells,
    run_iteration: run_iteration,
    make_random_board: make_random_board,
    toggle_running: toggle_running,
    set_cell_size: set_cell_size,
    running: state.running,
    grid: state.grid,
    rect: state.rect,
    grid_size: state.grid_size,
    cell_size: state.cell_size,
    cells: state.cells,
    iterations: state.iterations,
  };
};

export default connect(mapStateToProps, {
  make_empty_board,
  handle_board_click,
  get_element_offset,
  make_cells,
  run_iteration,
  make_random_board,
  toggle_running,
  set_cell_size,
})(Controls);
