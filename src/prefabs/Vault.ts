import { Container, Sprite, Texture, TilingSprite } from "pixi.js";
import { centerObjects } from "../utils/misc";

export type VaultConfig = {
  asset: string;
};

export class Vault extends Container {
  name = "Vault";

  asset: string = "";

  constructor(
    protected config: VaultConfig = {
      asset: "",
    }
  ) {
    super();

    this.init();

    centerObjects(this);
  }

  init() {
    const texture = Texture.from(this.config.asset);

    const vaultSprite = new Sprite(texture);

    vaultSprite.anchor.set(0.5);

    this.addChild(vaultSprite);
  }
}
