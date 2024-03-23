import {createAction, createReducer, on, props} from "@ngrx/store";
import {GameModel} from "../models/game.model";
import {PlayerStatus} from "../@types/player-status";

export interface GamesState {
  games: GameModel[],
  currentGame?: GameModel,
  status?: PlayerStatus,
}

const initialState: GamesState = {
  games: [],
  status: 'disconnected',
}

export const loadGames = createAction('games/load', props<{ games: GameModel[] }>());
export const loadGame = createAction('games/loadGame', props<{ game: GameModel|undefined }>());
export const changeStatus = createAction('games/status', props<{ status: PlayerStatus }>());

export const gamesReducer = createReducer(
  initialState,
  on(loadGames, (state, {games}) => {
    return {...state, games};
  }),
  on(loadGame, (state, {game}) => {
    return {...state, currentGame: game}
  }),
  on(changeStatus, (state, {status}) => {
    return {...state, status}
  }),
)
