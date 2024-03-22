import {CommonModule} from '@angular/common';
import {Component, effect, Signal} from '@angular/core';
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
import {ConfirmationService} from "primeng/api";
import {GameService} from "../../services/game.service";
import {GameHeaderComponent} from "../../components/game-header/game-header.component";
import {GameStatus} from "../../types/game-status.type";

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
    GameHeaderComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {

  games: Signal<GameModel[] | undefined>;
  game: Signal<GameModel | undefined>;
  status: Signal<GameStatus | undefined>;

  createGameOpen: boolean = false;

  constructor(
    private readonly store: Store<{ games: GamesState }>,
    private readonly confirmationService: ConfirmationService,
    private readonly gameService:GameService,
  ) {
    this.games = toSignal(this.store.select(state => state.games.games));
    this.game = toSignal(this.store.select(state => state.games.currentGame));
    this.status = toSignal(this.store.select(state => state.games.status));

    effect(() => {
      const game: GameModel|undefined = this.game()
      if(!game) {
        return;
      }
      if(game.winner !== null) {
        this.confirmationService.confirm({
          header: 'This game is complete!',
          message: 'Do you want to leave this game ?',
          accept: async () => {
            await this.gameService.leave(game.id)
          }
        })
      }
    });
  }

  async leave() {
    const game: GameModel|undefined = this.game();
    if(!game) {
      return;
    }
    if(game.winner !== null) {
      await this.gameService.leave(game.id)
    } else {
      this.confirmationService.confirm({
        header: 'This game is not complete!',
        message: 'Do you want to leave anyway ?',
        accept: () => {
          this.gameService.leave(game.id);
        }
      })
    }
  }
}
