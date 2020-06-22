import React from "react";
// Redux
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
} from "../store/actions";
// Components
import GameCell from "../components/Cell";
// Types and Utils
import { Cell, Grid, GameType } from "../types";
import { AppState } from "../store/types";

interface GameProps {
  make_empty_board: typeof make_empty_board;
  handle_board_click: typeof handle_board_click;
  get_element_offset: typeof get_element_offset;
  make_cells: typeof make_cells;
  run_iteration: typeof run_iteration;
  make_random_board: typeof make_random_board;
  toggle_running: typeof toggle_running;
  running: boolean;
  grid: GameType;
  rect: DOMRect | null;
  grid_size: Grid;
  cell_size: number;
  cells: Cell[];
  iterations: number;
}

const Game: React.FC<GameProps> = ({
  make_empty_board,
  handle_board_click,
  get_element_offset,
  make_cells,
  run_iteration,
  make_random_board,
  toggle_running,
  running,
  grid,
  rect,
  grid_size,
  cell_size,
  cells,
  iterations,
}) => {
  const [interval, setTimerInterval] = React.useState<NodeJS.Timeout | null>(
    null
  );
  const [speed, setSpeed] = React.useState<number>(300);

  React.useEffect(() => {
    make_empty_board();
    make_cells();
  }, []);

  let timeout_handler: NodeJS.Timeout | null = null;

  const run_game = () => {
    toggle_running(true);
    let temp = setInterval(() => {
      run_iteration();
      make_cells();
    }, speed);
    setTimerInterval(temp);
  };

  return (
    <div>
      <div
        className="board"
        style={{
          width: grid_size.width,
          height: grid_size.height,
          backgroundSize: `${cell_size}px ${cell_size}px`,
        }}
        onClick={(e) => {
          if (!running) {
            handle_board_click(e);
            make_cells();
          }
        }}
        ref={(el) => {
          if (!el) {
            return;
          }
          if (!rect) {
            get_element_offset(el);
          }
        }}
      >
        {cells.map((cell) => (
          <GameCell
            state={cell.state}
            size={cell_size}
            x={cell.x}
            y={cell.y}
            key={`${cell.x},${cell.y}`}
          />
        ))}
      </div>
      <div className="controls">
        <h2>Iterations: {iterations}</h2>
        <button
          onClick={(_) => {
            run_iteration();
            make_cells();
          }}
        >
          Run 1X
        </button>
        <button onClick={(_) => run_game()}>Run</button>
        <button
          onClick={(_) => {
            toggle_running(false);
            if (interval) {
              clearInterval(interval);
              setTimerInterval(null);
            }
          }}
        >
          Stop
        </button>
        <button
          onClick={(_) => {
            toggle_running(false);
            if (interval) {
              clearInterval(interval);
              setTimerInterval(null);
            }
            make_empty_board();
            make_cells();
          }}
        >
          Clear
        </button>
        <button
          onClick={(_) => {
            make_random_board();
            make_cells();
          }}
        >
          Random
        </button>
        Speed:{" "}
        <input
          type="number"
          onChange={(e) => setSpeed(parseInt(e.target.value, 10) * 10)}
        />
      </div>
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
})(Game);
