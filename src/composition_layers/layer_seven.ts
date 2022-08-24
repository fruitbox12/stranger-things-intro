import { Layer } from '../video_player/layer';
import { Interpolator, Interpolation } from '../video_player/interpolator';
import { TEXT_COLOR, SHADOW_COLOR, SHADOW_BLUR, getShadowRgbColor } from './constants';

export class LayerSeven extends Layer {
  private readonly ngSpacing: Interpolator = Interpolation.linear(0, 60);
  private readonly opacity: Interpolator = Interpolation.linear(0, 1);

  paint(ctx: CanvasRenderingContext2D, percentage: number, { width, height}: {
    width: number,
    height: number,
  }) {
    const fontSize = 200;
    const scaleFactor = 4;

    ctx.translate(width / 2, height / 2);
    ctx.scale(scaleFactor, scaleFactor);

    ctx.font = `200px StrangerThings`;
    ctx.strokeStyle = getShadowRgbColor(this.opacity(percentage));
    ctx.lineWidth = 2;
    ctx.shadowColor = SHADOW_COLOR;
    ctx.shadowBlur = SHADOW_BLUR;

    ctx.textBaseline = 'middle';
    ctx.textAlign = 'right';
    ctx.strokeText('A', -60 + this.ngSpacing(percentage), 0)

    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.strokeText('WS', 110 - this.ngSpacing(percentage), 0)
  }
}
