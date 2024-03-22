import {GameStatus} from "../types/game-status.type";

export interface PlayerModel {
  id: number|null;
  name: string|null;
  status?: GameStatus|null;
}
