# 2048 Game Implementation

A modern, fully-functional implementation of the popular 2048 puzzle game built with React and functional programming principles. Slide numbered tiles on a grid to combine them and create a tile with the number 2048.

## 🎮 [Play the Game](https://two048-game-awks.onrender.com)

## ✨ Features

- **Classic 2048 Gameplay** - Slide tiles in four directions to merge identical numbers
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Keyboard & Touch Controls** - Arrow keys for desktop, on-screen buttons for mobile
- **Real-time Score Tracking** - Points awarded for each successful merge
- **Win/Lose Detection** - Automatic game state management
- **Configurable Board Size** - Easily adjustable grid dimensions (default 4x4)
- **Smooth Animations** - Polished UI with CSS transitions
- **Restart Functionality** - Start fresh anytime

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ajinkya8010/2048-game.git
cd 2048-game

# Install dependencies
npm install

# Start development server
npm run dev
```

The game will be available at `http://localhost:5173`


## 🎯 How to Play

1. **Objective**: Combine tiles with the same number to reach 2048
2. **Controls**:
   - **Desktop**: Use arrow keys (← ↑ → ↓)
   - **Mobile**: Tap the directional buttons
3. **Gameplay**:
   - Tiles slide in the chosen direction
   - When two tiles with the same number touch, they merge into one
   - After each move, a new tile (2 or 4) appears randomly
4. **Scoring**: Earn points equal to the value of newly created tiles
5. **Win**: Reach the 2048 tile
6. **Lose**: No more moves possible

## 🏗️ Architecture & Implementation

### Functional Programming Approach

This implementation emphasizes **pure functions** and **immutable state management**:

```javascript
// Pure move functions - no side effects
export function moveLeft(board) {
  // Returns { board: newBoard, points } without mutating input
}

// Immutable state updates
const applyMove = useCallback(
  (moveFn) => {
    const { board: newBoard, points } = moveFn(board);
    setBoard(addRandomTile(newBoard)); // Always create new state
  },
  [board]
);
```

### Key Design Patterns

- **Custom Hooks**: `useGameLogic` encapsulates all game state and logic
- **Pure Functions**: All board operations are side-effect free
- **Separation of Concerns**: Clear boundaries between UI, logic, and utilities
- **Immutable Updates**: State changes never mutate existing data
- **Functional Composition**: Complex moves built from simple operations

### Project Structure

```
src/
├── components/          # React UI components
│   ├── Board.jsx       # Game board and controls
│   ├── ScoreBoard.jsx  # Score display and restart
│   └── Tile.jsx        # Individual tile component
├── hooks/
│   └── useGameLogic.js # Main game state management
├── utils/
│   ├── boardUtils.js   # Board creation and validation
│   └── moveUtils.js    # Pure move algorithms
├── App.jsx             # Main application component
├── main.jsx           # React entry point
└── index.css          # Styling and animations
```

## 🧮 Algorithm Details

### Move Implementation Strategy

1. **Left Move**: Direct implementation with compress → merge → compress
2. **Right Move**: Reverse row → left move → reverse back
3. **Up Move**: Transpose → left move → transpose back
4. **Down Move**: Transpose → right move → transpose back

### Core Algorithms

**Tile Compression**:

```javascript
function compressRow(row) {
  const filtered = row.filter((v) => v !== 0);
  const zeros = Array(row.length - filtered.length).fill(0);
  return filtered.concat(zeros);
}
```

**Tile Merging**:

```javascript
function mergeRow(row) {
  const out = row.slice();
  let points = 0;
  for (let i = 0; i < out.length - 1; i++) {
    if (out[i] !== 0 && out[i] === out[i + 1]) {
      out[i] *= 2;
      out[i + 1] = 0;
      points += out[i];
      i++; // Prevent double merge
    }
  }
  return { row: out, points };
}
```

## 🎨 Technical Highlights

- **React 19** with modern hooks and functional components
- **Vite** for fast development and optimized builds
- **CSS Grid** for responsive board layout
- **CSS Custom Properties** for maintainable theming
- **ESLint** for code quality and consistency
- **Immutable State Management** throughout the application
- **Event-driven Architecture** with keyboard and click handlers

## 🔧 Configuration

### Board Size Customization

The board size is configurable via the `useGameLogic` hook:

```javascript
// In App.jsx
const gameLogic = useGameLogic(4); // 4x4 board (default)
const gameLogic = useGameLogic(5); // 5x5 board
```

### Tile Spawn Probability

Modify tile generation in `boardUtils.js`:

```javascript
// 90% chance for 2, 10% chance for 4 (default)
copy[r][c] = Math.random() < 0.9 ? 2 : 4;
```

## 🧪 Testing the Implementation

### Manual Testing Scenarios

1. **Basic Movement**: Verify tiles slide correctly in all directions
2. **Merging Logic**: Test adjacent identical tiles combine properly
3. **Score Calculation**: Confirm points equal merged tile values
4. **Win Condition**: Reach 2048 and verify win state
5. **Game Over**: Fill board and verify no-moves detection
6. **Edge Cases**: Test moves with no changes, full rows, etc.

### Code Style

This project follows functional programming principles:

- Prefer pure functions over stateful operations
- Use immutable data structures
- Minimize side effects
- Compose complex behavior from simple functions

## 📝 Implementation Notes

### Functional Programming Benefits

1. **Predictability**: Pure functions always return the same output for the same input
2. **Testability**: Easy to unit test isolated functions
3. **Debugging**: No hidden state mutations to track
4. **Maintainability**: Clear data flow and minimal coupling

### Performance Considerations

- Immutable updates create new objects but enable easy change detection
- React's reconciliation efficiently handles board re-renders
- CSS Grid provides hardware-accelerated layout
- Event delegation minimizes DOM event listeners

---

**Built with ❤️ using React, Vite, and functional programming principles**
