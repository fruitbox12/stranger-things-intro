import { Layer } from '../video_player/layer';
import { Interpolator, Interpolation } from '../video_player/interpolator';
import { TEXT_COLOR, SHADOW_COLOR, SHADOW_BLUR } from './constants';

export class LayerFour extends Layer {
  private readonly sCoordinates: {
    x: Interpolator,
    y: Interpolator,
  } = {
    x: Interpolation.linear(0, -20),
    y: Interpolation.linear(0, -5),
  };

  private readonly gCoordinates: {
    x: Interpolator,
    y: Interpolator,
  } = {
    x: Interpolation.linear(10, 30),
    y: Interpolation.linear(-10.5, -5),
  };

  paint(ctx: CanvasRenderingContext2D, percentage: number, { width, height}: {
    width: number,
    height: number,
  }) {
    ctx.translate(width / 2, height / 2);
    ctx.scale(15, 19);

    ctx.font = `200px StrangerThings`;
    ctx.strokeStyle = TEXT_COLOR;
    ctx.lineWidth = 2;
    ctx.shadowColor = SHADOW_COLOR;
    ctx.shadowBlur = SHADOW_BLUR;

    ctx.textBaseline = 'hanging';
    ctx.textAlign = 'center';
    ctx.strokeText('A', this.sCoordinates.x(percentage), this.sCoordinates.y(percentage))

    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'center';
    ctx.strokeText('s', this.gCoordinates.x(percentage), this.gCoordinates.y(percentage));
  }
}
