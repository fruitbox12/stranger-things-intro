import { Time } from './time';
import { Layer } from './layer';

type Options = {
  startTime: Time,
  endTime: Time,
  layers: Layer[],
};

export class Composition {
  private startTime: Time;
  private endTime: Time;
  private duration: number; //duration in milliseconds
  private layers: Layer[];

  constructor({ startTime, endTime, layers }: Options) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.layers = layers;
    this.duration = Time.duration(startTime, endTime);
  }

  render(ctx: CanvasRenderingContext2D, currentTime: Time, { width, height }: {
    width: number,
    height: number,
  }) {
    const timeElapsed = Time.duration(this.startTime, currentTime);
    const percentage = (timeElapsed / this.duration) * 100;

    this.layers.forEach(layer => {
      ctx.save(); //always pass a fresh context to each layer
      layer.paint(ctx, percentage, { width, height });
      ctx.restore(); //restore the settings
    });
  }

  canBeRendered(currentTime: Time): boolean {
    return currentTime.liesBetween(this.startTime, this.endTime);
  }
}
