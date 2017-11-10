import { Layer } from '../video_player/layer';
import { Interpolator, Interpolation } from '../video_player/interpolator';
import { TEXT_COLOR, SHADOW_COLOR, SHADOW_BLUR } from './constants';

export class LayerFive extends Layer {
  private readonly sCoordinates: {
    x: Interpolator,
    y: Interpolator,
  } = {
    x: Interpolation.linear(45, 40),
    y: Interpolation.linear(25, 20),
  };

  private readonly rCoordinates: {
    x: Interpolator,
    y: Interpolator,
  } = {
    x: Interpolation.linear(-110, -103),
    y: Interpolation.linear(25, 27),
  };

  paint(ctx: CanvasRenderingContext2D, percentage: number, { width, height}: {
    width: number,
    height: number,
  }) {
    ctx.translate(width / 2, height / 2);
    ctx.scale(11, 11);

    ctx.font = `200px StrangerThings`;
    ctx.strokeStyle = TEXT_COLOR;
    ctx.lineWidth = 2;
    ctx.shadowColor = SHADOW_COLOR;
    ctx.shadowBlur = SHADOW_BLUR;

    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.strokeText('S', this.sCoordinates.x(percentage), this.sCoordinates.y(percentage))

    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.strokeText('R', this.rCoordinates.x(percentage), this.rCoordinates.y(percentage));
  }
}
