import {Component, Input} from '@angular/core';
import {GameRowPlayerComponent} from "../game-row-player/game-row-player.component";
import {GameModel} from "../../models/game.model";

@Component({
  selector: 'app-game-header',
  standalone: true,
    imports: [
        GameRowPlayerComponent
    ],
  templateUrl: './game-header.component.html',
  styleUrl: './game-header.component.scss'
})
export class GameHeaderComponent {
  @Input()
  game!: GameModel|null|undefined;

  @Input()
  gameResult!: string|undefined;
}
