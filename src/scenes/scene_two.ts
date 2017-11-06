const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;
type RequestAnimationFrame = (callback: FrameRequestCallback) => number;

export class SceneTwo {
  private readonly finalVal: number = 0.6;
  private val: number = 0.5;
  private delta: number = 0.001;

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
    const fontSize = 1024;

    ctx.save();
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = '#0c0101';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    //Benguiat font
    ctx.translate(CANVAS_WIDTH / 2, (CANVAS_HEIGHT) * this.val);
    ctx.scale(3, 3);
    ctx.font = `${fontSize}px StrangerThings`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = color;
    ctx.lineWidth = fontSize / 75;
    ctx.shadowColor = '#e83442'; //lighten(color, 20%);
    ctx.shadowBlur = 100;
    ctx.strokeText('N', -(CANVAS_WIDTH / 40), (CANVAS_HEIGHT / 6)) ;

    ctx.restore();

    this.val += this.val * this.delta;

    requestAnimationFrame(() => this.paint({ canvas, requestAnimationFrame, resolve }));
  }
}
