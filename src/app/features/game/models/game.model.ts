export interface  GameModel {
  id: number;
  redPlayerId: number|null;
  yellowPlayerId: number|null;
  redPlayerName: string|null;
  yellowPlayerName: string|null;
  redPlayerConnected: boolean|null;
  yellowPlayerConnected: boolean|null;
  versusAI: boolean;
  grid?: number[][];
  winner: number|null;
}
