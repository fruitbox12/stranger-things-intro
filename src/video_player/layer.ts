export abstract class Layer {
  // percentage of duration elapsed, in order to interpolate values
  abstract paint(ctx: CanvasRenderingContext2D, percentage: number, {
    width,
    height
  }: { width: number, height: number }): void
}
