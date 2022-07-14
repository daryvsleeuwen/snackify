export function millisecondsToTime(milliseconds: number) {
  const ms = milliseconds % 1000;
  milliseconds = (milliseconds - ms) / 1000;
  const secs = milliseconds % 60;
  milliseconds = (milliseconds - secs) / 60;
  const mins = milliseconds % 60;

  const minsPrefix = mins < 10 ? '0' : '';
  const secsPrefix = secs < 10 ? '0' : '';

  return minsPrefix + mins + ':' + secsPrefix + secs;
}
