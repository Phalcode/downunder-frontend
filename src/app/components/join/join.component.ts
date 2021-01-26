import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DownUnderService } from "../../../app/services/DownUnder.service";
import { IPlayer } from "../../../models/IPlayer";
@Component({
  selector: "app-join",
  templateUrl: "./join.component.html",
  styleUrls: ["./join.component.scss"],
  providers: [DownUnderService]
})
export class JoinComponent {
  sessionId = "";
  username = "";
  constructor(private service: DownUnderService, private router: Router, private route: ActivatedRoute) {
    this.sessionId = this.route.snapshot.paramMap.get("sessionId") ?? this.service.session?.id ?? "";
  }

  joinSession(): void {
    this.service.createPlayer(this.sessionId, { username: this.username }).subscribe((player: IPlayer) => {
      this.service.player = player;
      localStorage.setItem("playerId", player.id);
      void this.router.navigate(["/game", this.sessionId]);
    });
    // TODO: ERR MAX PLAYERS
    // TODO: ERR SAME NAME
    // TODO: ERR SESSION NOT FOUND
  }
}
