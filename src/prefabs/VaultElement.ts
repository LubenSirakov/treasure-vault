import { Container, Sprite, Texture } from "pixi.js";
import { centerObjects } from "../utils/misc";

export type VaultElementConfig = {
  asset: string;
};

export class VaultElement extends Container {
  name = "VaultElement";

  asset: string = "";

  constructor(
    protected config: VaultElementConfig = {
      asset: "",
    }
  ) {
    super();

    this.init();

    centerObjects(this);
  }

  init() {
    const texture = Texture.from(this.config.asset);

    const vaultElementSprite = new Sprite(texture);

    vaultElementSprite.anchor.set(0.5);

    this.addChild(vaultElementSprite);
  }
}
