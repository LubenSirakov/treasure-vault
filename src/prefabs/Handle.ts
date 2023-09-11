import { Container, Texture, TilingSprite } from "pixi.js";
import { centerObjects } from "../utils/misc";
import gsap from "gsap";
import { Howl } from "howler";

export type HandleConfig = {
  asset: string;
};

export class Handle extends Container {
  name = "Handle";

  private sound: Howl | null = null;
  private safeSpinSound: Howl | null = null;

  constructor(
    protected config: HandleConfig = {
      asset: "",
    }
  ) {
    super();

    this.init();

    centerObjects(this);

    this.loadSound();
  }

  init() {
    const texture = Texture.from(this.config.asset);
    const scaleFactor = window.innerHeight / texture.height;

    const tilingSprite = new TilingSprite(
      texture,
      texture.width,
      texture.height
    );

    tilingSprite.scale.set(scaleFactor / 3.7);
    tilingSprite.name = this.config.asset;
    tilingSprite.anchor.set(0.5);

    this.addChild(tilingSprite);
  }

  private loadSound() {
    this.sound = new Howl({
      src: ["public/Game/sounds/handle-rotating.wav"],
      volume: 0.8,
    });

    this.safeSpinSound = new Howl({
      src: ["public/Game/sounds/safe-locking.mp3"],
      volume: 0.8,
    });
  }

  spinClockwise() {
    gsap.to(this, {
      rotation: this.rotation + Math.PI * 0.5,
      duration: 1,
    });
    if (this.sound) {
      this.sound.play();
    }
  }

  spinCounterclockwise() {
    gsap.to(this, {
      rotation: this.rotation - Math.PI * 0.5,
      duration: 1,
    });
    if (this.sound) {
      this.sound.play();
    }
  }

  crazyHandleSpin() {
    if (this.safeSpinSound) {
      this.safeSpinSound.play();
    }
    gsap.to(this, {
      rotation: this.rotation + Math.PI * 4,
      duration: 1,
      onComplete: () => {
        this.safeSpinSound?.stop();
      },
    });
  }
}
