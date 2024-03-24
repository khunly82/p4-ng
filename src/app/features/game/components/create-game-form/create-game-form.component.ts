import {Component, EventEmitter, Output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {PaginatorModule} from "primeng/paginator";
import {RadioButtonModule} from "primeng/radiobutton";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {GameService} from "../../services/game.service";
import {SliderModule} from "primeng/slider";
import {FloatLabelModule} from "primeng/floatlabel";

@Component({
  selector: 'app-create-game-form',
  standalone: true,
  imports: [
    ButtonModule,
    CheckboxModule,
    PaginatorModule,
    RadioButtonModule,
    ReactiveFormsModule,
    FormsModule,
    SliderModule,
    FloatLabelModule,
  ],
  templateUrl: './create-game-form.component.html',
  styleUrl: './create-game-form.component.scss'
})
export class CreateGameFormComponent {

  @Output()
  onClose: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup

  get versusAIControl() {
    return this.form.controls['versusAI'];
  }
  get aiDepthControl() {
    return this.form.controls['aiDepth'];
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly gameService: GameService,
  ) {
    this.form = this.formBuilder.group({
      color: [1, [Validators.required]],
      versusAI: [false, [Validators.required]],
      aiDepth: [2, [Validators.required]]
    });

    this.aiDepthControl.disable();

    this.versusAIControl.valueChanges.subscribe(versusAI => {
      if(versusAI) {
        this.aiDepthControl.enable();
      } else {
        this.aiDepthControl.disable();
      }
    });
  }
  async createGame() {
    if (this.form.invalid) {
      return;
    }
    await this.gameService.createGame(this.form.value);
    this.onClose.emit();
  }
}
