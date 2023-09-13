import { Container, Sprite, Texture } from "pixi.js";

export type BgConfig = {
  asset: string;
};

export default class Background extends Container {
  name = "Background";

  asset: string = "";
  backgroundSprites: Sprite[] = [];

  constructor(
    protected config: BgConfig = {
      asset: "",
    }
  ) {
    super();

    this.init();
  }

  init() {
    const texture = Texture.from(this.config.asset);
    const backgroundSprite = new Sprite(texture);

    const scaleFactorWidth = window.innerWidth / backgroundSprite.texture.width;
    const scaleFactorHeight =
      window.innerHeight / backgroundSprite.texture.height;
    const scaleFactor = Math.max(scaleFactorWidth, scaleFactorHeight);

    backgroundSprite.width = window.innerWidth;
    backgroundSprite.height = window.innerHeight;
    backgroundSprite.scale.set(scaleFactor);

    backgroundSprite.position.set(
      window.innerWidth / 2,
      window.innerHeight / 2
    );

    backgroundSprite.anchor.set(0.5);

    this.backgroundSprites.push(backgroundSprite);
    this.addChild(backgroundSprite);
  }

  resize(width: number, height: number) {
    for (const layer of this.backgroundSprites) {
      const scaleFactorWidth = width / layer.texture.width;
      const scaleFactorHeight = height / layer.texture.height;
      const scaleFactor = Math.max(scaleFactorWidth, scaleFactorHeight);

      layer.width = width;
      layer.height = height;
      layer.scale.set(scaleFactor);

      layer.position.set(width / 2, height / 2);
    }
  }
}
