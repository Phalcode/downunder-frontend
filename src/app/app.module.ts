import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { environment } from "../environments/environment";
import { ServiceWorkerModule } from "@angular/service-worker";

import { AppComponent } from "./app.component";
import { StartComponent } from "./components/start/start.component";
import { CreateComponent } from "./components/create/create.component";
import { JoinComponent } from "./components/join/join.component";
import { GameComponent } from "./components/game/game.component";
import { NotfoundComponent } from "./components/notfound/notfound.component";
import { NullToDefaultDirective } from "./directives/nullToDefault.directive";
import { AutofocusDirective } from "./directives/autofocus.directive";
import { DownUnderService } from "./services/downunder.service";

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    CreateComponent,
    JoinComponent,
    GameComponent,
    NotfoundComponent,
    NullToDefaultDirective,
    AutofocusDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
      registrationStrategy: "registerImmediately"
    })
  ],
  providers: [DownUnderService],
  bootstrap: [AppComponent]
})
export class AppModule {}
