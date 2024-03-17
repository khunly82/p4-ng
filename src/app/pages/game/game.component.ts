import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {

  connection: HubConnection;

  grid: number[][] = [...Array(7)].map(_ => [...Array(6)].map(_ => 0));

  turn: number = 1;

  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5177/ws/game")
      .withAutomaticReconnect()
      .build();
    this.connection.start().then(() => {
      this.connection.on("playerMove", (move) => {
        this.grid[move.x][move.y] = 1;
      })
      this.connection.on("opponentMove", (move) => {
        this.grid[move.x][move.y] = -1;
      })
    })
  }

  ngOnInit(): void {
  }

  play(x: number) {
    this.connection.send('play', { 
      x, color: 1, isIA: true
    })
  }
}
