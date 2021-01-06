import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IPlayer } from "src/models/IPlayer";
import { ISession } from "src/models/ISession";

@Injectable({
  providedIn: "root"
})
export class LowbobService {
  constructor(private http: HttpClient) {}

  createSession(sessionInformation: ISession): Observable<ISession> {
    return this.http.post<ISession>(
      `${environment.baseUrl}/session`,
      sessionInformation
    );
  }

  getSession(sessionId: string): Observable<ISession> {
    return this.http.get<ISession>(
      `${environment.baseUrl}/session/${sessionId}`
    );
  }

  deleteSession(sessionId: string): Observable<unknown> {
    return this.http.delete<unknown>(
      `${environment.baseUrl}/session/${sessionId}`
    );
  }

  createPlayer(playerInformation: IPlayer): Observable<IPlayer> {
    return this.http.post<IPlayer>(
      `${environment.baseUrl}/player`,
      playerInformation
    );
  }

  getPlayer(playerId: string): Observable<IPlayer> {
    return this.http.get<IPlayer>(`${environment.baseUrl}/player/${playerId}`);
  }

  deletePlayer(playerId: string): Observable<unknown> {
    return this.http.delete<unknown>(
      `${environment.baseUrl}/player/${playerId}`
    );
  }

  drawCard(sessionId: string, playerId: string): Observable<IPlayer> {
    return this.http.get<IPlayer>(
      `${environment.baseUrl}/session/${sessionId}/player/${playerId}/draw`
    );
  }

  playCard(
    sessionId: string,
    playerId: string,
    cardId: string
  ): Observable<ISession> {
    return this.http.post<ISession>(
      `${environment.baseUrl}/session/${sessionId}/player/${playerId}/play/${cardId}`,
      null
    );
  }

  endTurn(sessionId: string, playerId: string): Observable<unknown> {
    return this.http.post<unknown>(
      `${environment.baseUrl}/session/${sessionId}/player/${playerId}/turn`,
      null
    );
  }

  resetSession(sessionId: string): Observable<ISession> {
    return this.http.delete<ISession>(
      `${environment.baseUrl}/session/${sessionId}`
    );
  }
}
