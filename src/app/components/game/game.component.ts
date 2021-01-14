import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { timer } from "rxjs";
import { LowbobService } from "src/app/services/lowbob.service";
import { IPlayer } from "src/models/IPlayer";
import { ISession } from "src/models/ISession";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  readonly refreshInterval: number = 2000;
  sessionId: string;
  playerId: string;
  constructor(public service: LowbobService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.paramMap.get("id") ?? this.service.session?.id;
    this.playerId = localStorage.getItem("playerid") ?? this.service.player?.id;
    timer(0, this.refreshInterval).subscribe(() => {
      this.service.getSession(this.sessionId, this.playerId).subscribe((session: ISession) => {
        this.service.session = session;
        this.service.player = session.players.find((player: IPlayer) => player.id === this.playerId);
      });
    });
  }

  playCard(cardId: string): void {
    this.service.playCard(this.sessionId, this.playerId, cardId).subscribe((session: ISession) => {
      this.service.session = session;
      this.service.player = session.players.find((player: IPlayer) => player.id === this.playerId);
    });
  }

  drawCard(): void {
    this.service.drawCard(this.sessionId, this.playerId).subscribe((session: ISession) => {
      this.service.session = session;
      this.service.player = session.players.find((player: IPlayer) => player.id === this.playerId);
    });
  }

  endTurn(): void {
    this.service.endTurn(this.sessionId, this.playerId).subscribe((session: ISession) => {
      this.service.session = session;
      this.service.player = session.players.find((player: IPlayer) => player.id === this.playerId);
    });
  }
}
