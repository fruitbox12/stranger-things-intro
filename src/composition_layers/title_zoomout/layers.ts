import { Layer } from '../../video_player/layer';
import { Interpolator, Interpolation } from '../../video_player/interpolator';
import { TEXT_COLOR, SHADOW_COLOR, SHADOW_BLUR } from '../constants';

const applyTextSettings = (ctx: CanvasRenderingContext2D) => {
  ctx.font = `150px StrangerThings`;
  ctx.strokeStyle = TEXT_COLOR;
  ctx.lineWidth = 2;
  ctx.shadowColor = SHADOW_COLOR;
  ctx.shadowBlur = SHADOW_BLUR;
}

export class PartialTitleZoomout extends Layer {
  private readonly scale: Interpolator = Interpolation.linear(5, 1, 2);

  paint(ctx: CanvasRenderingContext2D, percentage: number, { width, height}: {
    width: number,
    height: number,
  }) {
    const scale = this.scale(percentage);

    ctx.translate(width / 2, height / 2);
    applyTextSettings(ctx);

    ctx.scale(scale, scale);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.strokeText('RANG', 0, 0);
    ctx.textBaseline = 'hanging';
    ctx.textAlign = 'right';
    ctx.strokeText('T    ', 20, -30);
    ctx.textAlign = 'center';
    ctx.strokeText('    I  G', 0, -30);
  }
}

export class LetterTFittingIn extends Layer {
  private readonly yOffset: Interpolator = Interpolation.custom(500, 0, 30);
  private readonly scale: Interpolator = Interpolation.linear(5, 1);

  paint(ctx: CanvasRenderingContext2D, percentage: number, { width, height}: {
    width: number,
    height: number,
  }) {
    const yOffset = this.yOffset(percentage);

    if (yOffset === 0) {
      return
    }

    const scale = this.scale(percentage);

    ctx.translate(width / 2 - 25, height / 2 - yOffset);
    applyTextSettings(ctx);

    ctx.scale(scale, scale);
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.strokeText('T    ', 0, 0);
  }
}

export class LetterEFittingIn extends Layer {
  private readonly yOffset: Interpolator = Interpolation.custom(500, 0, 30);
  private readonly scale: Interpolator = Interpolation.linear(5, 1);

  paint(ctx: CanvasRenderingContext2D, percentage: number, { width, height}: {
    width: number,
    height: number,
  }) {
    const yOffset = this.yOffset(percentage);

    if (yOffset === 0) {
      return;
    }

    const scale = this.scale(percentage);

    ctx.translate(width / 2 + 20, height / 2 - yOffset);
    applyTextSettings(ctx);

    ctx.scale(scale, scale);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.strokeText('    E', 0, 0);
  }
}

export class LetterNFittingIn extends Layer {
  private readonly yOffset: Interpolator = Interpolation.custom(500, 0, 20, 45);
  private readonly scale: Interpolator = Interpolation.linear(5, 1);

  paint(ctx: CanvasRenderingContext2D, percentage: number, { width, height}: {
    width: number,
    height: number,
  }) {
    const yOffset = this.yOffset(percentage);

    if (yOffset === 0) {
      return;
    }

    const scale = this.scale(percentage);

    ctx.translate(width / 2, height / 2 + yOffset);
    applyTextSettings(ctx);

    ctx.scale(scale, scale);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'hanging';
    ctx.strokeText('   N', 0, -30);
  }
}
export class LetterHFittingIn extends Layer {
  private readonly yOffset: Interpolator = Interpolation.custom(500, 0, 30);
  private readonly scale: Interpolator = Interpolation.linear(5, 1);

  paint(ctx: CanvasRenderingContext2D, percentage: number, { width, height}: {
    width: number,
    height: number,
  }) {
    const yOffset = this.yOffset(percentage);

    if (yOffset === 0) {
      return;
    }

    const scale = this.scale(percentage);

    ctx.translate(width / 2, height / 2 + yOffset);
    applyTextSettings(ctx);

    ctx.scale(scale, scale);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'hanging';
    ctx.strokeText('H    ', 0, -30);
  }
}

export class LetterSFittingIn extends Layer {
  private readonly yOffset: Interpolator = Interpolation.custom(500, 0, 30);
  private readonly scale: Interpolator = Interpolation.linear(5, 1);

  paint(ctx: CanvasRenderingContext2D, percentage: number, { width, height}: {
    width: number,
    height: number,
  }) {
    const yOffset = this.yOffset(percentage);

    if (yOffset === 0) {
      return;
    }

    const scale = this.scale(percentage);

    ctx.translate(20 + width / 2, height / 2 + yOffset);
    applyTextSettings(ctx);

    ctx.scale(scale, scale);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'hanging';
    ctx.strokeText('    S', 0, -30);
  }
}

export class LetterSMovingRight extends Layer {
  private readonly xOffset: Interpolator = Interpolation.custom(-400, -270, 50);
  private readonly scale: Interpolator = Interpolation.linear(5, 1);

  paint(ctx: CanvasRenderingContext2D, percentage: number, { width, height}: {
    width: number,
    height: number,
  }) {
    const xOffset = this.xOffset(percentage);

    if (xOffset === 0) {
      return;
    }

    const scale = this.scale(percentage);

    ctx.translate(width / 2, height / 2);
    applyTextSettings(ctx);
    ctx.font = `${150 * 1.25}px StrangerThings`;

    ctx.scale(scale, scale);
    ctx.textAlign = 'right';
    ctx.strokeText('S', xOffset, -18);
  }
}

export class LetterRMovingLeft extends Layer {
  private readonly xOffset: Interpolator = Interpolation.custom(400, 270, 50);
  private readonly scale: Interpolator = Interpolation.linear(5, 1);

  paint(ctx: CanvasRenderingContext2D, percentage: number, { width, height}: {
    width: number,
    height: number,
  }) {
    const xOffset = this.xOffset(percentage);

    if (xOffset === 0) {
      return;
    }

    const scale = this.scale(percentage);

    ctx.translate(width / 2, height / 2);
    applyTextSettings(ctx);
    ctx.font = `${150 * 1.25}px StrangerThings`;

    ctx.scale(scale, scale);
    ctx.textAlign = 'left';
    ctx.strokeText('R', xOffset, -18);
  }
}

export const Layers = [
  new PartialTitleZoomout(),
  new LetterNFittingIn(),
  new LetterTFittingIn(),
  new LetterHFittingIn(),
  new LetterEFittingIn(),
  new LetterSFittingIn(),
  new LetterSMovingRight(),
  new LetterRMovingLeft(),
  // new TopRectangleReveal(),
  // new BottomRectangleReveals(),
];
