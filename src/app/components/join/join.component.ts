import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LowbobService } from "src/app/services/lowbob.service";
import { IPlayer } from "src/models/IPlayer";
import { ISession } from "src/models/ISession";

@Component({
  selector: "app-join",
  templateUrl: "./join.component.html",
  styleUrls: ["./join.component.scss"]
})
export class JoinComponent {
  sessionId = "";
  username = "";
  constructor(private service: LowbobService, private router: Router) {
    this.sessionId = service?.session?.id ?? "";
  }

  joinSession(): void {
    this.service.getSession(this.sessionId).subscribe((session: ISession) => {
      this.service.session = session;
      this.service
        .createPlayer(this.sessionId, { username: this.username })
        .subscribe((player: IPlayer) => {
          this.service.player = player;
          void this.router.navigate(["/game", this.sessionId]);
        });
      // TODO: ERR MAX PLAYERS
      // TODO: ERR SAME NAME
      // TODO: ERR SESSION NOT FOUND
    });
  }
}
