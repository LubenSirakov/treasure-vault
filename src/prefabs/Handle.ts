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
    const stageCenterX = window.innerWidth / 2;
    const stageCenterY = window.innerHeight / 2;

    for (const layer of this.config.layers) {
      const texture = Texture.from(layer);
      const scaleFactor = window.innerHeight / texture.height;

      const tilingSprite = new TilingSprite(
        texture,
        window.innerWidth, // Set the width to match the window width
        window.innerHeight // Set the height to match the window height
      );

      console.log(
        "testis",
        layer,
        scaleFactor,
        window.innerHeight,
        texture.height
      );

      tilingSprite.scale.set(0.35 * scaleFactor); // Scale the sprite based on the height scale factor
      tilingSprite.name = layer;

      // Calculate the position to center the sprite on the stage
      tilingSprite.x = stageCenterX;
      tilingSprite.y = stageCenterY;

      tilingSprite.anchor.set(0.5);
      this.tilingSprites.push(tilingSprite);
      this.addChild(tilingSprite);
    }
  }
}
