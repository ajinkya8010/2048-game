import { useState, useEffect, useCallback } from "react";
import {
  addRandomTile,
  generateInitialBoard,
  hasMoves
} from "../utils/boardUtils";
import {
  moveLeft,
  moveRight,
  moveUp,
  moveDown
} from "../utils/moveUtils";

/**
 * Custom hook that encapsulates board state, score and controls.
 * boardSize: number (Y) for YxY board
 */
export default function useGameLogic(boardSize = 4) {
  const [board, setBoard] = useState(() => generateInitialBoard(boardSize));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // Apply a move function (pure) and update board immutably
  const applyMove = useCallback(
    (moveFn) => {
      if (gameOver || gameWon) return;

      const { board: newBoard, points } = moveFn(board);
      // If board didn't change, don't add a new tile
      const changed = JSON.stringify(board) !== JSON.stringify(newBoard);

      if (!changed) return;

      setScore((s) => s + points);
      // add a random tile to new board
      const withTile = addRandomTile(newBoard);
      setBoard(withTile);

      // check win
      const found2048 = withTile.flat().some((v) => v === 2048);
      if (found2048) setGameWon(true);

      // check game over (no moves left)
      if (!hasMoves(withTile)) setGameOver(true);
    },
    [board, gameOver, gameWon]
  );

  const move = useCallback(
    (direction) => {
      if (direction === "left") applyMove(moveLeft);
      else if (direction === "right") applyMove(moveRight);
      else if (direction === "up") applyMove(moveUp);
      else if (direction === "down") applyMove(moveDown);
    },
    [applyMove]
  );

  const restart = useCallback(() => {
    setBoard(generateInitialBoard(boardSize));
    setScore(0);
    setGameOver(false);
    setGameWon(false);
  }, [boardSize]);

  // keyboard handling
  useEffect(() => {
    const handler = (e) => {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        if (e.key === "ArrowLeft") move("left");
        if (e.key === "ArrowRight") move("right");
        if (e.key === "ArrowUp") move("up");
        if (e.key === "ArrowDown") move("down");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [move]);

  return {
    board,
    score,
    gameOver,
    gameWon,
    move,
    restart,
    boardSize
  };
}
