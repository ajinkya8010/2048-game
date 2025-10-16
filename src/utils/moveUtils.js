/**
 * Pure move functions. Each function accepts a board (2D array)
 * and returns { board: newBoard, points } where points is score gained
 * from merges in that move.
 *
 * Implementation strategy:
 * - For moveLeft: process each row: compress -> merge -> compress
 * - For moveRight: reverse row, process same, reverse back
 * - For moveUp/moveDown: transpose the board and reuse left/right logic
 *
 * IMPORTANT: none of these mutate the input board.
 */

/** compress a single row to the left (remove zeros) */
function compressRow(row) {
  const filtered = row.filter((v) => v !== 0);
  const zeros = Array(row.length - filtered.length).fill(0);
  return filtered.concat(zeros);
}

/** merge a compressed row (left merge) */
function mergeRow(row) {
  // row must be compressed (e.g., [2,2,4,0])
  const out = row.slice();
  let points = 0;
  for (let i = 0; i < out.length - 1; i++) {
    if (out[i] !== 0 && out[i] === out[i + 1]) {
      out[i] = out[i] * 2;
      out[i + 1] = 0;
      points += out[i];
      i++; // skip next
    }
  }
  return { row: out, points };
}

function transpose(board) {
  const n = board.length;
  const out = createEmpty(n);
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      out[c][r] = board[r][c];
    }
  }
  return out;
}

function createEmpty(n) {
  return Array.from({ length: n }, () => Array.from({ length: n }, () => 0));
}

export function moveLeft(board) {
  const n = board.length;
  let newBoard = createEmpty(n);
  let totalPoints = 0;

  for (let r = 0; r < n; r++) {
    const row = board[r].slice();
    const compressed = compressRow(row);
    const { row: merged, points } = mergeRow(compressed);
    const finalRow = compressRow(merged);
    newBoard[r] = finalRow;
    totalPoints += points;
  }

  return { board: newBoard, points: totalPoints };
}

export function moveRight(board) {
  // reverse each row, moveLeft, then reverse result rows
  const n = board.length;
  const reversed = board.map((row) => row.slice().reverse());
  const { board: moved, points } = moveLeft(reversed);
  const restored = moved.map((row) => row.slice().reverse());
  return { board: restored, points };
}

export function moveUp(board) {
  const t = transpose(board);
  const { board: moved, points } = moveLeft(t);
  const restored = transpose(moved);
  return { board: restored, points };
}

export function moveDown(board) {
  const t = transpose(board);
  const { board: moved, points } = moveRight(t);
  const restored = transpose(moved);
  return { board: restored, points };
}
