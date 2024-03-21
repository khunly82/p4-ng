import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TooltipModule} from "primeng/tooltip";

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [
    CommonModule,
    TooltipModule
  ],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {
  @Input()
  status: 'connected'|'connecting'|'disconnected'|undefined = 'disconnected';
}
