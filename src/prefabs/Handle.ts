import { Container, Texture, TilingSprite } from "pixi.js";
import { centerObjects } from "../utils/misc";
import gsap from "gsap";

export type HandleConfig = {
  asset: string;
};

export class Handle extends Container {
  name = "Handle";

  layers: string[] = [];

  state = {
    idle: true,
    spinning: false,
  };

  constructor(
    protected config: HandleConfig = {
      asset: "",
    }
  ) {
    super();

    this.init();

    centerObjects(this);
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
      onComplete: () => {},
    });
  }

  spinCounterclockwise() {
    gsap.to(this, {
      rotation: this.rotation - Math.PI * 0.5,
      duration: 1,
      onComplete: () => {},
    });
  }

  crazyHandleSpin() {
    gsap.to(this, {
      rotation: this.rotation + Math.PI * 4,
      duration: 1,
    });
  }
}
