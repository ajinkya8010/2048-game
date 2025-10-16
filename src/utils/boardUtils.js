/**
 * Board utilities: creation, random tile addition, checks
 */

export function createEmptyBoard(size) {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => 0));
}

export function addRandomTile(board) {
  const size = board.length;
  const empty = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === 0) empty.push([r, c]);
    }
  }
  if (empty.length === 0) return board.map((row) => row.slice()); // no-op copy

  const copy = board.map((row) => row.slice());
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  // 90% chance 2, 10% chance 4
  copy[r][c] = Math.random() < 0.9 ? 2 : 4;
  return copy;
}

export function generateInitialBoard(size = 4) {
  let b = createEmptyBoard(size);
  b = addRandomTile(b);
  b = addRandomTile(b);
  return b;
}

export function hasMoves(board) {
  const n = board.length;
  // any empty cell?
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === 0) return true;
    }
  }
  // check adjacent equals horizontally or vertically
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const v = board[r][c];
      if (r + 1 < n && board[r + 1][c] === v) return true;
      if (c + 1 < n && board[r][c + 1] === v) return true;
    }
  }
  return false;
}
