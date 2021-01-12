import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { NgxJsonViewerModule } from 'ngx-json-viewer';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StartComponent } from "./components/start/start.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { CreateComponent } from "./components/create/create.component";
import { JoinComponent } from "./components/join/join.component";
import { GameComponent } from "./components/game/game.component";
import { NotfoundComponent } from "./components/notfound/notfound.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    CreateComponent,
    JoinComponent,
    GameComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxJsonViewerModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
      registrationStrategy: "registerImmediately"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
