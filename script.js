let gameModule = (function () {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  let gameActive = true;
  let currentPlayer = "X";

  const gameStatusMessage = document.getElementById("game-status");

  const winningMessage = () => `${currentPlayer} wins!`;
  const tieMessage = "Tie Game!";
  const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
  gameStatusMessage.textContent = currentPlayerTurn();
  changeMessageColor("0000FF");

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function handleClick(e) {
    const clickedSquare = e.target;
    const clickedSquareNumber = parseInt(
      clickedSquare.getAttribute("data-key")
    );

    if (gameBoard[clickedSquareNumber] !== "" || !gameActive) {
      return;
    }

    handlePlay(clickedSquare, clickedSquareNumber);
    handleResult();
  }

  function handlePlay(clickedElement, squareIndex) {
    gameBoard[squareIndex] = currentPlayer;
    clickedElement.textContent = currentPlayer;
    if (currentPlayer === "X") {
      clickedElement.style.color = "#0000FF";
    } else {
      clickedElement.style.color = "#FF00FF";
    }
  }

  function handleResult() {
    let gameWon = false;
    for (let i = 0; i <= 7; i++) {
      let a = gameBoard[winningCombos[i][0]];
      let b = gameBoard[winningCombos[i][1]];
      let c = gameBoard[winningCombos[i][2]];

      if (!a || !b || !c) {
        continue;
      }
      if (a === b && b === c) {
        gameWon = true;
        break;
      }
    }
    if (gameWon) {
      gameStatusMessage.textContent = winningMessage();
      changeMessageColor("8B4513");
      gameActive = false;
      return;
    }
    let tieGame = !gameBoard.includes("");
    if (tieGame) {
      gameStatusMessage.textContent = tieMessage;
      changeMessageColor("8B4513");
      gameActive = false;
      return;
    }
    changePlayer();
  }

  function changeMessageColor(color) {
    gameStatusMessage.style.color = "#" + color;
  }
  function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameStatusMessage.textContent = currentPlayerTurn();
    if (currentPlayer === "X") {
      changeMessageColor("0000FF");
    } else {
      changeMessageColor("FF00FF");
    }
  }

  function restartGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    document
      .querySelectorAll(".board-square")
      .forEach((square) => (square.innerText = ""));
    gameActive = true;
    currentPlayer = "X";
    gameStatusMessage.textContent = currentPlayerTurn();
    changeMessageColor("0000FF");
  }

  return { handleClick, restartGame };
})();

document
  .querySelectorAll(".board-square")
  .forEach((square) =>
    square.addEventListener("click", gameModule.handleClick)
  );
document
  .getElementById("restart-game")
  .addEventListener("click", gameModule.restartGame);
