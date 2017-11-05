export type RequestAnimationFrame = (callback: FrameRequestCallback) => number;
export type Sequence = {
  render(
    canvas: HTMLCanvasElement,
    requestAnimationFrame: RequestAnimationFrame,
  ): Promise<void>,
};

export class Scene {
  private rafID?: number;

  constructor(
    private readonly requestAnimationFrame: RequestAnimationFrame,
    private readonly cancelAnimationFrame: (id: number) => void,
    private readonly sequences: Sequence[],
  ) {
  }

  play(canvas: HTMLCanvasElement) {
    this.sequences.reduce((nextRenderLoop: Promise<void>, sequence) => {
      return nextRenderLoop.then(() => {
        return sequence.render(canvas, this.requestAnimationFrame);
      });
    }, Promise.resolve());
  }

  pause() {
    this.cancelAnimationFrame(this.rafID);
    this.rafID = null;
  }

  isPlaying(): boolean {
    return this.rafID != null;
  }
}
