import config from "../config";
import { Player } from "../prefabs/Player";
import Scene from "../core/Scene";
import Background from "../prefabs/Background";
import { Door } from "../prefabs/Door";
import { Handle } from "../prefabs/Handle";
import { Graphics } from "pixi.js";
import gsap from "gsap";

export default class Game extends Scene {
  name = "Game";

  private player!: Player;
  private door!: Door;
  private doorOpen!: Door;
  private handle!: Handle;
  private background!: Background;
  private isSpinning: boolean = false;

  load() {
    this.background = new Background(config.backgrounds.vault);
    this.player = new Player();

    this.door = new Door(config.doors.closedDoor);
    this.doorOpen = new Door(config.doors.openedDoor);
    this.handle = new Handle(config.handles.handle);

    this.player.x = window.innerWidth / 2;
    this.player.y = window.innerHeight - this.player.height / 3;

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

    this.background.initPlayerMovement(this.player);

    this.addChild(
      this.background,
      // this.player,
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
    leftSide.on("pointerdown", this.spinCounterclockwise.bind(this));

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
    rightSide.on("pointerdown", this.spinClockwise.bind(this));

    this.addChild(leftSide, rightSide);
  }

  private spinClockwise() {
    console.log("spinClockwise");
    if (!this.isSpinning) {
      gsap.to(this.handle, {
        rotation: this.handle.rotation + Math.PI * 0.5,
        duration: 1,
        onComplete: () => {
          // this.isSpinning = false;
        },
      });
      // this.isSpinning = true;
    }
  }

  private spinCounterclockwise() {
    console.log("spinCounterclockwise");
    if (!this.isSpinning) {
      gsap.to(this.handle, {
        rotation: this.handle.rotation - Math.PI * 0.5,
        duration: 1,
        onComplete: () => {
          // this.isSpinning = false;
        },
      });
      // this.isSpinning = true;
    }
  }

  async start() {
    this.setupInteractions();
  }

  onResize(width: number, height: number) {
    if (this.player) {
      this.player.x = width / 2;
      this.player.y = height - this.player.height / 3;
    }

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
