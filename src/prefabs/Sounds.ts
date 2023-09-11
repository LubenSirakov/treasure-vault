import { Howl } from "howler";

export class Sounds {
  private themeSong!: Howl;
  private winSound!: Howl;
  private vaultCloseSound!: Howl;
  private errorSound!: Howl;
  private handleRotationSound!: Howl;
  private safeSpinSound!: Howl;

  constructor() {
    this.loadSound();
  }

  private loadSound() {
    this.themeSong = new Howl({
      src: ["public/Game/sounds/theme-song.mp3"],
      volume: 0.8,
      loop: true,
    });

    this.winSound = new Howl({
      src: ["public/Game/sounds/win.mp3"],
      volume: 1.0,
      loop: true,
    });

    this.vaultCloseSound = new Howl({
      src: ["public/Game/sounds/vault-close.mp3"],
      volume: 0.8,
    });

    this.errorSound = new Howl({
      src: ["public/Game/sounds/error.mp3"],
      volume: 1.0,
    });

    this.handleRotationSound = new Howl({
      src: ["public/Game/sounds/handle-rotating.wav"],
      volume: 0.8,
    });

    this.safeSpinSound = new Howl({
      src: ["public/Game/sounds/safe-locking.mp3"],
      volume: 0.8,
    });
  }

  playThemeSong() {
    if (this.themeSong) {
      this.themeSong.play();
    }
  }

  stopThemeSong() {
    if (this.themeSong) {
      this.themeSong.stop();
    }
  }

  playWinSound() {
    if (this.winSound) {
      this.winSound.play();
    }
  }

  stopWinSound() {
    if (this.winSound) {
      this.winSound.stop();
    }
  }

  playVaultCloseSound() {
    if (this.vaultCloseSound) {
      this.vaultCloseSound.play();
    }
  }

  stopVaultCloseSound() {
    if (this.vaultCloseSound) {
      this.vaultCloseSound.stop();
    }
  }

  playErrorSound() {
    if (this.errorSound) {
      this.errorSound.play();
    }
  }

  stopErrorSound() {
    if (this.errorSound) {
      this.errorSound.stop();
    }
  }

  playHandleRotationSound() {
    if (this.handleRotationSound) {
      this.handleRotationSound.play();
    }
  }

  stopHandleRotationSound() {
    if (this.handleRotationSound) {
      this.handleRotationSound.stop();
    }
  }

  playSafeSpinSound() {
    if (this.safeSpinSound) {
      this.safeSpinSound.play();
    }
  }

  stopSafeSpinSound() {
    if (this.safeSpinSound) {
      this.safeSpinSound.stop();
    }
  }
}
