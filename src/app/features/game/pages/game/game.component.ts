import {CommonModule} from '@angular/common';
import {Component, Signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {CheckboxModule} from "primeng/checkbox";
import {RadioButtonModule} from "primeng/radiobutton";
import {TableModule} from "primeng/table";
import {Store} from "@ngrx/store";
import {GameRowComponent} from "../../components/game-row/game-row.component";
import {CreateGameFormComponent} from "../../components/create-game-form/create-game-form.component";
import {GridComponent} from "../../components/grid/grid.component";
import {GameModel} from "../../models/game.model";
import {GamesState} from "../../state/game.state";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    CheckboxModule,
    RadioButtonModule,
    TableModule,
    GameRowComponent,
    CreateGameFormComponent,
    GridComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  games: Signal<GameModel[] | undefined>;
  game: Signal<GameModel | null | undefined>;

  createGameOpen: boolean = false;

  constructor(
    private readonly store: Store<{ games: GamesState }>
  ) {
    this.games = toSignal(this.store.select(state => state.games.games));
    this.game = toSignal(this.store.select(state => state.games.currentGame));
  }
}
