import { Container, Texture, TilingSprite } from "pixi.js";
import { centerObjects } from "../utils/misc";
import gsap from "gsap";
import { Howl } from "howler";
import { Sounds } from "./Sounds";

export type HandleConfig = {
  asset: string;
};

export class Handle extends Container {
  name = "Handle";

  private sounds: Sounds;

  constructor(
    protected config: HandleConfig = {
      asset: "",
    }
  ) {
    super();

    this.init();

    centerObjects(this);

    this.sounds = new Sounds();
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

  spinClockwise() {
    gsap.to(this, {
      rotation: this.rotation + Math.PI * 0.5,
      duration: 1,
    });

    this.sounds.playHandleRotationSound();
  }

  spinCounterclockwise() {
    gsap.to(this, {
      rotation: this.rotation - Math.PI * 0.5,
      duration: 1,
    });

    this.sounds.playHandleRotationSound();
  }

  crazyHandleSpin() {
    this.sounds.playSafeSpinSound();

    gsap.to(this, {
      rotation: this.rotation + Math.PI * 100,
      duration: 1,
      onComplete: () => {
        this.sounds.stopSafeSpinSound();
      },
    });
  }
}
