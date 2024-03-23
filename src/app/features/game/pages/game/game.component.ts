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
import {PlayerStatus} from "../../@types/player-status";
import {SessionState} from "../../../auth/state/session.state";
import {ConfirmDialogModule} from "primeng/confirmdialog";

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
    ConfirmDialogModule,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {

  games: Signal<GameModel[] | undefined>;
  game: Signal<GameModel | undefined>;
  status: Signal<PlayerStatus | undefined>;
  userId: Signal<number | undefined>;

  gameResult: string | undefined;

  createGameOpen: boolean = false;

  constructor(
    private readonly store: Store<{ games: GamesState, session: SessionState }>,
    private readonly confirmationService: ConfirmationService,
    private readonly gameService:GameService,
  ) {
    this.games = toSignal(this.store.select(state => state.games.games));
    this.game = toSignal(this.store.select(state => state.games.currentGame));
    this.status = toSignal(this.store.select(state => state.games.status));
    this.userId = toSignal(this.store.select(state => state.session.id));

    effect(() => {
      const game = this.game();
      const userId = this.userId();
      if(!game) {
        return;
      }
      if(game.winner === 0) {
        this.gameResult = 'Draw';
      } else if((game.winner === 1 && game.redPlayerId === userId) || (game.winner === -1 && game.yellowPlayerId === userId)) {
        this.gameResult = 'Victory'
      }else if((game.winner === -1 && game.redPlayerId === userId) || (game.winner === 1 && game.yellowPlayerId === userId)) {
        this.gameResult = 'Defeat'
      } else {
        this.gameResult = undefined
      }
      if(this.gameResult) {
        this.confirmationService.confirm({
          key: 'GAME_COMPLETE',
          header: this.gameResult,
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
        key: 'LEAVE',
        header: 'This game is not complete!',
        message: 'Do you want to leave anyway ?',
        accept: async () => {
          await this.gameService.leave(game.id);
        }
      })
    }
  }

  async claimVictory() {
    const game: GameModel|undefined = this.game();
    if(!game) {
      return;
    }
    this.confirmationService.confirm({
      key: 'CLAIM_VICTORY',
      header: 'Your opponent might come soon!',
      message: 'Do you want to continue ?',
      accept: async () => {
        await this.gameService.claimVictory(game.id);
      }
    })
  }
}
