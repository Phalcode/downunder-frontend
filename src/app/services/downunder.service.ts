import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { Observable } from "rxjs";
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
  public errorMessages: string[] = [];
  public soundsEnabled = false;

  constructor(private socket: Socket) {
    this.observeErrors().subscribe((err) => {
      this.errorMessages.push(err);
      console.error(err);
      alert(err);
    });
  }

  observeSession(): Observable<ISession> {
    return this.socket.fromEvent<ISession>(SocketReceivers.SESSION);
  }

  observePlayer(): Observable<IPlayer> {
    return this.socket.fromEvent<IPlayer>(SocketReceivers.PLAYER);
  }

  observeErrors(): Observable<string> {
    return this.socket.fromEvent<string>(SocketReceivers.THROW_ERROR);
  }

  createSession(sessionInformation: ISession): Observable<ISession> {
    this.socket.emit(SocketEmitters.CREATE_SESSION, sessionInformation);
    return this.observeSession();
  }

  joinSession(sessionId: string, playerInformation: IPlayer): Observable<IPlayer> {
    this.socket.emit(SocketEmitters.JOIN_SESSION, sessionId, playerInformation);
    return this.observePlayer();
  }

  getSession(sessionId: string, playerId: string): Observable<ISession> {
    this.socket.emit(SocketEmitters.GET_SESSION, sessionId, playerId);
    return this.observeSession();
  }

  playCard(sessionId: string, playerId: string, cardId: string): Observable<ISession> {
    this.socket.emit(SocketEmitters.PLAY, sessionId, playerId, cardId);
    return this.observeSession();
  }

  resetSession(sessionId: string): Observable<ISession> {
    this.socket.emit(SocketEmitters.RESET_SESSION, sessionId);
    return this.observeSession();
  }

  playSound(file: string): void {
    if (!this.soundsEnabled) return;
    const audio = new Audio();
    audio.src = `../../assets/sounds/${file}`;
    audio.load();
    void audio.play();
  }
}
