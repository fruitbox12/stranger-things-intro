import { Video } from './video';

type VideoPlayerOptions = {
  audioUrl: string,
  canvas: HTMLCanvasElement,
  video: Video,
};

export class VideoPlayer {
  private readonly audio: HTMLAudioElement;
  private readonly canvas: HTMLCanvasElement;
  private readonly video: Video;
  private onPause: () => void;
  private onResume: () => void;
  private paused: boolean = false;

  constructor({ audioUrl, canvas, video }: VideoPlayerOptions) {
    this.canvas = canvas;
    this.video = video;
    this.audio = new Audio(audioUrl);
  }

  isPaused() {
    return this.paused;
  }

  play() {
    this.audio.play();
    return this.video.play(this.canvas.getContext('2d')).then(() => this.audio.pause());
  }

  pause() {
    this.audio.pause();
    this.video.pause();
    this.onPause && this.onPause();
    this.paused = true;
  }

  resume() {
    this.audio.play();
    this.video.resume();
    this.onResume && this.onResume();
    this.paused = false;
  }

  setOnPause(onPause: () => void) {
    this.onPause = onPause;
  }

  setOnResume(onResume: () => void) {
    this.onResume = onResume;
  }

  stop() {
    throw new Error('Implement Stop');
  }
}
