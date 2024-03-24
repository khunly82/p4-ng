import {PlayerStatus} from "../@types/player-status";

export interface  GameModel {
  id: number;
  redPlayerId: number|null;
  yellowPlayerId: number|null;
  redPlayerName: string|null;
  yellowPlayerName: string|null;
  redPlayerStatus: PlayerStatus|null;
  yellowPlayerStatus: PlayerStatus|null;
  versusAI: boolean;
  aiDepth: number|null;
  grid?: number[][];
  winner: number|null;
}
