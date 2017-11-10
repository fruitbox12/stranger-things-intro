import { Time } from './time';

export abstract class Layer {
  constructor(
    private readonly startTime?: Time, //maybe this should go on the Composition
    private readonly endTime?: Time
  ) {
    //throw error if either of them are null instead of both
  }

  // percentage of duration elapsed, in order to interpolate values
  abstract paint(ctx: CanvasRenderingContext2D, percentage: number, {
    width,
    height
  }: { width: number, height: number }): void

  canBePainted(currentTime: Time): boolean {
    const milliseconds = currentTime.getMilliseconds();

    if (milliseconds > this.endTime.getMilliseconds()) {
      return true;
    }

    return (milliseconds >= this.startTime.getMilliseconds()
        && milliseconds <= this.endTime.getMilliseconds());
  }

  hasCustomTimeRange(): boolean {
    return this.startTime != null && this.endTime != null;
  }

  getPercentageTimeElapsed(currentTime: Time): number {
    const timeElapsed = Time.duration(this.startTime, currentTime);
    const layerDuration = Time.duration(this.startTime, this.endTime);

    return Math.min((timeElapsed / layerDuration) * 100, 100);
  }
}
