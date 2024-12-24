const puzzle = document.getElementById("puzzle");
const shuffleButton = document.getElementById("shuffle-btn");
const status = document.getElementById("status");

const gridSize = 4;
let tiles = [];

// Initialize the puzzle
function initPuzzle() {
  tiles = [...Array(gridSize * gridSize).keys()];
  renderPuzzle();
}

// Shuffle the tiles
function shufflePuzzle() {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  renderPuzzle();
  status.textContent = '';
}

// Render the puzzle
function renderPuzzle() {
  puzzle.innerHTML = '';
  tiles.forEach((tile, index) => {
    const tileElement = document.createElement("div");
    tileElement.className = tile === 0 ? "tile empty" : "tile";
    tileElement.textContent = tile === 0 ? "" : tile;
    tileElement.addEventListener("click", () => moveTile(index));
    puzzle.appendChild(tileElement);
  });
}

// Move the tile
function moveTile(index) {
  const emptyIndex = tiles.indexOf(0);
  const validMoves = [
    emptyIndex - 1, // left
    emptyIndex + 1, // right
    emptyIndex - gridSize, // up
    emptyIndex + gridSize, // down
  ];

  if (validMoves.includes(index) && isAdjacent(index, emptyIndex)) {
    [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
    renderPuzzle();
    checkWin();
  }
}

// Check if the move is adjacent
function isAdjacent(index, emptyIndex) {
  const row = Math.floor(index / gridSize);
  const emptyRow = Math.floor(emptyIndex / gridSize);
  const col = index % gridSize;
  const emptyCol = emptyIndex % gridSize;

  return (
    (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
    (col === emptyCol && Math.abs(row - emptyRow) === 1)
  );
}

// Check if the puzzle is solved
function checkWin() {
  if (tiles.every((tile, index) => tile === index)) {
    status.textContent = "Congratulations! You solved the puzzle!";
  }
}

// Event listener for shuffle button
shuffleButton.addEventListener("click", shufflePuzzle);

// Initialize the game
initPuzzle();

