import { Time } from './time';
import { Layer } from './layer';

type Options = {
  startTime: Time,
  endTime: Time,
  layers: Layer[],
  adjustmentLayers?: Layer[],
};

export class Composition {
  private startTime: Time;
  private endTime: Time;
  private duration: number; //duration in milliseconds
  private layers: Layer[];
  private adjustmentLayers?: Layer[];

  constructor({ startTime, endTime, layers, adjustmentLayers }: Options) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.layers = layers;
    this.adjustmentLayers = adjustmentLayers || [];
    this.duration = Time.duration(startTime, endTime);
  }

  render(ctx: CanvasRenderingContext2D, currentTime: Time, { width, height }: {
    width: number,
    height: number,
  }) {
    const timeElapsed = Time.duration(this.startTime, currentTime);
    const paintLayers = this.paintLayers.bind(this, ctx, timeElapsed, { width, height });

    ctx.save();
    paintLayers(this.adjustmentLayers);
    const layers = this.layers
        .filter(layer => (layer.hasCustomTimeRange()
            ? layer.canBePainted(Time.fromMilliseconds(timeElapsed)) : true));
    paintLayers(layers);
    ctx.restore();
  }

  paintLayers(ctx: CanvasRenderingContext2D, timeElapsed: number, { width, height }: {
    width: number,
    height: number,
  }, layers: Layer[]) {
    const now = Time.fromMilliseconds(timeElapsed); //now is `currentTime` with respect to this composition for a given layer
    const percentage = (timeElapsed / this.duration) * 100;

    layers.forEach(layer => {
      this.adjustmentLayers.length === 0 && ctx.save(); //always pass a fresh context to each layer
      layer.paint(
        ctx,
        layer.hasCustomTimeRange() ? layer.getPercentageTimeElapsed(now) : percentage,
        { width, height },
      );
      this.adjustmentLayers.length === 0 && ctx.restore();
    });
  }

  canBeRendered(currentTime: Time): boolean {
    return currentTime.liesBetween(this.startTime, this.endTime);
  }
}
