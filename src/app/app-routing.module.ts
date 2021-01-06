import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StartComponent } from "./components/start/start.component";

// eslint-disable-next-line prettier/prettier
const routes: Routes = [
  { path: "", pathMatch: "full", component: StartComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
