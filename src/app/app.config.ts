import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ActionReducer, provideStore } from '@ngrx/store';
import { sessionReducer } from './store/session.state';
import { localStorageSync } from 'ngrx-store-localstorage';

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
    MessageService,
    provideStore({ 
      session: sessionReducer 
    }, {
      metaReducers: [localStorageSyncReducers]
    })
]
};
