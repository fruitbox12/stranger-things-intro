import { Layer } from '../video_player/layer';
import { Interpolator, Interpolation } from '../video_player/interpolator';
import { TEXT_COLOR, SHADOW_COLOR, SHADOW_BLUR } from './constants';

export class LayerTwo extends Layer {
  private readonly yOffset: Interpolator = Interpolation.linear(0.5, 0.6, 3);

  paint(ctx: CanvasRenderingContext2D, percentage: number, { width, height}: {
    width: number,
    height: number,
  }) {
    const yOffset = this.yOffset(percentage);
    const fontSize = 1024;

    ctx.translate(width / 2, height * yOffset);
    ctx.scale(3, 3);

    ctx.font = `${fontSize}px StrangerThings`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = TEXT_COLOR;
    ctx.lineWidth = fontSize / 75;
    ctx.shadowColor = SHADOW_COLOR; //lighten(color, 20%);
    ctx.shadowBlur = SHADOW_BLUR;
    ctx.strokeText('N', -(width / 40), (height / 6)) ;
  }
}
