import { FC } from 'react';
import { timetables } from '../../data/timetables';
import { AreaTypes, RouteTypes, ScheduleTypes, StopEntity, TimeWithSkippedStops } from '../../entities/common';
import { calculateRelevantTimes } from '../../utils/calculateRelevantTimes';
import { TimeItem } from './TimeItem';

import './Times.css';

export interface TimeListProps {
  inputAreaType: AreaTypes;
  inputRoute: RouteTypes;
  inputSchedule: ScheduleTypes;
}

export const TimeList: FC<TimeListProps> = ({ inputAreaType, inputRoute, inputSchedule }) => {
  const schedule: Array<{
    departureStop: StopEntity;
    times: TimeWithSkippedStops[] | undefined;
  }> = [];

  timetables
    .filter(
      ({ departure, route, schedule }) =>
        departure.stop.location?.area === inputAreaType && route === inputRoute && schedule === inputSchedule
    )
    .map(({ departure: { times, stop } }) => schedule.push({ departureStop: stop, times }));

  return (
    <dl className="times">
      {schedule?.map(({ departureStop, times }) => {
        calculateRelevantTimes(new Date(), times);

        return (
          <div className="scheduleItem" key={departureStop.title}>
            <dt>{departureStop.title}</dt>
            <dd>
              {times?.map((time) => {
                const [departureTime] = Object.entries(time)[0];
                return (
                  <TimeItem
                    key={departureTime}
                    time={time}
                    inputAreaType={inputAreaType}
                    inputRoute={inputRoute}
                    inputSchedule={inputSchedule}
                  />
                );
              })}
            </dd>
          </div>
        );
      })}
    </dl>
  );
};
