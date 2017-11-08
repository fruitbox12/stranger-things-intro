export type Interpolator = (percentage: number) => number;

export class Interpolation {
  static linear(start: number, end: number, precision: number = 2): Interpolator {
    return function interpolate(percentage: number): number {
      const val = start * (1 - percentage / 100) + end * (percentage / 100);

      return parseFloat(val.toFixed(precision));
    }
  }

  static custom(start: number, end: number, delay: number) {
    const mappedPercentageUnit = (100 - delay) / 100;
    const interpolator = Interpolation.linear(start, end);

    return function interpolate(percentage: number): number {
      if (percentage < delay) {
        return 0;
      }

      const mappedPercentage = (percentage - delay) / mappedPercentageUnit;
      return interpolator(mappedPercentage);
    }
  }
}
