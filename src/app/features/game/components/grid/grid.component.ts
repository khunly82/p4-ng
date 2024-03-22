import {Component, Input} from '@angular/core';
import {GameModel} from "../../models/game.model";
import {GameService} from "../../services/game.service";
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
  game: GameModel|undefined;

  constructor(private readonly gameService: GameService) {
  }
  async play(x: number) {
    if (!this.game?.grid) {
      return;
    }
    if(!this.game.grid[x].includes(0)) {
      return;
    }
    await this.gameService.play(this.game.id, x)
  }
}
