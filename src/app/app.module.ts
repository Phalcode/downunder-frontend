/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { environment } from "../environments/environment";
import { ServiceWorkerModule } from "@angular/service-worker";
import { AckeeConfig, AckeeModule } from "ngx-ackee-wrapper";
import { AppComponent } from "./app.component";
import { StartComponent } from "./components/start/start.component";
import { CreateComponent } from "./components/create/create.component";
import { JoinComponent } from "./components/join/join.component";
import { GameComponent } from "./components/game/game.component";
import { NotfoundComponent } from "./components/notfound/notfound.component";
import { NullToDefaultDirective } from "./directives/nullToDefault.directive";
import { AutofocusDirective } from "./directives/autofocus.directive";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";

const ACKEE_CONFIG: AckeeConfig = {
  tracker: "https://ackee.platform.alfagun74.de/tracker.js",
  server: "https://ackee.platform.alfagun74.de",
  domainId: "9e10c183-2df8-4b8f-80fc-47f7e27ca482",
  options: {
    ignoreLocalhost: true,
    detailed: true
  },
  dev: environment.production
};

const config: SocketIoConfig = { url: environment.backendUrl };

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
    AckeeModule.forRoot(ACKEE_CONFIG),
    BrowserModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
      registrationStrategy: "registerImmediately"
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
