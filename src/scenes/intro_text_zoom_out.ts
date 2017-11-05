const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;
type RequestAnimationFrame = (callback: FrameRequestCallback) => number;

export class IntroTextZoomOut {
  private readonly min: number = 100;
  private delta: number = -0.01;
  private val: number = 480;

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
    if (this.val <= this.min) {
      resolve();
      return;
    }
    const ctx = canvas.getContext('2d');
    const color = '#ce1725';

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = '#0c0101';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //Benguiat font
    ctx.font = `${this.val}px StrangerThings`;
    ctx.textAlign = 'center';
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.shadowColor = '#e83442'; //lighten(color, 20%);
    ctx.shadowBlur = 100;
    ctx.strokeText('TRANGE', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    ctx.strokeText('THINGS', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 0.7 * this.val + 20); //20px margin-top
    const textMetrics = ctx.measureText('TRANGE');
    const mWidthLow = ctx.measureText('M').width;
    ctx.font = `${this.val * 1.6}px StrangerThings`;
    const mWidthHigh = ctx.measureText('M').width;
    const approxHeightOffset = this.val * 0.4;
    ctx.textAlign = 'right';
    ctx.strokeText('S', (CANVAS_WIDTH - textMetrics.width) / 2, CANVAS_HEIGHT / 2 + approxHeightOffset);
    ctx.textAlign = 'left';
    ctx.strokeText('R', (CANVAS_WIDTH + textMetrics.width) / 2, CANVAS_HEIGHT / 2 + approxHeightOffset) ;

    this.val += this.val * this.delta;

    requestAnimationFrame(() => this.paint({ canvas, requestAnimationFrame, resolve }));
  }
}
