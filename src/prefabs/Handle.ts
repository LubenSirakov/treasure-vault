import { Container, Texture, TilingSprite } from "pixi.js";
import { centerObjects } from "../utils/misc";

export type HandleConfig = {
  layers: string[];
  panSpeed: number;
};

export class Handle extends Container {
  name = "Handle";

  layers: string[] = [];
  tilingSprites: TilingSprite[] = [];
  dragTarget: TilingSprite | null = null;

  state = {
    idle: true,
    spinning: false,
  };

  constructor(
    protected config: HandleConfig = {
      panSpeed: 1,
      layers: [],
    }
  ) {
    super();

    this.init();

    centerObjects(this);
  }

  init() {
    for (const layer of this.config.layers) {
      const texture = Texture.from(layer);
      const scaleFactor = window.innerHeight / texture.height;

      const tilingSprite = new TilingSprite(
        texture,
        texture.width,
        texture.height
      );

      tilingSprite.scale.set(scaleFactor / 3.5); // Scale the sprite based on the height scale factor
      tilingSprite.name = layer;
      tilingSprite.anchor.set(0.5);

      this.tilingSprites.push(tilingSprite);

      this.addChild(tilingSprite);
    }
  }
}
