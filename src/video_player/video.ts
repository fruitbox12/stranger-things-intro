import { Composition } from './composition';
import { Time } from './time';

type RequestAnimationFrame = (callback: FrameRequestCallback) => number;
type Options = {
  compositions: Composition[],
  duration: number, //duration of the video in milliseconds
  requestAnimationFrame: RequestAnimationFrame,
  width: number,
  height: number,
};

export class Video {
  private readonly requestAnimationFrame: RequestAnimationFrame;
  private readonly compositions: Composition[];
  private readonly duration: number;
  private readonly width: number;
  private readonly height: number;
  private readonly background: string = '#0c0101';

  private playbackStartTime: number; //start datetime in milliseconds

  constructor({
    compositions,
    duration,
    requestAnimationFrame,
    width,
    height,
  }: Options) {
    this.compositions = compositions;
    this.duration = duration;
    this.requestAnimationFrame = requestAnimationFrame;
    this.width = width;
    this.height = height;
  }

  /*
   * Plays the compositions from start,
   * see "resume" if you wish to resume a paused video
   */
  play(ctx: CanvasRenderingContext2D): Promise<void> {
    this.playbackStartTime = +(new Date());

    return new Promise(resolve => this.queueRender(ctx, resolve));
  }

  private queueRender(ctx: CanvasRenderingContext2D, resolve: () => void) {
    this.requestAnimationFrame(() => {
      const timeElapsed = +(new Date()) - this.playbackStartTime;

      if (timeElapsed >= this.duration) {
        resolve();
        return;
      }

      const now: Time = Time.fromMilliseconds(timeElapsed);

      this.beforeFrameRender(ctx);
      this.compositions
          .filter(composition => composition.canBeRendered(now))
          .forEach(composition => composition.render(ctx, now, {
            width: this.width,
            height: this.height,
          }));
      this.afterFrameRender(ctx);

      this.queueRender(ctx, resolve);
    });
  }

  private beforeFrameRender(ctx: CanvasRenderingContext2D) {
    ctx.save(); //save default settings
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.fillStyle = this.background;
    ctx.fillRect(0, 0, this.width, this.height);
  }

  private afterFrameRender(ctx: CanvasRenderingContext2D) {
    ctx.restore(); //restore default settings (assuming the compositions/layers do not use ctx.save/restore)
  }

  pause() {
    throw new Error('Implement Video pause');
  }

  resume() {
    throw new Error('Implement Video resume');
  }
}
