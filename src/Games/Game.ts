import {
  getModelForClass,
  modelOptions,
  mongoose,
  prop,
  Severity,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { v4 } from "uuid";

@modelOptions({ schemaOptions: { versionKey: false } })
export class Game extends TimeStamps {
  @prop({ default: () => v4() }) public _id!: string;
  @prop({ default: "Red", trim: true })
  public player1Name!: string;
  @prop({ default: "Yellow", trim: true })
  public player2Name!: string;
  @prop({ default: 0, required: true })
  public currentPlayerIndex!: number;
  @prop({
    default: null,
    allowMixed: Severity.ALLOW,
    type: () => mongoose.Schema.Types.Mixed,
  })
  public lastTurnColumnIndex?: number | undefined;
  @prop({
    default: null,
    allowMixed: Severity.ALLOW,
    type: () => mongoose.Schema.Types.Mixed,
  })
  public winner!: number | undefined;
  @prop({ default: "[]", required: true, trim: true })
  public gameState!: string;
}

export const GameModel = getModelForClass(Game);
