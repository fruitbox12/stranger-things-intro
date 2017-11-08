import { Layer } from '../video_player/layer';
import { Interpolator, Interpolation } from '../video_player/interpolator';
import { TEXT_COLOR, SHADOW_COLOR, SHADOW_BLUR, getShadowRgbColor } from './constants';

export class LayerSix extends Layer {
  private readonly xOffset: Interpolator = Interpolation.linear(0, 20);
  private readonly yOffset: Interpolator = Interpolation.linear(0, 5);
  private readonly opacity: Interpolator = Interpolation.linear(1, 0);

  paint(ctx: CanvasRenderingContext2D, percentage: number, { width, height}: {
    width: number,
    height: number,
  }) {
    ctx.translate(200 + width / 2, height / 2);
    ctx.scale(8, 8);

    ctx.font = `200px StrangerThings`;
    ctx.strokeStyle = getShadowRgbColor(this.opacity(percentage));
    ctx.lineWidth = 2;
    ctx.shadowColor = SHADOW_COLOR;
    ctx.shadowBlur = SHADOW_BLUR;

    const verticalSpacing = 20;
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'center';
    ctx.strokeText('T', -60 - this.xOffset(percentage), -verticalSpacing + this.yOffset(percentage));
    ctx.scale(-1, 1);
    ctx.strokeText('R', -(60 + this.xOffset(percentage)), -verticalSpacing + this.yOffset(percentage)); //have to flip X as we did -1 scale above
    ctx.scale(-1, 1);

    ctx.textBaseline = 'hanging';
    ctx.textAlign = 'center';
    ctx.strokeText('T', -110 + this.xOffset(percentage), 10 + this.yOffset(percentage));
    ctx.strokeText('H', 80 - this.xOffset(percentage), 10 + this.yOffset(percentage));
  }
}
