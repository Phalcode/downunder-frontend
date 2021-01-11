import { Component, OnInit } from "@angular/core";
import { LowbobService } from "src/app/services/lowbob.service";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  constructor(private service: LowbobService) {}

  ngOnInit(): void {
    console.log(this.service.session);
    console.log(this.service.player);
  }
}
