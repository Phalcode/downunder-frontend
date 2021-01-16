import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { timer } from "rxjs";
import { DownUnderService } from "src/app/services/DownUnder.service";
import { IPlayer } from "src/models/IPlayer";
import { ISession } from "src/models/ISession";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit, OnDestroy {
  readonly refreshInterval: number = 2000;
  sessionId: string;
  playerId: string;

  constructor(public service: DownUnderService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.paramMap.get("sessionId") ?? this.service.session?.id;
    this.playerId = localStorage.getItem("playerId") ?? this.service.player?.id;

    if (!this.playerId) {
      void this.router.navigate(["/join", this.sessionId]);
      return;
    }

    timer(0, this.refreshInterval).subscribe(() => {
      this.service.getSession(this.sessionId, this.playerId).subscribe((session: ISession) => {
        this.service.session = session;
        this.service.player = session.players.find((player: IPlayer) => player.id === this.playerId);
      });
    });
  }

  ngOnDestroy(): void {
    localStorage.removeItem("playerId");
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
