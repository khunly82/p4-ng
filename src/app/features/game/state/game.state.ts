import {createAction, createReducer, on, props} from "@ngrx/store";
import {GameModel} from "../models/game.model";
import {GameMoveModel} from "../models/game-move.model";
import {GameStatus} from "../types/game-status.type";

export interface GamesState {
  games: GameModel[],
  currentGame?: GameModel,
  status?: GameStatus,
}

const initialState: GamesState = {
  games: [],
  status: 'disconnected',
}

export const loadGames = createAction('games/load', props<{ games: GameModel[] }>());
export const loadGame = createAction('games/loadGame', props<{ game: GameModel|undefined }>());
export const opponentLeave = createAction('games/opponentLeave', props<{ opponentId: number }>());
export const gameMove = createAction('games/gameMove', props<{ move: GameMoveModel }>());
export const changeStatus = createAction('games/status', props<{ status: GameStatus }>());

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
    return {...state, currentGame: {...<GameModel>state.currentGame}};
  }),
  on(opponentLeave, (state, {opponentId}) => {
    if(state.currentGame) {
      if(state.currentGame.redPlayerId === opponentId) {
        state.currentGame.redPlayerId = null;
        state.currentGame.redPlayerName = null;
        state.currentGame.redPlayerConnected = null;
      }
      if(state.currentGame.yellowPlayerId === opponentId) {
        state.currentGame.yellowPlayerId = null;
        state.currentGame.yellowPlayerName = null;
        state.currentGame.yellowPlayerConnected = null;
      }
    }
    return {...state, currentGame: {...<GameModel>state.currentGame}};
  }),
  on(changeStatus, (state, {status}) => {
    return {...state, status}
  }),
)
