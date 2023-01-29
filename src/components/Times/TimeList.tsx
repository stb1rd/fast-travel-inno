import { FC } from 'react';
import { timetables } from '../../data/timetables';
import { AreaTypes, RouteTypes, ScheduleTypes, StopEntity, StopsEntity, TimeWithSkippedStops } from '../../entities/common';
import { calculateRelevantTimes } from '../../utils/calculateRelevantTimes';
import { TimeItem } from './TimeItem';

import './Times.css';

interface Props {
  inputAreaType: AreaTypes;
  inputRoute: RouteTypes;
  inputSchedule: ScheduleTypes;
  filterRelevant: boolean;
}

export const TimeList: FC<Props> = ({ inputAreaType, inputRoute, inputSchedule, filterRelevant }) => {
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
        const visibleTimes = !filterRelevant ? times : times?.filter((tableTime) => Object.entries(tableTime)[0][1].isRelevant);

        return (
          <div className="scheduleItem" key={departureStop.title}>
            <dt>{departureStop.title}</dt>
            <dd>
              {visibleTimes?.map((time) => {
                const [departureTime] = Object.entries(time)[0];
                return <TimeItem key={departureTime} time={time} />;
              })}
            </dd>
          </div>
        );
      })}
    </dl>
  );
};
