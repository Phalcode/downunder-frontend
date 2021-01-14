import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateComponent } from "./components/create/create.component";
import { GameComponent } from "./components/game/game.component";
import { JoinComponent } from "./components/join/join.component";
import { NotfoundComponent } from "./components/notfound/notfound.component";
import { StartComponent } from "./components/start/start.component";

// eslint-disable-next-line prettier/prettier
const routes: Routes = [
  { path: "", pathMatch: "full", component: StartComponent },
  { path: "create", component: CreateComponent },
  { path: "join", component: JoinComponent },
  { path: "join/:sessionId", component: JoinComponent },
  { path: "game/:sessionId", component: GameComponent },
  { path: "**", component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
