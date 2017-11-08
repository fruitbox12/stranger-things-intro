import { Layer } from '../../video_player/layer';
import { Interpolator, Interpolation } from '../../video_player/interpolator';
import { TEXT_COLOR, SHADOW_COLOR, SHADOW_BLUR } from '../constants';

export class PartialTitleZoomout extends Layer {
  paint(ctx: CanvasRenderingContext2D, percentage: number, { width, height}: {
    width: number,
    height: number,
  }) {
    // S RANGE
    // T ING
  }
}

export const Layers = [
  new PartialTitleZoomout(),
  // new LetterNFittingIn(),
  // new LetterTFittingIn(),
  // new LetterEFittingIn(),
  // new LetterHFittingIn(),
  // new LetterSFittingIn(),
  // new LetterSMovingRight(),
  // new TopRectangleReveal(),
  // new BottomRectangleReveals(),
];
