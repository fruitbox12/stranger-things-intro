import { Layer } from '../video_player/layer';

export class EmptyLater extends Layer {
  paint(ctx: CanvasRenderingContext2D, percentage: number, { width, height}: {
    width: number,
    height: number,
  }) {
    // does nothing
  }
}
