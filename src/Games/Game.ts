import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { v4 } from "uuid";

@modelOptions({ schemaOptions: { versionKey: false } })
class GameClass {
  @prop({ default: () => v4() })
  public _id?: string;
  @prop({ default: "Red", trim: true })
  public player1Name?: string;
  @prop({ default: "Yellow", trim: true })
  public player2Name?: string;
  @prop({ default: 0, required: true })
  public currentPlayerIndex?: number;
  @prop({ default: null })
  public lastTurnColumnIndex?: number;
  @prop({ default: null, trim: true })
  public winner?: string;
  @prop({ default: "[]", required: true, trim: true })
  public gameState?: string;
}

const Game = getModelForClass(GameClass);

export default Game;
