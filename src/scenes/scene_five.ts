// const CANVAS_WIDTH = window.innerWidth;
// const CANVAS_HEIGHT = window.innerHeight;
// type RequestAnimationFrame = (callback: FrameRequestCallback) => number;

// import { createInterpolation, Interpolator } from '../interpolator';

// export class SceneFive {
//   private readonly finalVal: number = 100;
//   private val: number = 1;
//   private delta: number = 0.005;

//   private readonly sCoordinates: {
//     x: Interpolator,
//     y: Interpolator,
//   } = {
//     x: createInterpolation(45, 40),
//     y: createInterpolation(25, 20),
//   };

//   private readonly rCoordinates: {
//     x: Interpolator,
//     y: Interpolator,
//   } = {
//     x: createInterpolation(-110, -103),
//     y: createInterpolation(25, 27),
//   };

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
//     if (this.val >= this.finalVal) {
//       resolve();
//       return;
//     }

//     const ctx = canvas.getContext('2d');
//     const color = '#ce1725';
//     const fontSize = 200;
//     const scaleFactor = 11;

//     ctx.save();
//     ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//     ctx.fillStyle = '#0c0101';
//     ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

//     ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
//     ctx.scale(scaleFactor, scaleFactor);

//     //Benguiat font
//     ctx.font = `${fontSize}px StrangerThings`;
//     ctx.strokeStyle = color;
//     ctx.lineWidth = 2;
//     ctx.shadowColor = '#e83442'; //lighten(color, 20%);
//     ctx.shadowBlur = 100;

//     ctx.textBaseline = 'middle';
//     ctx.textAlign = 'center';
//     // ctx.strokeText('S', 45, 25);
//     // ctx.strokeText('S', 40, 20);
//     ctx.strokeText('S', this.sCoordinates.x(this.val), this.sCoordinates.y(this.val))

//     ctx.textBaseline = 'middle';
//     ctx.textAlign = 'center';
//     // ctx.strokeText('R', -110, 25);
//     // ctx.strokeText('R', -105, 27);
//     ctx.strokeText('R', this.rCoordinates.x(this.val), this.rCoordinates.y(this.val));

//     ctx.restore();

//     this.val += this.finalVal * this.delta;

//     requestAnimationFrame(() => this.paint({ canvas, requestAnimationFrame, resolve }));
//   }
// }
