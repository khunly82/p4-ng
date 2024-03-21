import {Injectable, signal, WritableSignal} from '@angular/core';
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {environment} from "../../environments/environment";
import {GameModel} from "../models/game.model";
import {Store} from "@ngrx/store";
import {Session} from "../store/session.state";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _currentGame$: WritableSignal<GameModel|null> = signal<GameModel|null>(null);
  public get currentGame() {
    return this._currentGame$.asReadonly();
  }

  private _allGames$: WritableSignal<GameModel[]> = signal<GameModel[]>([]);
  public get allGames() {
    return this._allGames$.asReadonly();
  }

  connection: HubConnection|null = null;
  constructor(
    private readonly store: Store<{ session: Session }>
  ) {
    this.store.select(state => state.session).subscribe(s => {
      if(s.token) {
        this.connection = new HubConnectionBuilder()
          .withUrl(environment.wsUrl + '/game', { accessTokenFactory: () => <string>s.token })
          .build();
        this.connection.start().then(() => {
          this.connection?.on('currentGame', this.onCurrentGame);
          this.connection?.on('allGames', (games: GameModel[]) => {
            this._allGames$.set(games);
          });
          this.connection?.on('move', ({x, y, color}: { x:number, y: number, color: number }) => {
            this._currentGame$.update(g => {
              if(g?.grid) {
                g.grid[x][y] = color;
              }
              return g;
            })
          })
          this.connection?.on('gameEnd', () => {
            alert('La partie est finie')
          })
        });
      } else {
        this.connection?.stop();
        this.connection = null;
      }
    })

  }

  createGame(game: GameModel) {
    this.connection?.send('createGame', game);
  }
  joinGame(gameId: number) {
    this.connection?.send('joinGame', { gameId });
  }
  play(gameId: number, x: number) {
    this.connection?.send('play', { x, gameId })
  }

  private onCurrentGame = (game: GameModel) => {
    this._currentGame$.set(game);
  }
}
