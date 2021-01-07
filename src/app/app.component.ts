import { Component } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { interval } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(private swUpdate: SwUpdate) {
    interval(1000 * 60 * 60 * 2).subscribe(() =>
      this.swUpdate.available.subscribe(() => {
        window.location.reload();
      })
    );
  }
}
