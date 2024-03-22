import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideAnimations} from '@angular/platform-browser/animations';
import {ConfirmationService, MessageService} from 'primeng/api';

import {routes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {ActionReducer, provideStore} from '@ngrx/store';
import {sessionReducer} from './features/auth/state/session.state';
import {localStorageSync} from 'ngrx-store-localstorage';
import {gamesReducer} from './features/game/state/game.state';

export function localStorageSyncReducers(reducers: ActionReducer<any>) {
  return localStorageSync({
    keys: ['session'],
    rehydrate: true
  })(reducers)
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideStore({
      session: sessionReducer,
      games: gamesReducer,
    }, {
      metaReducers: [localStorageSyncReducers],
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      }
    }),
    MessageService,
    ConfirmationService,
  ]
};
