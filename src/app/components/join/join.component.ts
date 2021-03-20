import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DownUnderService } from "../../../app/services/downunder.service";
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
    this.sessionId = this.route.snapshot.paramMap.get("sessionId") ?? "";
  }

  joinSession(): void {
    this.service.joinSession(this.sessionId, { username: this.username }).subscribe((player: IPlayer) => {
      sessionStorage.setItem("playerId", player.id);
      void this.router.navigate(["/game", this.sessionId]);
    });
  }
}
