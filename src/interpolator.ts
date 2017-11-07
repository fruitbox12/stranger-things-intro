export type Interpolator = (percentage: number) => number;

export function createInterpolation(start: number, end: number): Interpolator {
  return function interpolate(percentage: number): number {
    const val = start * (1 - percentage / 100) + end * (percentage / 100);

    return parseFloat(val.toFixed(2));
  }
}
