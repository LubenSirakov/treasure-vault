import { Container, Sprite, Texture, TilingSprite } from "pixi.js";
import Keyboard from "../core/Keyboard";
import SpritesheetAnimation from "../core/SpritesheetAnimation";
import { centerObjects } from "../utils/misc";

export type DoorConfig = {
  layers: string[];
  panSpeed: number;
};

export class Door extends Container {
  name = "Door";

  layers: string[] = [];
  tilingSprites: TilingSprite[] = [];

  constructor(
    protected config: DoorConfig = {
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

      tilingSprite.scale.set(scaleFactor / 1.6); // TODO: Remove hardcoded value
      tilingSprite.name = layer;
      tilingSprite.anchor.set(0.5);

      this.tilingSprites.push(tilingSprite);
      this.addChild(tilingSprite);
    }
  }
}
