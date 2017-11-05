import { Scene, RequestAnimationFrame } from './scene';
import { SceneOne } from './scenes/scene_one';
import { IntroTextZoomOut } from './scenes/intro_text_zoom_out';
// import intro from './foo.mp3';

const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;

declare global {
  interface CanvasRenderingContext2D {
    webkitBackingStorePixelRatio?: number;
    mozBackingStorePixelRatio?: number;
    msBackingStorePixelRatio?: number;
    oBackingStorePixelRatio?: number;
    backingStorePixelRatio?: number;
  }
}

export default class Main {
    constructor(
      private readonly canvas: HTMLCanvasElement,
      private readonly scene: Scene,
    ) {

    }

    init() {
      this.scene.play(this.canvas);
    }
}

const scene: Scene = new Scene(
    window.requestAnimationFrame.bind(window),
    window.cancelAnimationFrame.bind(window),
    [new SceneOne(), new IntroTextZoomOut()],
);

const canvas: HTMLCanvasElement = createHiDPICanvas(
    CANVAS_WIDTH, CANVAS_HEIGHT, getPixelRatio());

// alert(intro);
(new Main(canvas, scene)).init();


function getPixelRatio(): number {
    const ctx: CanvasRenderingContext2D = document.createElement("canvas").getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
}

function createHiDPICanvas(width: number, height: number, ratio: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);

  document.body.appendChild(canvas);

  return canvas as HTMLCanvasElement;
}
