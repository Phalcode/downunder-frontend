import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { timer } from "rxjs";
import { DownUnderService } from "src/app/services/DownUnder.service";
import { ISession } from "src/models/ISession";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateComponent {
  sessionName = "";
  maxPlayers = 8;
  playerChips = 3;

  constructor(private service: DownUnderService, private router: Router) {
    timer(0, 1000).subscribe(() => {
      console.log(this.playerChips.toString() + " " + typeof this.playerChips);
    });
  }

  changePlayerChips(value: number = 3): void {
    if (this.playerChips + value > 0 && this.playerChips + value < 100) {
      this.playerChips += value;
    }
  }

  createSession(): void {
    this.service
      .createSession({
        name: this.sessionName,
        maxPlayers: this.maxPlayers,
        chips: this.playerChips
      })
      .subscribe((session: ISession) => {
        this.service.session = session;
        void this.router.navigate(["/join"]);
        // TODO: Error Handling, Session not Found
      });
  }
}
