export interface Grid {
  width: number;
  height: number;
}

export interface Board {
  width: number;
  height: number;
}

export interface GameType {
  rows: number;
  cols: number;
}

export interface Offset {
  x: number;
  y: number;
}

export interface OffsetReturn {
  rect: DOMRect;
  offset: Offset;
}

export interface Cell {
  state: string;
  x: number;
  y: number;
}

export interface CellProps {
  size: number;
  x: number;
  y: number;
  state: string;
}
