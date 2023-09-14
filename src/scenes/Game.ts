import config from "../config";
import Scene from "../core/Scene";
import Background from "../prefabs/Background";
import { Handle } from "../prefabs/Handle";
import { Graphics, Text, TextStyle } from "pixi.js";
import { generateVaultCombination } from "../utils/combinationGenerator";
import { Blink } from "../prefabs/Blink";
import { Timer } from "../utils/Timer";
import { Sounds } from "../prefabs/Sounds";
import { Vault } from "../prefabs/Vault";
import gsap from "gsap";
import { animateOnResize } from "../utils/misc";

type CombinationPair = {
  number: number;
  direction: string | null;
};

export default class Game extends Scene {
  name = "Game";

  private doorClosed!: Vault;
  private doorOpen!: Vault;
  private doorOpenShadow!: Vault;
  private handle!: Handle;
  private handleShadow!: Handle;
  private background!: Background;
  private blink!: Blink;

  private timerText!: Text;
  private timer!: Timer;

  private sounds!: Sounds;

  private leftHitArea!: Graphics;
  private rightHitArea!: Graphics;

  private isWinner: boolean = false;
  private lastTapDirection: "clockwise" | "counterclockwise" | null = null;
  private debounceTime: number = 1000;
  private debounceTimer: number | undefined;
  private vaultCombination: CombinationPair[] = [];
  private currentCombination: CombinationPair = { number: 0, direction: null };
  private userEnteredCombination: CombinationPair[] = [];

  load() {
    this.background = new Background(config.backgrounds.vault);
    this.doorClosed = new Vault(config.vault.closedDoor);
    this.doorOpen = new Vault(config.vault.openedDoor);
    this.doorOpenShadow = new Vault(config.vault.doorOpenShadow);
    this.handle = new Handle(config.vault.handle);
    this.handleShadow = new Handle(config.vault.handleShadow);

    this.timerText = new Text();
    this.sounds = new Sounds();

    const style = new TextStyle({
      fontFamily: "Arial",
      fontSize: 15,
      fill: ["white"],
      stroke: "red",
      fontWeight: "lighter",
      lineJoin: "round",
      strokeThickness: 2,
    });

    this.timer = new Timer((time) => {
      if (this.timerText) {
        this.timerText.text = time;
        this.timerText.style = style;
      }
    });

    // Door closed
    this.doorClosed.x = window.innerWidth / 2 + 10;
    this.doorClosed.y = window.innerHeight / 2 - 10;
    this.doorClosed.width = this.background.width / 3;
    this.doorClosed.height = this.background.height / 1.6;

    // Door open
    this.doorOpen.x = window.innerWidth / 1.37 + 10;
    this.doorOpen.y = window.innerHeight / 2 - 10;
    this.doorOpen.width = this.background.width / 4.5;
    this.doorOpen.height = this.background.height / 1.55;

    // Door open shadow
    this.doorOpenShadow.x = window.innerWidth / 1.37 + 30;
    this.doorOpenShadow.y = window.innerHeight / 2 + 10;
    this.doorOpenShadow.width = this.background.width / 4.1;
    this.doorOpenShadow.height = this.background.height / 1.55;

    // Handle
    this.handle.eventMode = "static";
    this.handle.cursor = "pointer";
    this.handle.x = this.doorClosed.x - 20;
    this.handle.y = this.doorClosed.y;
    this.handle.width = this.background.width / 9;
    this.handle.height = this.background.height / 4;

    // Handle shadow
    this.handleShadow.x = this.doorClosed.x - 15;
    this.handleShadow.y = this.doorClosed.y + 10;
    this.handleShadow.width = this.background.width / 9;
    this.handleShadow.height = this.background.height / 4;

    // Timer
    this.timerText.x = window.innerWidth / 2 - this.doorClosed.width / 1.6;
    this.timerText.y = window.innerHeight / 2 - this.doorClosed.height / 10;
    this.timerText.width = window.innerWidth / 35;
    this.timerText.height = window.innerHeight / 30;

    this.addChild(
      this.background,
      this.doorClosed,
      this.handleShadow,
      this.handle,
      this.timerText
    );
  }

  private setupInteractions() {
    this.leftHitArea = new Graphics()
      .beginFill(0xffffff, 0.001)
      .drawRect(0, 0, window.innerWidth / 2, window.innerHeight)
      .endFill();
    this.leftHitArea.interactive = true;
    this.leftHitArea.cursor = "poiner";
    this.leftHitArea.on("pointerdown", this.onCounterclockwiseSpin, this);

    this.rightHitArea = new Graphics()
      .beginFill(0xffffff, 0.001)
      .drawRect(
        window.innerWidth / 2,
        0,
        window.innerWidth / 2,
        window.innerHeight
      )
      .endFill();
    this.rightHitArea.interactive = true;
    this.rightHitArea.cursor = "pointer";
    this.rightHitArea.on("pointerdown", this.onClockwiseSpin, this);

    this.addChild(this.leftHitArea, this.rightHitArea);
  }

  private updateInteractions() {
    this.removeChild(this.leftHitArea, this.rightHitArea);

    this.setupInteractions();
  }

  private onClockwiseSpin() {
    if (this.isWinner) {
      return;
    }
    console.log("Clockwise spin");

    this.handle.spinClockwise();
    this.handleShadow.spinClockwise();
    this.onTap("clockwise");
  }

