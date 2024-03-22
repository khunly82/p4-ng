import {Component, EventEmitter, Input, Output, Signal} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {Store} from "@ngrx/store";
import {Session} from "../../../../features/auth/state/session.state";
import {toSignal} from "@angular/core/rxjs-interop";
import {StatusComponent} from "../../../../shared/components/status/status.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-game-row-player, [appGameRowPlayer]',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    StatusComponent,
  ],
  templateUrl: './game-row-player.component.html',
  styleUrl: './game-row-player.component.scss'
})
export class GameRowPlayerComponent {
  @Input()
  player!: { id: number | null, name: string | null, status?: 'connected'|'disconnected' };
  @Input()
  versusAI!: boolean;
  @Input()
  opponentPlayerId!: number | null;

  @Output()
  onClick: EventEmitter<void> = new EventEmitter<void>();

  currentPlayerId: Signal<number | null | undefined>

  constructor(private readonly store: Store<{ session: Session }>) {
    this.currentPlayerId = toSignal(this.store.select(state => state.session.id))
  }

  click() {
    this.onClick.emit();
  }
}
