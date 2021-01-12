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
  readonly refreshInterval: number = 30000;
  sessionId: string;
  playerId: string;
  constructor(public service: LowbobService, private route: ActivatedRoute) {
    this.sessionId = service.session?.id ?? route.snapshot.paramMap.get("id");
    this.playerId = service.player?.id ?? localStorage.getItem("playerid");
  }

  ngOnInit(): void {
    timer(0, this.refreshInterval).subscribe(() => {
      this.service.getSession(this.sessionId).subscribe((session: ISession) => {
        this.service.session = session;
      });
      this.service
        .getPlayer(this.sessionId, this.playerId)
        .subscribe((player: IPlayer) => {
          this.service.player = player;
        });
    });
  }
}
