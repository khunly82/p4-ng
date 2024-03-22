import {createAction, createReducer, on, props} from "@ngrx/store";

export interface SessionState {
  token?: string;
  username?: string;
  id?: number;
}

const initialState: SessionState = { }

export const sessionStart = createAction('session/start', props<{ session: SessionState }>());
export const sessionStop = createAction('session/stop');

export const sessionReducer = createReducer(
  initialState,
  on(sessionStart, (_, {session}) => {
    return session;
  }),
  on(sessionStop, () => {
    return initialState
  })
)
