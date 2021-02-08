import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { SwUpdate } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { filter } from "rxjs/operators";
import { AckeeService } from "ngx-ackee-wrapper";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  currentApplicationVersion = environment.appVersion;
  constructor(private swUpdate: SwUpdate, public router: Router, private ackeeServ: AckeeService) {
    this.swUpdate.available.subscribe(() => {
      window.location.reload();
    });
    void this.ackeeServ.visit(this.router.events.pipe(filter((evt) => evt instanceof NavigationEnd)));
    console.log(`v${this.currentApplicationVersion}`);
  }
}
