import { Container, Texture, Ticker, TilingSprite } from "pixi.js";
import { centerObjects } from "../utils/misc";

export type BgConfig = {
  asset: string;
};

export default class Background extends Container {
  name = "Background";

  asset: string = "";
  tilingSprites: TilingSprite[] = [];

  constructor(
    protected config: BgConfig = {
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

    tilingSprite.scale.set(scaleFactor);
    tilingSprite.name = this.config.asset;
    tilingSprite.anchor.set(0.5);
    this.tilingSprites.push(tilingSprite);
    this.addChild(tilingSprite);
  }

  resize(width: number, height: number) {
    for (const layer of this.tilingSprites) {
      const scaleFactor = height / layer.texture.height;

      layer.width = width / scaleFactor;
      layer.scale.set(scaleFactor);
    }

    centerObjects(this);
  }
}
