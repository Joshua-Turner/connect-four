const mongoose = require("mongoose");
const { v4 } = require("uuid");

const gameSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => v4(),
  },
  player1Name: {
    type: String,
    trim: true,
    default: "Red",
  },
  player2Name: {
    type: String,
    trim: true,
    default: "Yellow",
  },
  currentPlayerIndex: {
    type: Number,
    required: true,
    default: 0,
  },
  lastTurnColumnIndex: {
    type: Number,
  },
  winner: {
    type: String,
    trim: true,
  },
  gameState: {
    type: String,
    required: true,
    trim: true,
    default: "[]",
  },
});

const Game = mongoose.model("Game", gameSchema);

exports.Game = Game;
