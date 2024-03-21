import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Session } from '../store/session.state';
import { map, tap } from 'rxjs';

export const isLoggedGuard: CanActivateFn = (route, state) => {

  const store = inject(Store<{ session: Session }>);
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
