import {createAction, createReducer, on, props} from "@ngrx/store";
import {GameModel} from "../models/game.model";
import {GameMoveModel} from "../models/game-move.model";

export interface GamesState {
  games: GameModel[],
  currentGame: GameModel | null,
  status: 'connected'|'connecting'|'disconnected',
}

const initialState: GamesState = {
  games: [],
  currentGame: null,
  status: 'disconnected',
}

export const loadGames = createAction('games/load', props<{ games: GameModel[] }>());
export const loadGame = createAction('games/loadGame', props<{ game: GameModel | null }>());
export const leaveGame = createAction('games/leaveGame');
export const gameMove = createAction('games/gameMove', props<{ move: GameMoveModel }>());
export const changeStatus = createAction('games/status', props<{ status: 'connected'|'connecting'|'disconnected' }>());

export const gamesReducer = createReducer(
  initialState,
  on(loadGames, (state, {games}) => {
    return {...state, games};
  }),
  on(loadGame, (state, {game}) => {
    return {...state, currentGame: game}
  }),
  on(gameMove, (state, {move}) => {
    if (state.currentGame?.grid) {
      state.currentGame.grid[move.x][move.y] = move.color;
    }
    return {...state};
  }),
  on(changeStatus, (state, {status}) => {
    return {...state, status}
  }),
)
