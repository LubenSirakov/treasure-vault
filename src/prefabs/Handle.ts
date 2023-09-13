import { Sounds } from "./Sounds";
import { Vault } from "./Vault";
import gsap from "gsap";
import { centerObjects } from "../utils/misc";

export type HandleConfig = {
  asset: string;
};

export class Handle extends Vault {
  name = "Handle";

  private sounds: Sounds;

  constructor(config: HandleConfig) {
    super(config);

    this.sounds = new Sounds();

    centerObjects(this);
  }

  spinClockwise() {
    gsap.to(this, {
      rotation: this.rotation + Math.PI * 0.5,
      duration: 1,
    });

    this.sounds.playHandleRotationSound();
  }

  spinCounterclockwise() {
    gsap.to(this, {
      rotation: this.rotation - Math.PI * 0.5,
      duration: 1,
    });

    this.sounds.playHandleRotationSound();
  }

  crazyHandleSpin() {
    this.sounds.playSafeSpinSound();

    gsap.to(this, {
      rotation: this.rotation + Math.PI * 100,
      duration: 1,
      onComplete: () => {
        this.sounds.stopSafeSpinSound();
      },
    });
  }
}
