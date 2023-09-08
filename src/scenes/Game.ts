import config from "../config";
import { Player } from "../prefabs/Player";
import Scene from "../core/Scene";
import SpineAnimation from "../core/SpineAnimation";
import Background from "../prefabs/Background";
import { Door } from "../prefabs/Door";
import { Handle } from "../prefabs/Handle";

export default class Game extends Scene {
  name = "Game";

  private player!: Player;
  private door!: Door;
  private doorOpen!: Door;
  private handle!: Handle;
  private background!: Background;

  load() {
    this.background = new Background(config.backgrounds.vault);
    this.player = new Player();

    this.door = new Door(config.doors.closedDoor);
    this.doorOpen = new Door(config.doors.openedDoor);
    this.handle = new Handle(config.handles.handle);

    this.player.x = window.innerWidth / 2;
    this.player.y = window.innerHeight - this.player.height / 3;

    this.door.x = window.innerWidth / 2 + 10;
    this.door.y = window.innerHeight - this.door.height + 75;

    this.doorOpen.x = window.innerWidth / 2;
    this.doorOpen.y = window.innerHeight - this.doorOpen.height;

    this.handle.x = window.innerWidth / 2 - 10;
    this.handle.y = window.innerHeight - this.handle.height * 1.8;

    this.background.initPlayerMovement(this.player);

    this.addChild(
      this.background,
      // this.player,
      this.door,
      // this.doorOpen,
      this.handle
    );
  }

  async start() {
    // Example of how to play a spine animation
    // const vine = new SpineAnimation("vine-pro");
    // vine.stateData.setMix("grow", "grow", 0.5);
    // vine.x = 0;
    // vine.y = window.innerHeight / 2 - 50;
    // this.background.addChild(vine);
    // while (vine) {
    //   await vine.play("grow");
    // }
  }

  onResize(width: number, height: number) {
    if (this.player) {
      this.player.x = width / 2;
      this.player.y = height - this.player.height / 3;
    }

    if (this.door) {
      this.door.x = width / 2;
      this.door.y = height - this.door.height + 75;
    }

    if (this.background) {
      this.background.resize(width, height);
    }
  }
}
