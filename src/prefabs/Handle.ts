import { Sounds } from "./Sounds";
import { VaultElement } from "./VaultElement";
import gsap from "gsap";
import { centerObjects } from "../utils/misc";

export type VaultElementConfig = {
  asset: string;
};

export class Handle extends VaultElement {
  name = "Handle";

  private sounds: Sounds;

  constructor(config: VaultElementConfig) {
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
