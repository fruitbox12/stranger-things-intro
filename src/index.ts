import { VideoPlayer } from './video_player/video_player';
import { Video } from './video_player/video';
import { Time } from './video_player/time';
import { StrangerThingsIntroCompositions } from './composition_layers/stranger_things_intro_compositions';

(function() {
    const throttle = function(type: string, name: string, obj?: any) {
        obj = obj || window;
        let running = false;
        const func = function() {
            if (running) { return; }
            running = true;
            requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle('resize', 'optimizedResize');
})();

const AUDIO_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/161676/music.mp3';

const videoResolution = {
  width: 1440,
  height: 900,
};
const pixelRatio = getPixelRatio();
const canvas: HTMLCanvasElement = createHiDPICanvas(
    videoResolution.width, videoResolution.height, pixelRatio);
const videoContainer = document.getElementById('video-container');
videoContainer.appendChild(canvas);

const video: Video = new Video({
  compositions: StrangerThingsIntroCompositions,
  duration: Time.create('00:00:54').getMilliseconds(),
  width: videoResolution.width,
  height: videoResolution.height,
  requestAnimationFrame: window.requestAnimationFrame.bind(window),
});
const videoPlayer: VideoPlayer = new VideoPlayer({ canvas, audioUrl: AUDIO_URL, video });

document.body.addEventListener('click', () => {
  videoPlayer.play();
});

window.addEventListener('optimizedResize', fitToScreen);
fitToScreen();

function fitToScreen() {
  let width = window.innerWidth;
  const aspectRatio = videoResolution.width / videoResolution.height;
  const height = Math.min(width / aspectRatio, window.innerHeight);

  if (width / height !== aspectRatio) {
    width = height * aspectRatio;
  }

  let translateX = (width - videoResolution.width) / 2;

  if (window.innerWidth > width) {
    translateX += (window.innerWidth - width) / 2;
  }

  canvas.style.transform = `translate(${translateX}px, ${(height - videoResolution.height) / 2}px) scale(${width / videoResolution.width})`;
}

function updateToHiDPICanvas(canvas: HTMLCanvasElement, width: number, height: number, ratio: number) {
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
}

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
  const canvas = document.createElement('canvas');
  updateToHiDPICanvas(canvas, width, height, ratio);

  return canvas as HTMLCanvasElement;
}
