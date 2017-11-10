import { Layer } from '../video_player/layer';
import { Interpolator, Interpolation } from '../video_player/interpolator';

export class EpisodeTitle extends Layer {
  private readonly opacity: Interpolator = Interpolation.linear(0, 1);

  paint(ctx: CanvasRenderingContext2D, percentage: number, { width, height}: {
    width: number,
    height: number,
  }) {
    const fontSize = 150;

    ctx.translate(width / 2, height / 2);

    ctx.font = `100px StrangerThings`;
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity(percentage)})`;

    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText('Episode one: Biased rendering', 0, 0);
  }
}
