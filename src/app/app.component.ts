import {Component, Signal} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {ToastModule} from 'primeng/toast';
import {Store} from "@ngrx/store";
import {SessionState, sessionStop} from "./features/auth/state/session.state";
import {toSignal} from "@angular/core/rxjs-interop";
import {StatusComponent} from "./shared/components/status/status.component";
import {GamesState} from "./features/game/state/game.state";
import {TieredMenuModule} from "primeng/tieredmenu";
import {MenuItem} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {PlayerStatus} from "./features/game/@types/player-status";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ToastModule,
    StatusComponent,
    TieredMenuModule,
    ButtonModule,
    ConfirmDialogModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  session: Signal<SessionState|undefined>
  status: Signal<PlayerStatus|undefined>

  userMenuItems: MenuItem[] = [
    { separator: true },
    { icon: 'pi pi-power-off', label: 'Logout', command: () => this.logout() }
  ];

  constructor(
    private store: Store<{session: SessionState, games: GamesState}>,
    private router: Router,
  ) {
    this.session = toSignal(this.store.select(state => state.session));
    this.status = toSignal(this.store.select(state => state.games.status));
  }

  async logout() {
    this.store.dispatch(sessionStop());
    await this.router.navigate(['/login']);
  }
}
