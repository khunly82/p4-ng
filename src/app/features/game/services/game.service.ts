import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {GameModel} from "../models/game.model";
import {Store} from "@ngrx/store";
import {SessionState} from "../../auth/state/session.state";
import {HubService, Subscriptions} from '../../../core/services/hub.service';
import {changeStatus, loadGame, loadGames} from '../state/game.state';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class GameService extends HubService {

  constructor(
    private readonly store: Store<{ session: SessionState }>,
    private readonly messageService: MessageService,
  ) {
    super(environment.wsUrl + '/game');
    this.store.select(state => state.session)
      .subscribe(this.onSessionChange)
  }

  async createGame(game: GameModel) {
    await this.connection?.send('createGame', game);
  }

  async joinGame(gameId: number) {
    await this.connection?.send('joinGame', {gameId});
  }

  async play(gameId: number, x: number) {
    await this.connection?.send('play', {gameId, x});
  }

  async leave(gameId: number) {
    this.store.dispatch(loadGame({game: undefined}));
    await this.connection?.send('leaveGame', {gameId});
  }

  async claimVictory(gameId: number) {
    await this.connection?.send('claimVictory', {gameId});
  }

  protected override onReconnecting(): void {
    this.store.dispatch(changeStatus({status: 'connecting'}));
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Disconnected to server'
    })
  }

  protected override onReconnected(): void {
    this.store.dispatch(changeStatus({status: 'connected'}));
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Reconnected to server'
    })
  }

  protected override get subscriptions(): Subscriptions {
    return {
      currentGame: this.onCurrentGame,
      allGames: this.onAllGames,
      error: this.onError,
      info: this.onInfo,
    }
  }

  private onSessionChange = async (session: SessionState) => {
    if (session.token) {
      await this.createConnection({
        accessTokenFactory: () => <string>session.token
      });
      this.store.dispatch(changeStatus({ status: 'connected' }));
    } else {
      await this.stopConnection();
      this.store.dispatch(loadGames({games: []}));
      this.store.dispatch(loadGame({game: undefined}));
      this.store.dispatch(changeStatus({ status: 'disconnected' }));
    }
  }

  private onCurrentGame = (game: GameModel) => {
    this.store.dispatch(loadGame({game}))
  }

  private onAllGames = (games: GameModel[]) => {
    this.store.dispatch(loadGames({games}))
  }

  private onError = (message: string) => {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message
    })
  }

  private onInfo = (message: string) => {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: message
    })
  }
}
