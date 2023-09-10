import { Container, Texture, TilingSprite } from "pixi.js";
import { centerObjects } from "../utils/misc";

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

    tilingSprite.scale.set(scaleFactor / 3.7); // Scale the sprite based on the height scale factor
    tilingSprite.name = this.config.asset;
    tilingSprite.anchor.set(0.5);

    this.addChild(tilingSprite);
  }
}
