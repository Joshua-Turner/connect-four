class C4 {
  constructor(player1 = "RED", player2 = "YELLOW") {
    this.currentPlayer = 0;
    this.players = [player1, player2];
    this.winner = undefined;
    this.rowCount = 6;
    this.columnCount = 7;
    this.lastRowIndex = this.rowCount - 1;
    this.lastColumnIndex = this.columnCount - 1;
    this.gameState = this.createGameState();
  }

  changePlayer() {
    this.currentPlayer = this.currentPlayer ? 0 : 1;
  }

  createGameRow() {
    const gameRow = [];
    for (let i = 0; i < this.columnCount; i++) {
      gameRow.push(undefined);
    }
    return gameRow;
  }

  createGameState() {
    const gameState = [];
    for (let i = 0; i < this.rowCount; i++) {
      gameState.push(this.createGameRow());
    }
    return gameState;
  }

  getPlayer(playerIndex) {
    if (typeof playerIndex !== "number" || ![0, 1].includes(playerIndex)) {
      throw new TypeError("playerIndex must be a number equal to 0 or 1");
    }
    return this.players[playerIndex];
  }

  getCellState(rowIndex, columnIndex) {
    return this.gameState[rowIndex][columnIndex];
  }

  setCellState(rowIndex, columnIndex, value) {
    this.gameState[rowIndex][columnIndex] = value;
  }

  checkRowWin(rowIndex) {
    let currentCellState = undefined;
    let matchCount = 0;
    for (let columnIndex = 0; columnIndex < this.columnCount; columnIndex++) {
      const cellState = this.getCellState(rowIndex, columnIndex);
      if (cellState === undefined) {
        matchCount = 0;
        currentCellState = cellState;
      } else if (currentCellState === cellState) {
        matchCount++;
        if (matchCount === 4) {
          return true;
        }
      } else {
        matchCount = 1;
        currentCellState = cellState;
      }
    }
    return false;
  }

  checkColumnWin(columnIndex) {
    let matchCount = 0;
    let currentCellState = undefined;
    for (let rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
      const cellState = this.getCellState(rowIndex, columnIndex);
      if (cellState === undefined) {
        matchCount = 0;
        currentCellState = undefined;
      } else if (currentCellState === cellState) {
        matchCount++;
        if (matchCount === 4) {
          return true;
        }
      } else {
        matchCount = 1;
        currentCellState = cellState;
      }
    }
    return false;
  }

  checkUpDiagonalWin(rowIndex, columnIndex) {
    const startCell = [rowIndex, columnIndex];
    while (startCell[0] - 1 >= 0 && startCell[1] - 1 >= 0) {
      startCell[0]--;
      startCell[1]--;
    }

    let matches = 0;
    let currentCellState = undefined;
    while (
      startCell[0] <= this.lastRowIndex &&
      startCell[1] <= this.lastColumnIndex
    ) {
      const cellState = this.getCellState(startCell[0], startCell[1]);
      if (cellState === undefined) {
        matches = 0;
        currentCellState = undefined;
      } else if (cellState === currentCellState) {
        matches++;
        if (matches === 4) {
          return true;
        }
      } else {
        matches = 1;
        currentCellState = cellState;
      }
      startCell[0]++;
      startCell[1]++;
    }
    return false;
  }

  checkDownDiagonalWin(rowIndex, columnIndex) {
    let matches = 0;
    let currentCellState = undefined;
    const startCell = [rowIndex, columnIndex];
    while (startCell[0] - 1 >= 0 && startCell[1] + 1 <= this.lastColumnIndex) {
      startCell[0]--;
      startCell[1]++;
    }

    while (startCell[0] <= this.lastRowIndex && startCell[1] >= 0) {
      const cellState = this.getCellState(startCell[0], startCell[1]);
      if (cellState === undefined) {
        matches = 0;
        currentCellState = undefined;
      } else if (cellState === currentCellState) {
        matches++;
        if (matches === 4) {
          return true;
        }
      } else {
        matches = 1;
        currentCellState = cellState;
      }
      startCell[0]++;
      startCell[1]--;
    }
    return false;
  }

  checkDiagonalWin(rowIndex, columnIndex) {
    return (
      this.checkUpDiagonalWin(rowIndex, columnIndex) ||
      this.checkDownDiagonalWin(rowIndex, columnIndex)
    );
  }

  checkWin(rowIndex, columnIndex) {
    if (
      this.checkRowWin(rowIndex) ||
      this.checkColumnWin(columnIndex) ||
      this.checkDiagonalWin(rowIndex, columnIndex)
    ) {
      this.setWinner();
      return;
    }
  }

  setWinner() {
    this.winner = this.currentPlayer;
    console.log(`Congratulations! '${this.getPlayer(this.winner)}' won!`);
  }

  takeTurn(columnIndex) {
    if (this.winner !== undefined) {
      console.log(`Game Over! '${this.getPlayer(this.winner)}' won!`);
      return;
    }
    for (let rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
      if (this.getCellState(rowIndex, columnIndex) === undefined) {
        this.setCellState(rowIndex, columnIndex, this.currentPlayer);
        this.checkWin(rowIndex, columnIndex);
        if (this.winner === undefined) {
          this.changePlayer();
        }
        return;
      }
    }
  }

  reset() {
    this.winner = undefined;
    this.currentPlayer = 0;
    this.gameState = this.createGameState();
  }
}

module.exports = C4;
