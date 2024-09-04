// Convert to n x n Tic Tac Toe based on user input

let board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let p1turn = true;
let fillCount = 0;
let onGoing = true;

const boardContainer = document.getElementById("board");
const messageContainer = document.getElementById("message");
const resetBtn = document.getElementById("reset");

function initialiseGameBoard() {
  let h = "";
  let rows = board.length;
  let cols = board[0].length;
  let light = true;

  for (let i = 0; i < rows; i++) {
    h += `<div class="row">`;
    for (let j = 0; j < cols; j++) {
      h += `<div id="${i}-${j}" class="box ${light ? "light" : "dark"}"></div>`;
      light = !light;
    }
    h += "</div>";
  }
  boardContainer.innerHTML = h;

  boardContainer.addEventListener("click", (e) => {
    if (onGoing) {
      const [row, col] = e.target.id.split("-");
      if (board[row][col] === 0) {
        markBox(row, col, e.target);
      }
    }
  });
}
initialiseGameBoard();

function markBox(row, col, e) {
  board[row][col] = p1turn ? 1 : -1;
  e.innerHTML = p1turn ? "O" : "X";
  p1turn = !p1turn;
  fillCount++;
  checkWin();

  if (fillCount == 9 && !checkWin()) {
    result(0);
  }
}

function result(res) {
  onGoing = false;
  messageContainer.innerHTML =
    res == 1 ? "Player 1 won!" : res == -1 ? "Player 2 won!" : "It's a draw!";
}

function checkWin() {
  for (i = 0; i < 3; i++) {
    if (
      board[i][0] == board[i][1] &&
      board[i][1] == board[i][2] &&
      board[i][0] !== 0
    ) {
      result(board[i][0]);
      return true;
    }
  }

  for (i = 0; i < 3; i++) {
    if (
      board[0][i] == board[1][i] &&
      board[1][i] == board[2][i] &&
      board[0][i] !== 0
    ) {
      result(board[0][i]);
      return true;
    }
  }

  if (
    board[0][0] == board[1][1] &&
    board[1][1] == board[2][2] &&
    board[0][0] !== 0
  ) {
    result(board[0][0]);
    return true;
  }

  if (
    board[0][2] == board[1][1] &&
    board[1][1] == board[2][0] &&
    board[0][2] !== 0
  ) {
    result(board[0][2]);
    return true;
  }
  return false;
}

resetBtn.addEventListener("click", resetBoard);

function resetBoard() {
  board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  boardContainer.innerHTML = "";
  initialiseGameBoard();
  p1turn = true;
  messageContainer.innerHTML = "";
  fillCount = 0;
  onGoing = true;
}

// EVENT BUBBLING ??
