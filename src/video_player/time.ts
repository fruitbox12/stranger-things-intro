const SECOND_IN_MILLISECONDS = 1000;
const MINUTE_IN_MILLISECONDS = 60 * SECOND_IN_MILLISECONDS;
const HOUR_IN_MILLISECONDS = 60 * MINUTE_IN_MILLISECONDS;

/**
 * Utility helper to represent times in the format that is
 * human readable for video/audio
 *
 * Consider using TimeRanges once you understand them
 */
export class Time {
  constructor(
      private readonly hours: number,
      private readonly minutes: number,
      private readonly seconds: number,
      private readonly milliseconds: number = 0,
  ) {
  }

  getMilliseconds(): number {
    return (this.hours * HOUR_IN_MILLISECONDS
        + this.minutes * MINUTE_IN_MILLISECONDS
        + this.seconds * SECOND_IN_MILLISECONDS
        + this.milliseconds);
  }

  liesBetween(startTime: Time, endTime: Time): boolean {
    const milliseconds = this.getMilliseconds();

    return (milliseconds >= startTime.getMilliseconds()
        && milliseconds <= endTime.getMilliseconds());
  }

  // expected format hh:mm:ss
  static create(time: string): Time {
    // TODO validations
    const [hours, minutes, seconds] = time.split(':').map(Number);

    return new Time(hours, minutes, seconds)
  }

  static duration(time1: Time, time2: Time): number {
    return time2.getMilliseconds() - time1.getMilliseconds();
  }

  static fromMilliseconds(milliseconds: number): Time {
    const totalSeconds = Math.floor(milliseconds / SECOND_IN_MILLISECONDS);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const totalHours = Math.floor(totalMinutes / 60);
    const hours = totalHours % 60;

    return new Time(hours, minutes, seconds, milliseconds % 1000);
  }
}
