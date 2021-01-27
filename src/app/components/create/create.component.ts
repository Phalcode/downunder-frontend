import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { DownUnderService } from "../../services/downunder.service";
import { ISession } from "../../../models/ISession";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
  providers: [DownUnderService]
})
export class CreateComponent {
  sessionName = "";
  maxPlayers = 8;
  playerChips = 3;

  constructor(private service: DownUnderService, private router: Router) {}

  changePlayerChips(value: number = 3): void {
    if (this.playerChips + value > 0 && this.playerChips + value < 100) {
      this.playerChips += value;
    }
  }

  createSession(): void {
    this.service
      .createSession({
        SETTING_NAME: this.sessionName,
        SETTING_MAX_PLAYERS: this.maxPlayers,
        SETTING_CHIPS: this.playerChips
      })
      .subscribe((session: ISession) => {
        this.service.session = session;
        console.log(session);
        void this.router.navigate(["/join"]);
        // TODO: Error Handling, Session not Found
      });
  }
}
