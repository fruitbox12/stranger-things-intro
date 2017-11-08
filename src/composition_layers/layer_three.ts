import { Layer } from '../video_player/layer';
import { Interpolator, Interpolation } from '../video_player/interpolator';
import { TEXT_COLOR, SHADOW_COLOR, SHADOW_BLUR } from './constants';

export class LayerThree extends Layer {
  private readonly yOffset: Interpolator = Interpolation.linear(0.5, 0.6, 3);

  paint(ctx: CanvasRenderingContext2D, percentage: number, { width, height}: {
    width: number,
    height: number,
  }) {
    ctx.save();

    ctx.lineWidth = 40;
    ctx.shadowColor = SHADOW_COLOR; //lighten(color, 20%);
    ctx.strokeStyle = TEXT_COLOR;
    ctx.shadowBlur = SHADOW_BLUR;

    const [ originX, originY ] = [0 - 200 * (percentage / 100), height / 2 + 150];
    const aspectRatio = 1.25;
    const scaleX = 1.33;
    const rotationAngle = -10 * Math.PI / 180;

    ctx.translate(originX, originY);
    ctx.rotate(rotationAngle);

    const innerCircleRadius = height / 4;

    ctx.scale(scaleX, scaleX * aspectRatio);
    ctx.beginPath();
    ctx.arc(0, 0, innerCircleRadius, 0, 2 * Math.PI, true);
    ctx.stroke();

    ctx.scale(scaleX, scaleX / aspectRatio);

    ctx.beginPath();
    ctx.arc(0, 0, innerCircleRadius + 300, Math.PI / 2, Math.PI, true);
    ctx.stroke();

    ctx.restore();

    const lineWidth = 50;
    ctx.lineWidth = lineWidth;
    ctx.shadowColor = SHADOW_COLOR;
    ctx.strokeStyle = TEXT_COLOR;
    ctx.shadowBlur = SHADOW_BLUR;

    ctx.beginPath();
    ctx.moveTo(width - 150 + (percentage / 100) * (150 + lineWidth), 0);
    ctx.lineTo(width - 150 + (percentage / 100) * (150 + lineWidth), height);
    ctx.stroke();
  }
}
