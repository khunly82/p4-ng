import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SessionState, sessionStart} from '../state/session.state';
import {tap} from 'rxjs';
import {Store} from '@ngrx/store';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly store: Store,
  ) {
  }


  login(form: any) {
    return this.httpClient.post<SessionState>(environment.apiUrl + '/login', form)
      .pipe(
        tap(session => this.store.dispatch(sessionStart({session})))
      );
  }

  register(form: any) {
    return this.httpClient.post<SessionState>(environment.apiUrl + '/register', form);
  }
}
