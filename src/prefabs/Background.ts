import { Container, Sprite, Texture } from "pixi.js";
import gsap from "gsap";

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

    this.setDimentions(backgroundSprite, window.innerWidth, window.innerHeight);

    backgroundSprite.position.set(
      window.innerWidth / 2,
      window.innerHeight / 2
    );

    backgroundSprite.anchor.set(0.5);

    this.backgroundSprites.push(backgroundSprite);
    this.addChild(backgroundSprite);
  }

  setDimentions(sprite: Sprite, windowWidth: number, windowHeight: number) {
    if (windowHeight > windowWidth) {
      const scaleFactor = windowWidth / sprite.texture.width;
      sprite.width = windowWidth;
      sprite.height = sprite.texture.height * scaleFactor;
      sprite.scale.set(scaleFactor * 2);
    } else {
      const scaleFactorWidth = windowWidth / sprite.texture.width;
      const scaleFactorHeight = windowHeight / sprite.texture.height;
      const scaleFactor = Math.max(scaleFactorWidth, scaleFactorHeight);

      sprite.width = windowWidth;
      sprite.height = windowHeight;
      sprite.scale.set(scaleFactor);
    }
  }

  resize(width: number, height: number) {
    for (const layer of this.backgroundSprites) {
      this.setDimentions(layer, width, height);
      layer.position.set(width / 2, height / 2);

      gsap.to(layer, {
        duration: 0.5,
        width: layer.width,
        height: layer.height,
        ease: "power2.out",
      });
    }
  }
}
