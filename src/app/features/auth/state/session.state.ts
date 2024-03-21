import {createAction, createReducer, on, props} from "@ngrx/store";

export interface Session {
  token: string | null;
  username: string | null;
  id: number | null;
}

const initialState: Session = {
  token: null,
  username: null,
  id: null,
}

export const sessionStart = createAction('session/start', props<{ session: Session }>());
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
