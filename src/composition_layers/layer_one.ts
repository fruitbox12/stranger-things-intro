import { Layer } from '../video_player/layer';
import { Interpolator, Interpolation } from '../video_player/interpolator';
import { TEXT_COLOR, SHADOW_COLOR, SHADOW_BLUR } from './constants';

export class LayerOne extends Layer {
  private readonly scale: Interpolator = Interpolation.linear(6, 3);

  paint(ctx: CanvasRenderingContext2D, percentage: number, { width, height}: {
    width: number,
    height: number,
  }) {
    const scale = this.scale(percentage);

    ctx.translate(width / 2, height / 2);
    ctx.scale(scale, scale);

    ctx.strokeStyle = TEXT_COLOR;
    ctx.lineWidth = 50;
    ctx.shadowColor = SHADOW_COLOR;
    ctx.shadowBlur = SHADOW_BLUR;

    // Draw an equilateral triangle
    ctx.beginPath();
    ctx.moveTo(0, -height/2);
    ctx.lineTo(-0.5 * (width / 2), (Math.sqrt(3) / 2) * (height / 2));
    ctx.lineTo(0.5 * (width / 2), (Math.sqrt(3) / 2) * (height / 2));
    ctx.lineTo(0, -height/2);
    ctx.stroke();
  }
}
