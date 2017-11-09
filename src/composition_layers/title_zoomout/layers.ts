import { Layer } from '../../video_player/layer';
import { Time } from '../../video_player/time';
import { Interpolator, Interpolation } from '../../video_player/interpolator';
import { TEXT_COLOR, SHADOW_COLOR, SHADOW_BLUR } from '../constants';

class AdjustmentLayer extends Layer {
  private readonly scale: Interpolator = Interpolation.linear(5, 0.75, 2);

  paint(ctx: CanvasRenderingContext2D, percentage: number, { width, height}: {
    width: number,
    height: number,
  }) {
    const scale = this.scale(percentage);

    ctx.translate(width / 2, height / 2);
    ctx.font = `150px StrangerThings`;
    ctx.strokeStyle = TEXT_COLOR;
    ctx.lineWidth = 2;
    ctx.shadowColor = SHADOW_COLOR;
    ctx.shadowBlur = SHADOW_BLUR;
    ctx.scale(scale, scale);
  }
}

class OpacityAdjustmentLayer extends Layer {
  private readonly transparency: Interpolator = Interpolation.linear(1, 0);

  paint(ctx: CanvasRenderingContext2D, percentage: number) {
    ctx.globalAlpha = this.transparency(percentage);
  }
}

class PartialTitle extends Layer {
  paint(ctx: CanvasRenderingContext2D, percentage: number, { width, height}: {
    width: number,
    height: number,
  }) {
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

class LetterTFittingIn extends Layer {
  private readonly yOffset: Interpolator = Interpolation.linear(-90, 0);

  paint(ctx: CanvasRenderingContext2D, percentage: number, { width, height}: {
    width: number,
    height: number,
  }) {
    const yOffset = this.yOffset(percentage);

    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.strokeText('T    ', -25, yOffset);
  }
}

class LetterEFittingIn extends Layer {
  private readonly yOffset: Interpolator = Interpolation.linear(-110, 0);

  paint(ctx: CanvasRenderingContext2D, percentage: number, { width, height}: {
    width: number,
    height: number,
  }) {
    const yOffset = this.yOffset(percentage);

    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.strokeText('    E', 20, yOffset);
  }
}

class LetterNFittingIn extends Layer {
  private readonly yOffset: Interpolator = Interpolation.linear(500, 0);

  paint(ctx: CanvasRenderingContext2D, percentage: number, { width, height}: {
    width: number,
    height: number,
  }) {
    const yOffset = this.yOffset(percentage);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'hanging';
    ctx.strokeText('   N', 0, -30 + yOffset);
  }
}

class LetterHFittingIn extends Layer {
  private readonly yOffset: Interpolator = Interpolation.linear(100, 0);

  paint(ctx: CanvasRenderingContext2D, percentage: number, { width, height}: {
    width: number,
    height: number,
  }) {
    const yOffset = this.yOffset(percentage);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'hanging';
    ctx.strokeText('H    ', 0, -30 + yOffset);
  }
}

class LetterSFittingIn extends Layer {
  private readonly yOffset: Interpolator = Interpolation.linear(120, 0);

  paint(ctx: CanvasRenderingContext2D, percentage: number, { width, height}: {
    width: number,
    height: number,
  }) {
    const yOffset = this.yOffset(percentage);

    ctx.textAlign = 'left';
    ctx.textBaseline = 'hanging';
    ctx.strokeText('    S', 20, -30 + yOffset);
  }
}

class LetterSMovingRight extends Layer {
  private readonly xOffset: Interpolator = Interpolation.linear(-400, -270);

  paint(ctx: CanvasRenderingContext2D, percentage: number, { width, height}: {
    width: number,
    height: number,
  }) {
    const xOffset = this.xOffset(percentage);

    ctx.font = `${150 * 1.25}px StrangerThings`;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.strokeText('S', xOffset, 30);
    ctx.font = '150px StrangerThings';
  }
}

class LetterRMovingLeft extends Layer {
  private readonly xOffset: Interpolator = Interpolation.linear(400, 270);

  paint(ctx: CanvasRenderingContext2D, percentage: number, { width, height}: {
    width: number,
    height: number,
  }) {
    const xOffset = this.xOffset(percentage);

    ctx.font = `${150 * 1.25}px StrangerThings`;
    ctx.textAlign = 'left';
    ctx.strokeText('R', xOffset, 30);
    ctx.font = '150px StrangerThings';
  }
}

const RECT_WIDTH: number = 750;
const RECT_HEIGHT: number = 10;

class TopRectangleReveal extends Layer {
  private readonly widthPercentage: Interpolator = Interpolation.linear(0.25, 1);

  paint(ctx: CanvasRenderingContext2D, percentage: number, { width, height}: {
    width: number,
    height: number,
  }) {
    const rectWidth: number = 750 * this.widthPercentage(percentage);

    ctx.strokeRect(10 + -rectWidth / 2, -160, rectWidth, RECT_HEIGHT);
  }
}

class BottomRectangleReveals extends Layer {
  private readonly widthPercentage: Interpolator = Interpolation.linear(0.25, 1);

  // 15/15
  paint(ctx: CanvasRenderingContext2D, percentage: number, { width, height}: {
    width: number,
    height: number,
  }) {
    const rectWidth: number = RECT_WIDTH * 0.15 * this.widthPercentage(percentage);

    ctx.strokeRect(280, 0, rectWidth, RECT_HEIGHT);
    ctx.scale(-1, 1);
    ctx.strokeRect(250, 0, rectWidth, RECT_HEIGHT);
    ctx.scale(-1, 1);
  }
}

export const Layers = [
  new PartialTitle(),
  new LetterNFittingIn(Time.create('00:00:05'), Time.create('00:00:09')),
  new LetterTFittingIn(Time.create('00:00:08'), Time.create('00:00:13')),
  new LetterHFittingIn(Time.create('00:00:07'), Time.create('00:00:14')),
  new LetterEFittingIn(Time.create('00:00:08'), Time.create('00:00:15')),
  new LetterSFittingIn(Time.create('00:00:09'), Time.create('00:00:16')),
  new LetterSMovingRight(),
  new LetterRMovingLeft(),
  new TopRectangleReveal(Time.create('00:00:15'), Time.create('00:00:17')),
  new BottomRectangleReveals(Time.create('00:00:16'), Time.create('00:00:17')),
];

export const AdjustmentLayers = [
  new AdjustmentLayer(),
  new OpacityAdjustmentLayer(Time.create('00:00:19'), Time.create('00:00:20')),
];
