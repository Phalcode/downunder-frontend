import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { timer } from "rxjs";
import { LowbobService } from "src/app/services/lowbob.service";
import { ISession } from "src/models/ISession";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  readonly refreshInterval: number = 30000;
  sessionId: string;
  constructor(public service: LowbobService, private route: ActivatedRoute) {
    this.sessionId = route.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    timer(0, this.refreshInterval).subscribe(() => {
      this.service.getSession(this.sessionId).subscribe((session: ISession) => {
        this.service.session = session;
      });
    });
  }
}
