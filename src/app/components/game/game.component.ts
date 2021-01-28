import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription, timer } from "rxjs";
import { DownUnderService } from "../../../app/services/downunder.service";
import { ICard } from "../../../models/ICard";
import { IPlayer } from "../../../models/IPlayer";
import { ISession } from "../../../models/ISession";
import { PlayerStateEnum } from "../../../models/PlayerStateEnum";
import confetti from "canvas-confetti";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"],
  providers: [DownUnderService]
})
export class GameComponent implements OnInit, OnDestroy {
  private blockConfetti = false;
  readonly refreshInterval: number = 2000;
  timer: Subscription;
  PlayerStateEnum: typeof PlayerStateEnum = PlayerStateEnum;
  sessionId: string;
  playerId: string;
  lastCard: ICard;

  constructor(public service: DownUnderService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.paramMap.get("sessionId") ?? this.service.session?.id;
    this.playerId = sessionStorage.getItem("playerId") ?? this.service.player?.id;
    if (!this.playerId || !this.sessionId) {
      void this.router.navigate(["/join", this.sessionId]);
      return;
    }
    this.setupRefreshTimer();
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem("playerId");
    this.timer.unsubscribe();
  }

  playCard(cardId: string): void {
    this.service.playCard(this.sessionId, this.playerId, cardId).subscribe((session: ISession) => this.refreshInfo(session));
  }

  endTurn(): void {
    this.service.endTurn(this.sessionId, this.playerId).subscribe((session: ISession) => this.refreshInfo(session));
  }

  private setupRefreshTimer(): void {
    this.timer = timer(0, this.refreshInterval).subscribe(() => {
      this.service.getSession(this.sessionId, this.playerId).subscribe((session: ISession) => this.refreshInfo(session));
    });
  }

  private refreshInfo(session: ISession): void {
    this.service.session = session;
    this.service.player = session.players.find((player: IPlayer) => player.id === this.playerId);
    this.lastCard = session.cardset.playedCards.slice(-1)[0];
    if (this.service.player.state === PlayerStateEnum.Winner && !this.blockConfetti) {
      this.blockConfetti = true;
      this.shoot();
    } else {
      this.blockConfetti = false;
    }
  }

  shoot(): void {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);
      void confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: this.randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        }) as confetti.Options
      );
      void confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: this.randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        }) as confetti.Options
      );
    }, 250);
  }

  private randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
