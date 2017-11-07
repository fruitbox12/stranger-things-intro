const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;
type RequestAnimationFrame = (callback: FrameRequestCallback) => number;

import { createInterpolation, Interpolator } from '../interpolator';

export class SceneSix {
  private readonly finalVal: number = 100;
  private val: number = 1;
  private delta: number = 0.005;

  private readonly xOffset: Interpolator = createInterpolation(0, 20);
  private readonly yOffset: Interpolator = createInterpolation(0, 5);

  render(canvas: HTMLCanvasElement, requestAnimationFrame: RequestAnimationFrame): Promise<void> {
    return new Promise(resolve => this.paint({
      canvas,
      requestAnimationFrame,
      resolve
    }));
  }

  private paint = ({ canvas, requestAnimationFrame, resolve }: {
    canvas: HTMLCanvasElement,
    requestAnimationFrame: RequestAnimationFrame,
    resolve: () => void,
  }) => {
    if (this.val >= this.finalVal) {
      resolve();
      return;
    }

    const ctx = canvas.getContext('2d');
    const color = '#ce1725';
    const fontSize = 200;
    const scaleFactor = 8;

    ctx.save();
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = '#0c0101';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.translate(200 + CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    ctx.scale(scaleFactor, scaleFactor);

    //Benguiat font
    ctx.font = `${fontSize}px StrangerThings`;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.shadowColor = '#e83442'; //lighten(color, 20%);
    ctx.shadowBlur = 100;

    const verticalSpacing = 20;
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'center';
    ctx.strokeText('T', -60 - this.xOffset(this.val), -verticalSpacing + this.yOffset(this.val));
    ctx.scale(-1, 1);
    ctx.strokeText('R', -(60 + this.xOffset(this.val)), -verticalSpacing + this.yOffset(this.val)); //have to flip X as we did -1 scale above
    ctx.scale(-1, 1);

    ctx.textBaseline = 'hanging';
    ctx.textAlign = 'center';
    ctx.strokeText('T', -110 + this.xOffset(this.val), 10 + this.yOffset(this.val));
    ctx.strokeText('H', 80 - this.xOffset(this.val), 10 + this.yOffset(this.val));
    // ctx.strokeText('S', this.sCoordinates.x(this.val), this.sCoordinates.y(this.val))
    // ctx.strokeText('G', this.gCoordinates.x(this.val), this.gCoordinates.y(this.val));

    ctx.restore();

    this.val += this.finalVal * this.delta;

    requestAnimationFrame(() => this.paint({ canvas, requestAnimationFrame, resolve }));
  }
}