  private onCounterclockwiseSpin() {
    if (this.isWinner) {
      return;
    }
    console.log("Counterclockwise spin");

    this.handle.spinCounterclockwise();
    this.handleShadow.spinCounterclockwise();
    this.onTap("counterclockwise");
  }

  private onCrazyHandleSpin() {
    this.handle.crazyHandleSpin();
    this.handleShadow.crazyHandleSpin();
  }

  private onTap(direction: "clockwise" | "counterclockwise") {
    if (this.isWinner) {
      return;
    }

    if (
      direction === this.lastTapDirection &&
      this.currentCombination.direction !== null
    ) {
      this.currentCombination.number++;
    } else {
      this.lastTapDirection = direction;

      this.currentCombination.number = 1;
      this.currentCombination.direction = direction;
    }

    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.userEnteredCombination.push(this.currentCombination);
      this.currentCombination = { number: 0, direction: null };
      this.checkCombination();
    }, this.debounceTime);
  }

  private checkCombination() {
    for (let i = 0; i < this.userEnteredCombination.length; i++) {
      const currentPair = this.userEnteredCombination[i];

      if (
        currentPair.number !== this.vaultCombination[i].number ||
        currentPair.direction !== this.vaultCombination[i].direction
      ) {
        this.sounds.playErrorSound();

        console.log("⛔ Game over!");
        // Game should reset and handle should spin
        this.onCrazyHandleSpin();
        this.restartGame();
      } else {
        const remainingPairs = this.vaultCombination
          .slice(i + 1)
          .map((pair) => pair.number + " " + pair.direction)
          .join(", ");

        if (remainingPairs) {
          console.log(`Remaining: ${remainingPairs}`);
        }

        this.isWinner = i === this.vaultCombination.length - 1;
      }
    }

    if (this.isWinner) {
      this.timer.stop();
      this.sounds.playWinSound();

      console.log("🔓 Winner! 🪙🪙🪙");

      this.removeChild(this.handle, this.handleShadow, this.doorClosed);
      this.addChild(this.doorOpenShadow, this.doorOpen);

      this.blink = new Blink(config.effects.blink);
      this.addChild(this.blink);

      setTimeout(() => {
        this.sounds.playVaultCloseSound();
        this.onCrazyHandleSpin();
        this.restartGame();
      }, 5000);
    }
  }

  getVaultCombination() {
    const vaultCombination = generateVaultCombination();
    vaultCombination.forEach((pair) => {
      const [number, direction] = pair.split(" ");
      this.vaultCombination.push({ number: Number(number), direction });
    });

    console.log(`🔒 Vault Combination: ${vaultCombination.join(", ")}`);
  }

  async start() {
    this.sounds.playThemeSong();
    this.setupInteractions();
    this.getVaultCombination();
    this.timer.start();
  }

  restartGame() {
    this.sounds.stopWinSound();
    this.removeChild(this.blink, this.doorOpen, this.doorOpenShadow);
    this.addChild(this.doorClosed, this.handleShadow, this.handle);

    this.vaultCombination = [];
    this.currentCombination = { number: 0, direction: null };
    this.userEnteredCombination = [];
    this.isWinner = false;

    this.getVaultCombination();
    this.timer.reset();
    this.timer.start();
  }

  onResize(width: number, height: number) {
    this.updateInteractions();

    if (this.background) {
      this.background.resize(width, height);
    }

    if (this.doorClosed) {
      this.doorClosed.x = width / 2 + 10;
      this.doorClosed.y = height / 2 - 10;
      this.doorClosed.width = this.background.width / 3;
      this.doorClosed.height = this.background.height / 1.6;
      animateOnResize(this.doorClosed);
    }

    if (this.handle) {
      this.handle.x = this.doorClosed.x - 20;
      this.handle.y = this.doorClosed.y;
      this.handle.width = this.background.width / 9;
      this.handle.height = this.background.height / 4;
      animateOnResize(this.handle);
    }

    if (this.handleShadow) {
      this.handleShadow.x = this.doorClosed.x - 15;
      this.handleShadow.y = this.doorClosed.y + 10;
      this.handleShadow.width = this.background.width / 9;
      this.handleShadow.height = this.background.height / 4;
      animateOnResize(this.handleShadow);
    }

    if (this.doorOpen) {
      this.doorOpen.x = width / 1.37 + 10;
      this.doorOpen.y = height / 2 - 10;
      this.doorOpen.width = this.background.width / 4.5;
      this.doorOpen.height = this.background.height / 1.55;
      animateOnResize(this.doorOpen);
    }

    if (this.doorOpenShadow) {
      this.doorOpenShadow.x = width / 1.37 + 30;
      this.doorOpenShadow.y = height / 2 + 10;
      this.doorOpenShadow.width = this.background.width / 4.1;
      this.doorOpenShadow.height = this.background.height / 1.55;
      animateOnResize(this.doorOpenShadow);
    }

    if (this.timerText) {
      this.timerText.x = width / 2 - this.doorClosed.width / 1.6;
      this.timerText.y = height / 2 - this.doorClosed.height / 10;
      this.timerText.width = width / 35;
      this.timerText.height = height / 30;
      animateOnResize(this.timerText);
    }

    if (this.blink) {
      this.blink.x = this.background.width / 2;
      this.blink.y = this.background.height / 2;
    }
  }
}
