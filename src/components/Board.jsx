import React from "react";
import Tile from "./Tile";

/**
 * Board UI component.
 * Props:
 * - board: 2D array
 * - onMove: function(direction) -> triggers move
 * - boardSize: number
 */
export default function Board({ board, onMove, boardSize }) {

  return (
    <div className="board-wrapper">
      <div
        className="board"
        style={{
          gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
          gridTemplateRows: `repeat(${boardSize}, 1fr)`
        }}
        role="grid"
        aria-label="2048 board"
      >
        {board.flat().map((val, i) => (
          <Tile key={i} value={val} />
        ))}
      </div>

      <div className="controls">
        <button onClick={() => onMove("up")}>↑</button>
        <div className="lr">
          <button onClick={() => onMove("left")}>←</button>
          <button onClick={() => onMove("right")}>→</button>
        </div>
        <button onClick={() => onMove("down")}>↓</button>
      </div>
    </div>
  );
}
