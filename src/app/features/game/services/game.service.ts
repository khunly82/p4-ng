import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {GameModel} from "../models/game.model";
import {Store} from "@ngrx/store";
import {Session} from "../../auth/state/session.state";
import {HubService, Subscriptions} from '../../../core/services/hub.service';
import {GameMoveModel} from '../models/game-move.model';
import {changeStatus, gameMove, leaveGame, loadGame, loadGames} from '../state/game.state';

@Injectable({
  providedIn: 'root'
})
export class GameService extends HubService {

  constructor(
    private readonly store: Store<{ session: Session }>
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
    await this.connection?.send('leave', {gameId})
  }

  protected override onReconnecting(error?: Error | undefined): void {
    this.store.dispatch(changeStatus({status: 'connecting'}));
  }

  protected override onReconnected(connectionId?: string | undefined): void {
    this.store.dispatch(changeStatus({status: 'connected'}));
  }

  protected override get subscriptions(): Subscriptions {
    return {
      currentGame: this.onCurrentGame,
      allGames: this.onAllGames,
      move: this.onMove,
      gameEnd: this.onGameEnd,
      opponentLeave: this.onOpponentLeave,
      leave: this.onLeave,
    }
  }

  private onSessionChange = async (session: Session) => {
    if (session.token) {
      await this.createConnection({
        accessTokenFactory: () => <string>session.token
      });
      this.store.dispatch(changeStatus({ status: 'connected' }));
    } else {
      await this.stopConnection();
      this.store.dispatch(loadGames({games: []}));
      this.store.dispatch(leaveGame());
      this.store.dispatch(changeStatus({ status: 'disconnected' }));
    }
  }

  private onCurrentGame = (game: GameModel) => {
    this.store.dispatch(loadGame({game}))
  }

  private onAllGames = (games: GameModel[]) => {
    this.store.dispatch(loadGames({games}))
  }

  private onMove = (move: GameMoveModel) => {
    this.store.dispatch(gameMove({move}))
  }

  private onOpponentLeave = () => {

  }

  private onLeave = () => {

  }

  private onGameEnd = () => {
    alert('La partie est finie')
  }
}
