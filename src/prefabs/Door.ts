import { Container, Texture, TilingSprite } from "pixi.js";
import { centerObjects } from "../utils/misc";

export type DoorConfig = {
  asset: string;
};

export class Door extends Container {
  name = "Door";

  asset: string = "";

  constructor(
    protected config: DoorConfig = {
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

    tilingSprite.scale.set(scaleFactor / 1.6); // TODO: Remove hardcoded value
    tilingSprite.name = this.config.asset;
    tilingSprite.anchor.set(0.5);

    this.addChild(tilingSprite);
  }
}
