// type RequestAnimationFrame = (callback: FrameRequestCallback) => number;

// const CANVAS_WIDTH = window.innerWidth;
// const CANVAS_HEIGHT = window.innerHeight;

// export class SceneOne {
//   private scale: number = 6;
//   private readonly finalScale: number = 3;
//   private readonly delta: number = -0.003;

//   render(canvas: HTMLCanvasElement, requestAnimationFrame: RequestAnimationFrame): Promise<void> {
//     return new Promise(resolve => this.paint({
//       canvas,
//       requestAnimationFrame,
//       resolve
//     }));
//   }

//   private paint = ({ canvas, requestAnimationFrame, resolve }: {
//     canvas: HTMLCanvasElement,
//     requestAnimationFrame: RequestAnimationFrame,
//     resolve: () => void,
//   }) => {
//     if (this.scale <= this.finalScale) {
//       resolve();
//       return;
//     }

//     const ctx = canvas.getContext('2d');
//     const color = '#ce1725'; //(10, 0.1)
//     const lineWidth = 50;

//     ctx.save();
//     ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//     ctx.fillStyle = '#0c0101';
//     ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

//     ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
//     ctx.scale(this.scale, this.scale);

//     ctx.strokeStyle = '#ce1725';
//     ctx.lineWidth = lineWidth;
//     ctx.shadowColor = '#e83442'; //lighten(color, 20%);
//     ctx.shadowBlur = 100;

//     ctx.beginPath();
//     ctx.moveTo(0, -CANVAS_HEIGHT/2);
//     ctx.lineTo(-0.5 * (CANVAS_WIDTH / 2), (Math.sqrt(3) / 2) * (CANVAS_HEIGHT / 2));
//     ctx.lineTo(0.5 * (CANVAS_WIDTH / 2), (Math.sqrt(3) / 2) * (CANVAS_HEIGHT / 2));
//     ctx.lineTo(0, -CANVAS_HEIGHT/2);
//     ctx.stroke();

//     ctx.restore();

//     this.scale += this.scale * this.delta;

//     requestAnimationFrame(() => this.paint({ canvas, requestAnimationFrame, resolve }));
//   }
// }
