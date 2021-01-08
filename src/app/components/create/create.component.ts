import { Component } from "@angular/core";
import { LowbobService } from "src/app/services/lowbob.service";
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

  constructor(private service: LowbobService) {}

  changePlayerChips(value: number): void {
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
      });
  }
}
