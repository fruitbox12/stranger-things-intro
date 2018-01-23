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

const AUDIO_URL = 'https://raw.githubusercontent.com/mudassir0909/resume/master/intro.mp3';

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
const playButton = document.getElementById('play-button');
let videoPlayed: boolean = false;

playButton.addEventListener('click', play);

window.addEventListener('keydown', e => {
  if (e.keyCode === 32) {
    if (!videoPlayed) {
      play();
      return;
    }

    videoPlayer.isPaused() ? videoPlayer.resume() : videoPlayer.pause();
  }
});

window.addEventListener('optimizedResize', fitToScreen);
fitToScreen();

function play() {
  document.getElementById('play-button-container').classList.add('hidden');
  videoPlayer.play().then(rollCredits);
  handleTabSwitch(videoPlayer);
  videoPlayed = true;
}

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
  canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
}

function getPixelRatio(): number {
    const ctx: CanvasRenderingContext2D = document.createElement('canvas').getContext('2d');
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

function rollCredits() {
  document.getElementById('credits').classList.remove('hidden');
}

function handleTabSwitch(videoPlayer: VideoPlayer) {
  let hidden: string, visibilityChange;

  if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
    hidden = 'hidden';
    visibilityChange = 'visibilitychange';
  } else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
    visibilityChange = 'msvisibilitychange';
  } else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    visibilityChange = 'webkitvisibilitychange';
  }

  const handleVisibilityChange = () => {
    if (document[hidden]) {
      videoPlayer.pause();
    } else {
      videoPlayer.resume();
    }
  };

  videoPlayer.setOnPause(() => document.title = `[Paused] ${document.title}`);
  videoPlayer.setOnResume(() => document.title = document.title.replace('[Paused] ', ''));

  document.addEventListener(visibilityChange, handleVisibilityChange, false);
}
