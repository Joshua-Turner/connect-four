import C4, { PlayerIndex } from "./connectFour";

const ROW_COUNT = 6;
const COLUMN_COUNT = 7;
const DEFAULT_PLAYER_1_NAME = "RED";
const DEFAULT_PLAYER_2_NAME = "YELLOW";
const PLAYER_1_INDEX = 0;
const PLAYER_2_INDEX = 1;
let game: C4;
beforeEach(() => {
  game = new C4();
});

const setRowWin = (playerIndex: PlayerIndex, rowIndex = 0): void => {
  game.currentPlayer = playerIndex;
  game.setCellState(rowIndex, 0, playerIndex);
  game.setCellState(rowIndex, 1, playerIndex);
  game.setCellState(rowIndex, 2, playerIndex);
  game.setCellState(rowIndex, 3, playerIndex);
};

const setColumnWin = (playerIndex: PlayerIndex, columnIndex = 0): void => {
  game.currentPlayer = playerIndex;
  game.setCellState(0, columnIndex, playerIndex);
  game.setCellState(1, columnIndex, playerIndex);
  game.setCellState(2, columnIndex, playerIndex);
  game.setCellState(3, columnIndex, playerIndex);
};

const setDiagonalUpWin = (playerIndex: PlayerIndex): void => {
  game.currentPlayer = playerIndex;
  game.setCellState(0, 0, playerIndex);
  game.setCellState(1, 1, playerIndex);
  game.setCellState(2, 2, playerIndex);
  game.setCellState(3, 3, playerIndex);
};

const setDiagonalDownWin = (playerIndex: PlayerIndex): void => {
  game.currentPlayer = playerIndex;
  game.setCellState(5, 0, playerIndex);
  game.setCellState(4, 1, playerIndex);
  game.setCellState(3, 2, playerIndex);
  game.setCellState(2, 3, playerIndex);
};

describe("Construction", () => {
  it("C4 constructs with default player names", () => {
    expect(game.players).toEqual([
      DEFAULT_PLAYER_1_NAME,
      DEFAULT_PLAYER_2_NAME,
    ]);
  });

  it("Should construct with currentPlayer set to 0", () => {
    expect(game.currentPlayer).toBe(PLAYER_1_INDEX);
  });

  it("Should set custom player names", () => {
    const player1 = "P1";
    const player2 = "P2";
    expect(new C4(player1, player2).players).toEqual([player1, player2]);
  });
});

describe("changePlayer", () => {
  it("Should toggle currentPlayer between 0 and 1", () => {
    game.changePlayer();
    expect(game.currentPlayer).toBe(PLAYER_2_INDEX);
    game.changePlayer();
    expect(game.currentPlayer).toBe(PLAYER_1_INDEX);
  });
});

describe("createGameRow", () => {
  it("Should produce an array with 7 undefined values", () => {
    const gameRow = game.createGameRow();
    expect(gameRow.length).toBe(COLUMN_COUNT);
    for (const rowValue of gameRow) {
      expect(rowValue).toBeUndefined();
    }
  });
});

describe("createGameState", () => {
  it("Should produce an array with 6 game rows each with 7 undefined values", () => {
    const expectedGameRow = game.createGameRow();
    const gameState = game.createGameState();
    expect(gameState.length).toBe(ROW_COUNT);
    for (const row of gameState) {
      expect(row).toEqual(expectedGameRow);
    }
  });
});

describe("getPlayer", () => {
  it("Should return player name", () => {
    expect(game.getPlayer(PLAYER_1_INDEX)).toBe(DEFAULT_PLAYER_1_NAME);
    expect(game.getPlayer(PLAYER_2_INDEX)).toBe(DEFAULT_PLAYER_2_NAME);
  });
});

describe("getCellState", () => {
  it("Should return the value in the given row and column", () => {
    expect(game.getCellState(0, 0)).toBeUndefined();
    game.gameState[0][0] = 1;
    expect(game.getCellState(0, 0)).toBe(1);
  });
});

describe("setCellState", () => {
  it("Should set cell value to passed player index or undefined", () => {
    const rowIndex = 2;
    const columnIndex = 4;
    expect(game.getCellState(rowIndex, columnIndex)).toBeUndefined();
    game.setCellState(rowIndex, columnIndex, 0);
    expect(game.getCellState(rowIndex, columnIndex)).toBe(0);
    game.setCellState(rowIndex, columnIndex, 1);
    expect(game.getCellState(rowIndex, columnIndex)).toBe(1);
    game.setCellState(rowIndex, columnIndex, undefined);
    expect(game.getCellState(rowIndex, columnIndex)).toBeUndefined();
  });
});

