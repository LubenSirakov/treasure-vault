export class Timer {
  private startTime: number | null;
  private endTime: number | null;
  private intervalId: number | null;
  private onUpdate: (time: string) => void;

  constructor(onUpdate: (time: string) => void) {
    this.startTime = null;
    this.endTime = null;
    this.intervalId = null;
    this.onUpdate = onUpdate;
  }

  start() {
    this.startTime = Date.now();
    this.endTime = null;

    this.intervalId = setInterval(() => this.update(), 10);
  }

  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.endTime = Date.now();
      this.intervalId = null;
      this.update();
    }
  }

  reset() {
    this.startTime = null;
    this.endTime = null;
    this.update();
  }

  update() {
    if (this.startTime !== null) {
      const currentTime = this.endTime !== null ? this.endTime : Date.now();
      const elapsedTime = currentTime - this.startTime;
      const seconds = Math.floor(elapsedTime / 1000);
      const milliseconds = (elapsedTime % 1000)
        .toString()
        .padStart(3, "0")
        .slice(0, 2);
      const formattedTime = `${seconds}.${milliseconds}`;
      this.onUpdate(formattedTime);
    } else {
      this.onUpdate("0.00");
    }
  }
}
