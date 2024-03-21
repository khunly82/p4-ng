import {Component, Input} from '@angular/core';
import {GameModel} from "../../../../features/game/models/game.model";
import {GameService} from "../../../../features/game/services/game.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {
  @Input()
  game: GameModel|null|undefined;

  constructor(private readonly gameService: GameService) {
  }
  async play(x: number) {
    if (!this.game) {
      return;
    }
    await this.gameService.play(this.game.id, x)
  }
}
