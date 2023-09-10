import { AnimatedSprite, Container, Texture, TilingSprite } from "pixi.js";
import { centerObjects } from "../utils/misc";

export type BlinkConfig = {
  asset: string;
};

export class Blink extends Container {
  name = "Blink";

  tilingSprites: TilingSprite[] = [];
  blinkingLights: Texture[] = [];

  constructor(
    protected config: BlinkConfig = {
      asset: "",
    }
  ) {
    super();

    this.init();

    centerObjects(this);
  }

  init() {
    const centerX = this.width / 2;
    const centerY = this.height / 2;

    const blinkPositions = [
      { x: -120, y: -10 },
      { x: -20, y: -10 },
      { x: 50, y: 70 },
    ];

    for (let i = 0; i < 3; i++) {
      const texture = Texture.from(this.config.asset);
      this.blinkingLights.push(texture);
    }

    for (let i = 0; i < 3; i++) {
      const blink = new AnimatedSprite(this.blinkingLights);

      blink.x = centerX + blinkPositions[i].x;
      blink.y = centerY + blinkPositions[i].y;
      blink.anchor.set(0.5);
      blink.scale.set(0.3);
      this.addChild(blink);
    }
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
