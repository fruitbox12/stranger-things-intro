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

  constructor({ audioUrl, canvas, video }: VideoPlayerOptions) {
    this.canvas = canvas;
    this.video = video;
    this.audio = new Audio(audioUrl);
  }

  play() {
    this.audio.play();
    return this.video.play(this.canvas.getContext('2d')).then(() => this.audio.pause());
  }

  pause() {
    this.audio.pause();
    this.video.pause();
  }

  resume() {}

  stop() {}
}