describe("takeTurn", () => {
  it("Should set next available cell in given column to current player index", () => {
    const columnIndex = 4;
    let rowIndex = 0;
    expect(game.getCellState(rowIndex, columnIndex)).toBeUndefined();
    game.takeTurn(columnIndex);
    expect(game.getCellState(rowIndex, columnIndex)).toBe(PLAYER_1_INDEX);
    rowIndex++;
    game.takeTurn(columnIndex);
    expect(game.getCellState(rowIndex, columnIndex)).toBe(PLAYER_2_INDEX);
  });

  it("Should change player after taking a turn", () => {
    expect(game.currentPlayer).toBe(0);
    game.takeTurn(0);
    expect(game.currentPlayer).toBe(1);
    game.takeTurn(0);
    expect(game.currentPlayer).toBe(0);
  });

  it("Should not change player or fill highest cell if the column is full", () => {
    const columnIndex = 0;
    for (let i = 0; i < ROW_COUNT; i++) {
      game.takeTurn(columnIndex);
    }
    expect(game.currentPlayer).toBe(0);
    game.takeTurn(columnIndex);
    expect(game.currentPlayer).toBe(0);
    expect(game.getCellState(ROW_COUNT - 1, columnIndex)).not.toBeUndefined();
  });

  it("Should log the winner and do nothing if a winner is already set", () => {
    game.winner = PLAYER_1_INDEX;
    const mockConsoleLog = jest.spyOn(console, "log").mockImplementation();
    expect(game.currentPlayer).toBe(PLAYER_1_INDEX);
    game.takeTurn(0);
    expect(game.currentPlayer).toBe(PLAYER_1_INDEX);
    game.winner = PLAYER_2_INDEX;
    game.takeTurn(0);
    expect(game.currentPlayer).toBe(PLAYER_1_INDEX);
    expect(mockConsoleLog).toHaveBeenCalledTimes(2);
    expect(mockConsoleLog).toHaveBeenNthCalledWith(
      1,
      `Game Over! '${DEFAULT_PLAYER_1_NAME}' won!`
    );
    expect(mockConsoleLog).toHaveBeenNthCalledWith(
      2,
      `Game Over! '${DEFAULT_PLAYER_2_NAME}' won!`
    );
    mockConsoleLog.mockRestore();
  });

  it("Should log the winner if the turn results in a win", () => {
    const mockConsoleLog = jest.spyOn(console, "log").mockImplementation();
    game.setCellState(0, 0, PLAYER_1_INDEX);
    game.setCellState(0, 1, PLAYER_1_INDEX);
    game.setCellState(0, 2, PLAYER_1_INDEX);
    game.takeTurn(3);
    expect(mockConsoleLog).toHaveBeenCalledTimes(1);
    expect(mockConsoleLog).toHaveBeenNthCalledWith(
      1,
      `Congratulations! '${DEFAULT_PLAYER_1_NAME}' won!`
    );
    mockConsoleLog.mockRestore();
  });
});

describe("setWinner", () => {
  it("Should set winner to current player and log", () => {
    const mockConsoleLog = jest.spyOn(console, "log").mockImplementation();
    game.setWinner();
    game.changePlayer();
    game.setWinner();
    expect(mockConsoleLog).toHaveBeenCalledTimes(2);
    expect(mockConsoleLog).toHaveBeenNthCalledWith(
      1,
      `Congratulations! '${DEFAULT_PLAYER_1_NAME}' won!`
    );
    expect(mockConsoleLog).toHaveBeenNthCalledWith(
      2,
      `Congratulations! '${DEFAULT_PLAYER_2_NAME}' won!`
    );
    mockConsoleLog.mockRestore();
  });
});

describe("checkRowWin", () => {
  it("Should return false if 4 cells do not match in the given row", () => {
    expect(game.checkRowWin(0)).toBe(false);
    game.takeTurn(0);
    game.takeTurn(1);
    game.takeTurn(2);
    game.takeTurn(3);
    expect(game.checkRowWin(0)).toBe(false);
  });

  it("Should return true if 4 cells match in the given row", () => {
    const winningRowIndex = 2;
    setRowWin(PLAYER_1_INDEX, winningRowIndex);
    expect(game.checkRowWin(winningRowIndex)).toBe(true);
  });
});

describe("checkColumnWin", () => {
  it("Should return false if 4 cells do not match in the given row", () => {
    expect(game.checkColumnWin(0)).toBe(false);
    game.takeTurn(0);
    game.takeTurn(0);
    game.takeTurn(0);
    game.takeTurn(0);
    expect(game.checkColumnWin(0)).toBe(false);
  });

  it("Should return true if 4 cells match in the given row", () => {
    const winningColumnIndex = 2;
    setColumnWin(PLAYER_1_INDEX, winningColumnIndex);
    expect(game.checkColumnWin(winningColumnIndex)).toBe(true);
  });
});

