import config from "../config";
import Scene from "../core/Scene";
import Background from "../prefabs/Background";
import { Door } from "../prefabs/Door";
import { Handle } from "../prefabs/Handle";
import { Graphics } from "pixi.js";
import gsap from "gsap";
import { generateVaultCombination } from "../utils/combinationGenerator";

type CombinationPair = {
  number: number;
  direction: string | null;
};

export default class Game extends Scene {
  name = "Game";

  private door!: Door;
  private doorOpen!: Door;
  private handle!: Handle;
  private background!: Background;
  private isSpinning: boolean = false;
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
    this.handle = new Handle(config.handles.handle);

    // Door
    this.door.x = window.innerWidth / 2 + 20;
    this.door.y = window.innerHeight / 2 - 10;

    // Door open
    this.doorOpen.x = window.innerWidth / 2;
    this.doorOpen.y = window.innerHeight - this.doorOpen.height;

    // Handle
    this.handle.eventMode = "static";
    this.handle.cursor = "pointer";
    this.handle.x = window.innerWidth / 2;
    this.handle.y = window.innerHeight / 2 - 10;

    this.addChild(
      this.background,
      this.door,
      // this.doorOpen,
      this.handle
    );
  }

  private setupInteractions() {
    const leftSide = new Graphics()
      .beginFill(0xffffff, 0.1)
      .drawRect(0, 0, window.innerWidth / 2, window.innerHeight)
      .endFill();
    leftSide.interactive = true;
    leftSide.cursor = "poiner";
    leftSide.on("pointerdown", this.spinCounterclockwise, this);

    const rightSide = new Graphics()
      .beginFill(0xff0000, 0.1) // TODO: Relplace color with 0xffffff
      .drawRect(
        window.innerWidth / 2,
        0,
        window.innerWidth / 2,
        window.innerHeight
      )
      .endFill();
    rightSide.interactive = true;
    rightSide.cursor = "pointer";
    rightSide.on("pointerdown", this.spinClockwise, this);

    this.addChild(leftSide, rightSide);
  }

  private spinClockwise() {
    console.log("spinClockwise");

    // if (!this.isSpinning) {
    gsap.to(this.handle, {
      rotation: this.handle.rotation + Math.PI * 0.5,
      duration: 1,
      onComplete: () => {
        // this.isSpinning = false;
      },
    });
    this.onTap("clockwise");
    // this.isSpinning = true;
    // }
  }

  private spinCounterclockwise() {
    console.log("spinCounterclockwise");
    // if (!this.isSpinning) {
    gsap.to(this.handle, {
      rotation: this.handle.rotation - Math.PI * 0.5,
      duration: 1,
      onComplete: () => {
        // this.isSpinning = false;
      },
    });
    this.onTap("counterclockwise");
    // this.isSpinning = true;
    // }
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
        console.log("Error brat me!");

        // Game should reset and handle should spin
      }
      console.log("currentPair", currentPair);
    }

    // const isCorrect =
  }

  async start() {
    this.setupInteractions();

    const vaultCombination = generateVaultCombination();
    vaultCombination.forEach((pair) => {
      const [number, direction] = pair.split(" ");
      this.vaultCombination.push({ number: Number(number), direction });
    });

    console.log(`Vault Combination: ${vaultCombination.join(", ")}`);
    console.log("this.vaultCombination", this.vaultCombination);
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

    if (this.background) {
      this.background.resize(window.innerWidth, window.innerHeight);
    }
  }
}
