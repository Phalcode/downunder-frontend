import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { IPlayer } from "../../models/IPlayer";
import { ISession } from "../../models/ISession";
import { SocketEmitters } from "../models/SocketEmitters";
import { SocketReceivers } from "../models/SocketReceivers";

@Injectable({
  providedIn: "root"
})
export class DownUnderService {
  public session: ISession;
  public player: IPlayer;

  constructor(private socket: Socket) {
    socket.fromEvent<ISession>(SocketReceivers.SESSION).subscribe((session) => (this.session = session));
    socket.fromEvent<IPlayer>(SocketReceivers.PLAYER).subscribe((player) => (this.player = player));
  }

  createSession(sessionInformation: ISession): Observable<ISession> {
    this.socket.emit(SocketEmitters.CREATE_SESSION, sessionInformation);
    return this.socket.fromEvent(SocketReceivers.SESSION);
  }

  joinSession(sessionId: string, playerInformation: IPlayer): Observable<IPlayer> {
    this.socket.emit(SocketEmitters.JOIN_SESSION, sessionId, playerInformation);
    return this.socket.fromEvent(SocketReceivers.PLAYER);
  }

  playCard(sessionId: string, playerId: string, cardId: string): Observable<ISession> {
    this.socket.emit(SocketEmitters.JOIN_SESSION, sessionId, playerId, cardId);
    return this.socket.fromEvent(SocketReceivers.SESSION);
  }

  resetSession(sessionId: string): Observable<ISession> {
    this.socket.emit(SocketEmitters.JOIN_SESSION, sessionId);
    return this.socket.fromEvent(SocketReceivers.SESSION);
  }

  playSound(file: string): void {
    const audio = new Audio();
    audio.src = `../../assets/sounds/${file}`;
    audio.load();
    void audio.play();
  }
}
