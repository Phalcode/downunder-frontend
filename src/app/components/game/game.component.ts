import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DownUnderService } from "../../../app/services/downunder.service";
import { ICard } from "../../../models/ICard";
import { IPlayer } from "../../../models/IPlayer";
import { ISession } from "../../../models/ISession";
import { PlayerStateEnum } from "../../../models/PlayerStateEnum";
import confetti from "canvas-confetti";
import { Title } from "@angular/platform-browser";
import { Subscription } from "rxjs";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit, OnDestroy {
  private blockEffects = false;
  PlayerStateEnum: typeof PlayerStateEnum = PlayerStateEnum;
  sessionId: string;
  playerId: string;
  lastCard: ICard;
  sessionSubscription: Subscription;

  constructor(public service: DownUnderService, private router: Router, private route: ActivatedRoute, private titleService: Title) {}

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.paramMap.get("sessionId");
    this.playerId = sessionStorage.getItem("playerId") ?? this.service.player?.id;
    console.log("Session: " + this.sessionId);
    console.log("Player: " + this.playerId);
    if (!this.sessionId || !this.playerId) {
      void this.router.navigate(["/join", this.sessionId]);
      return;
    }
    this.sessionSubscription = this.service.observeSession().subscribe((session) => {
      this.refreshInfo(session);
    });
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem("playerId");
    if (this.sessionSubscription) this.sessionSubscription.unsubscribe();
  }

  playCard(cardId: string): void {
    this.service.playCard(this.sessionId, this.playerId, cardId);
  }

  getCountColor(count: number): string {
    let value = count / 77;
    if (value > 1) value = 1;
    else if (value < 0) value = 0;
    return `hsl(0,100%,${100 - 42 * value}%)`;
  }

  toggleSounds(): void {
    this.service.soundsEnabled = !this.service.soundsEnabled;
  }

  private refreshInfo(session: ISession): void {
    const player = session.players.find((player: IPlayer) => player.id === this.playerId);
    const playerPos = session.players.indexOf(player);
    const spliceSet = session.players.splice(0, playerPos);
    session.players = session.players.concat(spliceSet);

    this.service.session = session;
    this.service.player = player;
    this.lastCard = session.cardset.playedCards.slice(-1)[0];

    let titleText = `Downunder - ${session.count} - ${session.players.length}/${session.SETTING_MAX_PLAYERS}`;
    if (this.service.player.turn) {
      titleText += " - Your Turn!";
      this.service.playSound("plop.wav");
    }

    this.titleService.setTitle(titleText);

    if (this.service.player.state === PlayerStateEnum.Ingame) {
      this.blockEffects = false;
    }
    if (this.service.player.state === PlayerStateEnum.Winner && !this.blockEffects) {
      this.blockEffects = true;
      this.shootConfetti();
      this.service.playSound("win.wav");
    }
    if (this.service.player.state === PlayerStateEnum.Loser && !this.blockEffects) {
      this.blockEffects = true;
      this.service.playSound("lose.wav");
    }
  }

  private shootConfetti(): void {
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
