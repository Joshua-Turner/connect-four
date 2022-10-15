export type GameCell = number | undefined;
export type GameRow = [
  GameCell,
  GameCell,
  GameCell,
  GameCell,
  GameCell,
  GameCell,
  GameCell
];
export type GameState = [GameRow, GameRow, GameRow, GameRow, GameRow, GameRow];
export type PlayerIndex = 0 | 1;

export default class C4 {
  public currentPlayer: PlayerIndex;
  public players: [string, string];
  public winner: PlayerIndex | undefined;
  public rowCount: number;
  public columnCount: number;
  public lastRowIndex: number;
  public lastColumnIndex: number;
  public gameState: GameState;

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

  changePlayer(): void {
    this.currentPlayer = this.currentPlayer ? 0 : 1;
  }

  createGameRow(): GameRow {
    const gameRow = [];
    for (let i = 0; i < this.columnCount; i++) {
      gameRow.push(undefined);
    }
    return gameRow as GameRow;
  }

  createGameState(): GameState {
    const gameState = [];
    for (let i = 0; i < this.rowCount; i++) {
      gameState.push(this.createGameRow());
    }
    return gameState as GameState;
  }

  getPlayer(playerIndex: PlayerIndex): string {
    return this.players[playerIndex];
  }

  getCellState(rowIndex: number, columnIndex: number): GameCell {
    return this.gameState[rowIndex][columnIndex];
  }

  setCellState(rowIndex: number, columnIndex: number, value: GameCell): void {
    this.gameState[rowIndex][columnIndex] = value;
  }

  checkRowWin(rowIndex: number): boolean {
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

  checkColumnWin(columnIndex: number): boolean {
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

  checkUpDiagonalWin(rowIndex: number, columnIndex: number): boolean {
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

  checkDownDiagonalWin(rowIndex: number, columnIndex: number): boolean {
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

  checkDiagonalWin(rowIndex: number, columnIndex: number): boolean {
    return (
      this.checkUpDiagonalWin(rowIndex, columnIndex) ||
      this.checkDownDiagonalWin(rowIndex, columnIndex)
    );
  }

  checkWin(rowIndex: number, columnIndex: number): void {
    if (
      this.checkRowWin(rowIndex) ||
      this.checkColumnWin(columnIndex) ||
      this.checkDiagonalWin(rowIndex, columnIndex)
    ) {
      this.setWinner();
      return;
    }
  }

  setWinner(): void {
    this.winner = this.currentPlayer;
    console.log(`Congratulations! '${this.getPlayer(this.winner)}' won!`);
  }

  takeTurn(columnIndex: number): void {
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

  reset(): void {
    this.winner = undefined;
    this.currentPlayer = 0;
    this.gameState = this.createGameState();
  }
}
