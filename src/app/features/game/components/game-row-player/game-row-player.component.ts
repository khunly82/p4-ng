import {Component, EventEmitter, Input, Output, Signal} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {Store} from "@ngrx/store";
import {SessionState} from "../../../auth/state/session.state";
import {toSignal} from "@angular/core/rxjs-interop";
import {StatusComponent} from "../../../../shared/components/status/status.component";
import {CommonModule} from "@angular/common";
import {PlayerModel} from "../../models/player.model";

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
  player!: PlayerModel;
  @Input()
  versusAI!: boolean;
  @Input()
  aiDepth!: number|null;
  @Input()
  opponentPlayerId!: number | null;

  @Output()
  onClick: EventEmitter<void> = new EventEmitter<void>();

  currentPlayerId: Signal<number | null | undefined>

  constructor(private readonly store: Store<{ session: SessionState }>) {
    this.currentPlayerId = toSignal(this.store.select(state => state.session.id))
  }

  click() {
    this.onClick.emit();
  }
}