describe("checkUpDiagonalWin", () => {
  it("Should return false if 4 cells do not match diagonally upwards from left to right using given cell", () => {
    expect(game.checkUpDiagonalWin(0, 3)).toBe(false);
  });

  it("Should return true if 4 cells match diagonally upwards from left to right using given cell", () => {
    setDiagonalUpWin(PLAYER_1_INDEX);
    expect(game.checkUpDiagonalWin(0, 0)).toBe(true);
    expect(game.checkUpDiagonalWin(3, 3)).toBe(true);
    expect(game.checkUpDiagonalWin(5, 5)).toBe(true);
  });
});

describe("checkDownDiagonalWin", () => {
  it("Should return false if 4 cells do not match diagonally downwards from left to right using given cell", () => {
    expect(game.checkDownDiagonalWin(0, 3)).toBe(false);
  });

  it("Should return true if 4 cells match diagonally downwards from left to right using given cell", () => {
    setDiagonalDownWin(PLAYER_2_INDEX);
    expect(game.checkDownDiagonalWin(5, 0)).toBe(true);
    expect(game.checkDownDiagonalWin(2, 3)).toBe(true);
    expect(game.checkDownDiagonalWin(4, 1)).toBe(true);
  });
});

describe("checkDiagonalWin", () => {
  it("Should return false if 4 cells do not match in any diagonal direction from the given cell", () => {
    expect(game.checkDiagonalWin(0, 3)).toBe(false);
    expect(game.checkDiagonalWin(5, 3)).toBe(false);
  });

  it("Should return true if 4 cells match diagonally", () => {
    setDiagonalUpWin(PLAYER_1_INDEX);
    expect(game.checkDiagonalWin(0, 0)).toBe(true);
    expect(game.checkDiagonalWin(3, 3)).toBe(true);
    game.reset();
    setDiagonalDownWin(PLAYER_2_INDEX);
    expect(game.checkDiagonalWin(5, 0)).toBe(true);
    expect(game.checkDiagonalWin(4, 1)).toBe(true);
    expect(game.checkDiagonalWin(2, 3)).toBe(true);
  });
});

describe("checkWin", () => {
  it("Should not set winner if 4 cells do not match in any direction from the given cell", () => {
    expect(game.checkDiagonalWin(0, 0)).toBe(false);
    expect(game.checkDiagonalWin(5, 3)).toBe(false);
  });

  it("Should set winner and log if 4 cells match in any direction from the given cell", () => {
    const mockConsoleLog = jest.spyOn(console, "log").mockImplementation();
    setRowWin(PLAYER_1_INDEX);
    game.checkWin(0, 0);
    expect(game.winner).toBe(PLAYER_1_INDEX);
    game.reset();
    setColumnWin(PLAYER_2_INDEX);
    game.checkWin(0, 0);
    expect(game.winner).toBe(PLAYER_2_INDEX);
    game.reset();
    setDiagonalUpWin(PLAYER_1_INDEX);
    game.checkWin(0, 0);
    expect(game.winner).toBe(PLAYER_1_INDEX);
    game.reset();
    setDiagonalDownWin(PLAYER_2_INDEX);
    game.checkWin(5, 0);
    expect(game.winner).toBe(PLAYER_2_INDEX);
    game.reset();

    expect(mockConsoleLog).toHaveBeenCalledTimes(4);
    expect(mockConsoleLog).toHaveBeenNthCalledWith(
      1,
      `Congratulations! '${DEFAULT_PLAYER_1_NAME}' won!`
    );
    expect(mockConsoleLog).toHaveBeenNthCalledWith(
      2,
      `Congratulations! '${DEFAULT_PLAYER_2_NAME}' won!`
    );
    expect(mockConsoleLog).toHaveBeenNthCalledWith(
      3,
      `Congratulations! '${DEFAULT_PLAYER_1_NAME}' won!`
    );
    expect(mockConsoleLog).toHaveBeenNthCalledWith(
      4,
      `Congratulations! '${DEFAULT_PLAYER_2_NAME}' won!`
    );
    mockConsoleLog.mockRestore();
  });
});

describe("reset", () => {
  it("Should reset winner, currentPlayer and gameState to the defaults", () => {
    setRowWin(PLAYER_2_INDEX);
    game.reset();
    expect(game.winner).toBeUndefined();
    expect(game.currentPlayer).toBe(PLAYER_1_INDEX);
    expect(game.gameState).toEqual(game.createGameState());
  });
});
