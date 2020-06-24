import React from "react";
// Redux
import { connect } from "react-redux";
// Actions
import {
  make_empty_board,
  make_cells,
  get_element_offset,
  handle_board_click,
} from "../store/actions";
// Components
import GameCell from "../components/Cell";
// Types and Utils
import { Cell, Grid, GameType } from "../types";
import { AppState } from "../store/types";
import Rules from "./Rules";

interface GameProps {
  make_empty_board: typeof make_empty_board;
  handle_board_click: typeof handle_board_click;
  get_element_offset: typeof get_element_offset;
  make_cells: typeof make_cells;
  running: boolean;
  grid: GameType;
  rect: DOMRect | null;
  grid_size: Grid;
  cell_size: number;
  cells: Cell[];
}

// Possible speed improvements could come from storing only the cells information
// Instead of looping over the whole grid and searching each cell we could divide into dead/live cells
// And search through each structure to determine the next cell state

// Could look into making methods on each cell to search for it's neighbors using it's current x/y
// This would allow for each cell to have a direct reference to how many neighbors it has
// Maybe this would allow for me to speed up the iterations

const Game: React.FC<GameProps> = ({
  make_empty_board,
  handle_board_click,
  get_element_offset,
  make_cells,
  running,
  rect,
  grid_size,
  cell_size,
  cells,
}) => {
  React.useEffect(() => {
    make_empty_board();
    make_cells();
  }, []);

  return (
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
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    make_empty_board: make_empty_board,
    handle_board_click: handle_board_click,
    get_element_offset: get_element_offset,
    make_cells: make_cells,
    running: state.running,
    grid: state.grid,
    rect: state.rect,
    grid_size: state.grid_size,
    cell_size: state.cell_size,
    cells: state.cells,
  };
};

export default connect(mapStateToProps, {
  make_empty_board,
  handle_board_click,
  get_element_offset,
  make_cells,
})(Game);
