import { CommonModule } from '@angular/common';
import {Component, OnInit, Signal} from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CheckboxModule} from "primeng/checkbox";
import {RadioButtonModule} from "primeng/radiobutton";
import {TableModule} from "primeng/table";
import {GameModel} from "../../models/game.model";
import {MessageService} from "primeng/api";
import {GameService} from "../../services/game.service";
import {Store} from "@ngrx/store";
import {Session} from "../../store/session.state";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    RadioButtonModule,
    TableModule,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  games$: Signal<GameModel[]>;
  grid$: Signal<GameModel|null>;

  currentUserId: number|null = null;
  createGameOpen: boolean = false;

  form: FormGroup

  constructor(
    private readonly fb: FormBuilder,
    private readonly messageService: MessageService,
    private readonly gameService: GameService,
    private readonly  store: Store<{session: Session}>
  ) {
    this.games$ = gameService.allGames;
    this.grid$ = gameService.currentGame;

    this.store.select(state => state.session.id)
      .subscribe(id => this.currentUserId = id);

    this.form = this.fb.group({
      color: [1, [Validators.required]],
      versusAI: [false, [Validators.required]]
    });
  }

  play(x: number) {
    if(!this.grid$()) {
      return;
    }
    this.gameService.play(this.grid$()!.id, x)
  }

  createGame() {
    if(this.form.invalid) {
      return;
    }
    this.gameService.createGame(this.form.value);
    this.createGameOpen = false;
  }

  join(gameId: number) {
    this.gameService.joinGame(gameId);
  }
}
