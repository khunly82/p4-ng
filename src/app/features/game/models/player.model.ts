import {PlayerStatus} from "../@types/player-status";

export interface PlayerModel {
  id: number|null;
  name: string|null;
  status?: PlayerStatus|null;
}
