export interface  GameModel {
  id: number;
  redPlayerId: number|null;
  yellowPlayerId: number|null;
  redPlayerName: string|null;
  yellowPlayerName: string|null;
  versusAI: boolean;
  grid?: number[][];
}
