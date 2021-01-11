import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LowbobService } from "src/app/services/lowbob.service";
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
    this.sessionId = service.session.id ?? "";
  }

  joinSession(): void {
    this.service.getSession(this.sessionId).subscribe((session: ISession) => {
      this.service.session = session;
      void this.router.navigate(["/game"]);
      // TODO: Create Player
      // TODO: Routing Error Capture?
      // TODO: Error Handling, Session not Found
    });
  }
}
