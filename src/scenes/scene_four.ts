const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;
type RequestAnimationFrame = (callback: FrameRequestCallback) => number;

import { createInterpolation, Interpolator } from '../interpolator';

export class SceneFour {
  private readonly finalVal: number = 100;
  private val: number = 1;
  private delta: number = 0.005;

  private readonly sCoordinates: {
    x: Interpolator,
    y: Interpolator,
  } = {
    x: createInterpolation(0, -20),
    y: createInterpolation(0, -5),
  };

  private readonly gCoordinates: {
    x: Interpolator,
    y: Interpolator,
  } = {
    x: createInterpolation(10, 30),
    y: createInterpolation(-10.5, -5),
  };

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

    ctx.save();
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = '#0c0101';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    ctx.scale(15, 19);

    //Benguiat font
    ctx.font = `${fontSize}px StrangerThings`;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.shadowColor = '#e83442'; //lighten(color, 20%);
    ctx.shadowBlur = 100;

    ctx.textBaseline = 'hanging';
    ctx.textAlign = 'center';
    ctx.strokeText('S', this.sCoordinates.x(this.val), this.sCoordinates.y(this.val))

    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'center';
    ctx.strokeText('G', this.gCoordinates.x(this.val), this.gCoordinates.y(this.val));

    ctx.restore();

    this.val += this.finalVal * this.delta;

    requestAnimationFrame(() => this.paint({ canvas, requestAnimationFrame, resolve }));
  }
}
