import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SessionState } from '../../features/auth/state/session.state';
import { map, tap } from 'rxjs';

export const isLoggedGuard: CanActivateFn = (route, state) => {

  const store = inject(Store<{ session: SessionState }>);
  const router = inject(Router);

  return store.select(state => state.session)
    .pipe(
      map(s => !!s.token),
      tap(isLogged => {
        if(!isLogged) {
          router.navigate(['login']);
        }
      }));

};
