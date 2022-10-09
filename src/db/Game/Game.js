const mongoose = require("mongoose");
const { v4 } = require("uuid");

const gameSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => v4(),
  },
  player1Name: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        return typeof v === "string";
      },
      message: (props) => `${props.value} is not a valid name`,
    },
  },
  player2Name: {
    type: String,
    required: true,
    trim: true,
  },
  currentPlayerIndex: {
    type: Number,
    required: true,
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
    minLength: 0,
  },
});

const Game = mongoose.model("Game", gameSchema);

exports.Game = Game;
