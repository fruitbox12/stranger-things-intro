import { VideoPlayer } from './video_player/video_player';
import { Video } from './video_player/video';
import { Time } from './video_player/time';
import { StrangerThingsIntroCompositions } from './composition_layers/stranger_things_intro_compositions';

const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;
const AUDIO_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/161676/music.mp3';

const canvas: HTMLCanvasElement = createHiDPICanvas(
    CANVAS_WIDTH, CANVAS_HEIGHT, getPixelRatio());

const video: Video = new Video({
  compositions: StrangerThingsIntroCompositions,
  duration: Time.create('00:00:59').getMilliseconds(),
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
  requestAnimationFrame: window.requestAnimationFrame.bind(window),
});
const videoPlayer: VideoPlayer = new VideoPlayer({ canvas, audioUrl: AUDIO_URL, video });

videoPlayer.play();

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
