import {Component, Input} from '@angular/core';
import {GameModel} from "../../models/game.model";
import {ButtonModule} from "primeng/button";
import {GameRowPlayerComponent} from "../game-row-player/game-row-player.component";
import {GameService} from "../../services/game.service";

@Component({
  selector: '[appGameRow]',
  standalone: true,
  imports: [
    ButtonModule,
    GameRowPlayerComponent,
  ],
  templateUrl: './game-row.component.html',
  styleUrl: './game-row.component.scss'
})
export class GameRowComponent {
  @Input()
  game!: GameModel|undefined;

  constructor(private readonly gameService: GameService) {
  }

  async joinGame() {
    if(!this.game) {
      return;
    }
    await this.gameService.joinGame(this.game.id);
  }
}
