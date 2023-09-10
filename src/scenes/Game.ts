import config from "../config";
import Scene from "../core/Scene";
import Background from "../prefabs/Background";
import { Door } from "../prefabs/Door";
import { Handle } from "../prefabs/Handle";
import { Graphics, Text, TextStyle } from "pixi.js";
import gsap from "gsap";
import { generateVaultCombination } from "../utils/combinationGenerator";
import { Blink } from "../prefabs/Blink";
import { Timer } from "../utils/Timer";

type CombinationPair = {
  number: number;
  direction: string | null;
};

export default class Game extends Scene {
  name = "Game";

  private door!: Door;
  private doorOpen!: Door;
  private doorOpenShadow!: Door;
  private handle!: Handle;
  private handleShadow!: Handle;
  private background!: Background;
  private blink!: Blink;
  private timerText!: Text;
  private timer!: Timer;
  private themeSong!: Howl;
  private winSound!: Howl;
  private vaultCloseSound!: Howl;

  private isWinner: boolean = false;
  private lastTapDirection: "clockwise" | "counterclockwise" | null = null;
  private debounceTime: number = 1000; // Adjust the debounce time in milliseconds
  private debounceTimer: number | undefined;
  private vaultCombination: CombinationPair[] = [];
  private currentCombination: CombinationPair = { number: 0, direction: null };
  private userEnteredCombination: CombinationPair[] = [];

  load() {
    this.background = new Background(config.backgrounds.vault);

    this.door = new Door(config.doors.closedDoor);
    this.doorOpen = new Door(config.doors.openedDoor);
    this.doorOpenShadow = new Door(config.doors.doorOpenShadow);
    this.handle = new Handle(config.handles.handle);
    this.handleShadow = new Handle(config.handles.handleShadow);

    this.themeSong = new Howl({
      src: ["public/Game/sounds/theme-song.mp3"],
      volume: 0.8,
      loop: true,
    });

    this.winSound = new Howl({
      src: ["public/Game/sounds/win.mp3"],
      volume: 1.0,
      loop: true,
    });

    this.vaultCloseSound = new Howl({
      src: ["public/Game/sounds/vault-close.mp3"],
      volume: 0.8,
    });

    const style = new TextStyle({
      fontFamily: "Arial",
      fontSize: 15,
      fill: ["white"],
      stroke: "red",
      fontWeight: "lighter",
      lineJoin: "round",
      strokeThickness: 2,
    });

    this.timerText = new Text();
    this.timer = new Timer((time) => {
      if (this.timerText) {
        this.timerText.text = time;
        this.timerText.style = style;
      }
    });

    this.timerText.x = window.innerWidth / 2 - this.door.width / 2 - 50;
    this.timerText.y = window.innerHeight / 2 - this.door.height / 10;

    // Door
    this.door.x = window.innerWidth / 2 + 20;
    this.door.y = window.innerHeight / 2 - 10;

    // Door open
    this.doorOpen.x = window.innerWidth / 2 + this.door.width / 1.4;
    this.doorOpen.y = window.innerHeight / 2;

    // Door open shadow
    this.doorOpenShadow.x = window.innerWidth / 2 + this.door.width / 1.4 + 20;
    this.doorOpenShadow.y = window.innerHeight / 2 + 20;

    // Handle
    this.handle.eventMode = "static";
    this.handle.cursor = "pointer";
    this.handle.x = window.innerWidth / 2;
    this.handle.y = window.innerHeight / 2 - 10;

    // Handle shadow
    this.handleShadow.x = window.innerWidth / 2 + 10;
    this.handleShadow.y = window.innerHeight / 2 - 10;

    this.addChild(
      this.background,
      this.door,
      this.handleShadow,
      this.handle,
      this.timerText
    );
  }

  private setupInteractions() {
    const leftSide = new Graphics()
      .beginFill(0xffffff, 0.01)
      .drawRect(0, 0, window.innerWidth / 2, window.innerHeight)
      .endFill();
    leftSide.interactive = true;
    leftSide.cursor = "poiner";
    leftSide.on("pointerdown", this.onCounterclockwiseSpin, this);

    const rightSide = new Graphics()
      .beginFill(0xffffff, 0.01) // TODO: Relplace color with 0xffffff
      .drawRect(
        window.innerWidth / 2,
        0,
        window.innerWidth / 2,
        window.innerHeight
      )
      .endFill();
    rightSide.interactive = true;
    rightSide.cursor = "pointer";
    rightSide.on("pointerdown", this.onClockwiseSpin, this);

    this.addChild(leftSide, rightSide);
  }

  private onClockwiseSpin() {
    console.log("Clockwise spin");

    this.handle.spinClockwise();
    this.handleShadow.spinClockwise();
    this.onTap("clockwise");
  }

  private onCounterclockwiseSpin() {
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
        console.log("⛔ Game over!");
        // Game should reset and handle should spin
        this.onCrazyHandleSpin();
        this.restartGame();
      } else {
        console.log("Correct! currentPair:", currentPair);
        this.isWinner = i === this.vaultCombination.length - 1;
      }
    }

    if (this.isWinner) {
      this.timer.stop();

      if (this.winSound) {
        this.winSound.play();
      }

      console.log("🔓 Winner! 🪙🪙🪙");
      this.removeChild(this.handle, this.handleShadow, this.door);
      this.addChild(this.doorOpenShadow, this.doorOpen);

      this.blink = new Blink(config.effects.blink);
      this.addChild(this.blink);

      setTimeout(() => {
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
    if (this.themeSong) {
      this.themeSong.play();
    }
    this.setupInteractions();
    this.getVaultCombination();
    this.timer.start();
  }

  restartGame() {
    if (this.winSound) {
      this.winSound.stop();
    }

    if (this.vaultCloseSound) {
      this.vaultCloseSound.play();
    }

    this.removeChild(this.blink, this.doorOpen, this.doorOpenShadow);
    this.addChild(this.door, this.handleShadow, this.handle);

    this.vaultCombination = [];
    this.currentCombination = { number: 0, direction: null };
    this.userEnteredCombination = [];
    this.isWinner = false;

    this.getVaultCombination();
    this.timer.reset();
    this.timer.start();
  }

  onResize(width: number, height: number) {
    if (this.door) {
      this.door.x = window.innerWidth / 2 + 20;
      this.door.y = window.innerHeight / 2 - 10;
    }

    if (this.handle) {
      this.handle.x = window.innerWidth / 2;
      this.handle.y = window.innerHeight / 2 - 10;
    }

    if (this.handleShadow) {
      this.handleShadow.x = window.innerWidth / 2 + 10;
      this.handleShadow.y = window.innerHeight / 2 - 10;
    }

    if (this.doorOpen) {
      this.doorOpen.x = window.innerWidth / 1.3;
      this.doorOpen.y = window.innerHeight / 2;
    }

    if (this.background) {
      this.background.resize(width, height);
    }
  }
}
