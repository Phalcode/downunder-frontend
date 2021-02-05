import { Injectable, NgZone } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { IPlayer } from "../../models/IPlayer";
import { ISession } from "../../models/ISession";
import { Session } from "inspector";

@Injectable({
  providedIn: "root"
})
export class DownUnderService {
  public session: ISession;
  public player: IPlayer;

  constructor(private http: HttpClient, private zone: NgZone) {}

  private getEventSource(url: string): EventSource {
    return new EventSource(url);
  }

  getSession(sessionId: string, playerId: string): Observable<ISession> {
    const url = `${environment.backendUrl}/session/${sessionId}/player/${playerId}`;
    return new Observable((observer) => {
      const eventSource = this.getEventSource(url);
      eventSource.onmessage = (message) => {
        this.zone.run(() => {
          const session = JSON.parse(message.data) as ISession;
          observer.next(session);
        });
      };
      eventSource.onerror = (error) => {
        this.zone.run(() => {
          observer.error(error);
        });
      };
    });
  }

  createSession(sessionInformation: ISession): Observable<ISession> {
    return this.http.post<ISession>(`${environment.backendUrl}/session`, sessionInformation);
  }

  deleteSession(sessionId: string): Observable<unknown> {
    return this.http.delete<unknown>(`${environment.backendUrl}/session/${sessionId}`);
  }

  createPlayer(sessionId: string, playerInformation: IPlayer): Observable<IPlayer> {
    return this.http.post<IPlayer>(`${environment.backendUrl}/session/${sessionId}/player`, playerInformation);
  }

  deletePlayer(sessionId: string, playerId: string): Observable<unknown> {
    return this.http.delete<unknown>(`${environment.backendUrl}/session/${sessionId}/player/${playerId}`);
  }

  playCard(sessionId: string, playerId: string, cardId: string): Observable<ISession> {
    return this.http.post<ISession>(`${environment.backendUrl}/session/${sessionId}/player/${playerId}/play/${cardId}`, null);
  }

  endTurn(sessionId: string, playerId: string): Observable<unknown> {
    return this.http.post<unknown>(`${environment.backendUrl}/session/${sessionId}/player/${playerId}/turn`, null);
  }

  resetSession(sessionId: string): Observable<ISession> {
    return this.http.delete<ISession>(`${environment.backendUrl}/session/${sessionId}`);
  }
}
