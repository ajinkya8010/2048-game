import React from "react";

export default function ScoreBoard({ score, onRestart, gameOver, gameWon }) {
  return (
    <div className="scoreboard">
      <div className="score">
        <div className="label">Score</div>
        <div className="value">{score}</div>
      </div>
      <div className="actions">
        <button onClick={onRestart}>Restart</button>
      </div>
      <div className="status">
        {gameWon ? <div className="win">You reached 2048 — You win!</div> : null}
        {gameOver ? <div className="lose">No moves — Game Over</div> : null}
      </div>
    </div>
  );
}
