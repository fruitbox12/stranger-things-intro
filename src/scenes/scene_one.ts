type RequestAnimationFrame = (callback: FrameRequestCallback) => number;

const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;

export class SceneOne {
  private scale: number = 2;
  private readonly finalScale: number = 1;
  private readonly delta: number = -0.005;

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
    if (this.scale <= this.finalScale) {
      resolve();
      return;
    }

    const ctx = canvas.getContext('2d');
    const color = '#ce1725'; //(10, 0.1)
    const fontSize = 1024 * 22;

    ctx.save();
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = '#0c0101';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.scale(this.scale, this.scale);
    ctx.font = `${fontSize}px StrangerThings`;
    ctx.textAlign = 'center';
    ctx.textBaseline="middle";
    ctx.strokeStyle = color;
    ctx.lineWidth = fontSize / 100;
    ctx.shadowColor = '#e83442'; //lighten(color, 20%);
    ctx.shadowBlur = 100;
    ctx.strokeText('A', CANVAS_WIDTH / 2 + fontSize / 50, CANVAS_HEIGHT / 2 + fontSize * 0.02);

    ctx.restore();

    this.scale += this.scale * this.delta;

    requestAnimationFrame(() => this.paint({ canvas, requestAnimationFrame, resolve }));
  }
}
