import { TimeWithSkippedStops } from '../entities/common';

const HOUR = 60 * 60 * 1000;

const getTimeKey = (tableTime: TimeWithSkippedStops) => Object.entries(tableTime)[0][0];

const formatTimetableItemToDate = (currentTime: Date, tableTime: TimeWithSkippedStops) => {
  const [departureHours, departureMinutes] = getTimeKey(tableTime).split(':');
  const date = new Date(currentTime);
  date.setHours(Number(departureHours));
  date.setMinutes(Number(departureMinutes));
  return date;
};

export const calculateRelevantTimes = (currentTime: Date, times?: TimeWithSkippedStops[]) => {
  let relevantTimes: TimeWithSkippedStops[] | undefined = [];

  relevantTimes = times?.map((time) => {
    const departureTime = formatTimetableItemToDate(currentTime, time);
    const diff = departureTime.getTime() - currentTime.getTime();
    const isRelevant = (diff >= 0 && diff <= HOUR * 2) || (diff < 0 && Math.abs(diff) <= HOUR);
    if (isRelevant) {
      time[getTimeKey(time)].isRelevant = true;
    }
    return time;
  });

  if (times && Boolean(times?.length) && !Boolean(relevantTimes?.length)) {
    const firstTime = formatTimetableItemToDate(currentTime, times[0]);
    if (currentTime.getTime() < firstTime.getTime()) {
      relevantTimes = times.slice(0, 2).map((time) => {
        time[getTimeKey(time)].isRelevant = true;
        return time;
      });
    } else {
      const lastTime = formatTimetableItemToDate(currentTime, times.at(-1) as TimeWithSkippedStops);
      if (currentTime.getTime() > lastTime.getTime()) {
        relevantTimes = [times.at(-1) as TimeWithSkippedStops].map((time) => {
          time[getTimeKey(time)].isRelevant = true;
          return time;
        });
      }
    }
  }

  return relevantTimes;
};
