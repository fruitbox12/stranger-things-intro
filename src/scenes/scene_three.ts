const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;
type RequestAnimationFrame = (callback: FrameRequestCallback) => number;

export class SceneThree {
  private readonly finalVal: number = 100;
  private val: number = 0;
  private delta: number = 0.005;

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
    ctx.lineWidth = 40;
    ctx.shadowColor = '#e83442'; //lighten(color, 20%);
    ctx.strokeStyle = color;
    ctx.shadowBlur = 100;

    const [ originX, originY ] = [0 - 200 * (this.val / 100), CANVAS_HEIGHT / 2 + 150];
    const aspectRatio = 1.25;
    const scaleX = 1.33;
    const rotationAngle = -10 * Math.PI / 180;

    ctx.translate(originX, originY);
    ctx.rotate(rotationAngle);


    const innerCircleRadius = CANVAS_HEIGHT / 4;

    ctx.scale(scaleX, scaleX * aspectRatio);
    ctx.beginPath();
    ctx.arc(0, 0, innerCircleRadius, 0, 2 * Math.PI, true);
    ctx.stroke();

    ctx.scale(scaleX, scaleX / aspectRatio);

    ctx.beginPath();
    ctx.arc(0, 0, innerCircleRadius + 300, Math.PI / 2, Math.PI, true);
    ctx.stroke();

    ctx.restore();

    const lineWidth = 50;
    ctx.lineWidth = lineWidth;
    ctx.shadowColor = '#e83442'; //lighten(color, 20%);
    ctx.strokeStyle = color;
    ctx.shadowBlur = 100;

    ctx.beginPath();
    ctx.moveTo(CANVAS_WIDTH - 150 + (this.val / 100) * (150 + lineWidth), 0);
    ctx.lineTo(CANVAS_WIDTH - 150 + (this.val / 100) * (150 + lineWidth), CANVAS_HEIGHT);
    ctx.stroke();

    this.val += this.finalVal * this.delta;

    requestAnimationFrame(() => this.paint({ canvas, requestAnimationFrame, resolve }));
  }
}
