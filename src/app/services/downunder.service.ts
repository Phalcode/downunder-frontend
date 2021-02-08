import { Injectable, NgZone } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { IPlayer } from "../../models/IPlayer";
import { ISession } from "../../models/ISession";

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

  streamSession(sessionId: string, playerId: string): Observable<ISession> {
    const url = `${environment.backendUrl}/session/${sessionId}/player/${playerId}`;
    return new Observable((observer) => {
      const eventSource = this.getEventSource(url);
      eventSource.onmessage = (message) => {
        this.zone.run(() => {
          console.log("Data Received from Eventstream.");
          const session = JSON.parse(message.data) as ISession;
          observer.next(session);
        });
      };
      eventSource.onopen = () => {
        this.zone.run(() => {
          this.handshake(sessionId, playerId).subscribe(() => {
            console.log("Handshake complete.");
          });
        });
      };
      eventSource.onerror = (error) => {
        this.zone.run(() => {
          console.log("Failed Receiving Data from Eventstream.", error);
          observer.error(error);
        });
      };
    });
  }

  handshake(sessionId: string, playerId: string): Observable<unknown> {
    return this.http.get<unknown>(`${environment.backendUrl}/session/${sessionId}/player/${playerId}/handshake`);
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
