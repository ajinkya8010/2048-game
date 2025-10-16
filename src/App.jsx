import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import useGameLogic from "./hooks/useGameLogic";

export default function App() {
  const {
    board,
    score,
    gameOver,
    gameWon,
    move,
    restart,
    boardSize
  } = useGameLogic(4); // default size 4x4

  return (
    <div className="app">
      <header>
        <h1>2048 Game Implementation</h1>
      </header>

      <main>
        <ScoreBoard
          score={score}
          onRestart={restart}
          gameOver={gameOver}
          gameWon={gameWon}
        />
        <Board board={board} onMove={move} boardSize={boardSize} />
        <div className="controls-note">
          Use arrow keys (← ↑ → ↓) or on-screen buttons (mobile) to play.
        </div>
      </main>
    </div>
  );
}
