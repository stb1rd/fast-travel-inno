import { FC, useRef } from 'react';
import { atcb_action } from 'add-to-calendar-button';
import { TimeWithSkippedStops } from '../../entities/common';
import { TimeListProps } from './TimeList';

type ServiceOptions = 'Apple' | 'Google' | 'iCal' | 'Microsoft365' | 'MicrosoftTeams' | 'Outlook.com' | 'Yahoo';

const calendarButtons: Array<{ title: string; service: ServiceOptions }> = [
  {
    title: 'Apple календарь',
    service: 'Apple',
  },
  {
    title: 'Google календарь',
    service: 'Google',
  },
];

const startDate = new Date().toISOString().split('T')[0];
const formatTableTimeToJSTime = (tableTime: string) => (tableTime.length === 5 ? tableTime : `0${tableTime}`);
const addHour = (tableTime: string) => {
  const date = new Date(`${startDate}T${formatTableTimeToJSTime(tableTime)}`);
  date.setHours(date.getHours() + 1);
  return date.toLocaleTimeString().split(':').slice(0, 2).join(':');
};

interface Props extends TimeListProps {
  time: TimeWithSkippedStops;
}

export const TimeItem: FC<Props> = ({ time, inputAreaType, inputRoute, inputSchedule }) => {
  const [departureTime, { skips, isRelevant }] = Object.entries(time)[0];
  const dialog = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    if (dialog.current) {
      dialog.current.showModal();
    }
  };

  const closeDialog = () => {
    if (dialog.current) {
      dialog.current.close();
    }
  };

  const handleDialogClick: React.MouseEventHandler<HTMLDialogElement> = (e) => {
    if ((e as any).target.id === 'dialog') {
      closeDialog();
    }
  };

  const title = `Шаттл ${inputRoute} ${inputAreaType}`;

  const makeConfig = (options: ServiceOptions[]) => ({
    name: title,
    startDate,
    startTime: formatTableTimeToJSTime(departureTime),
    endTime: addHour(departureTime),
    timeZone: 'currentBrowser',
    options,
  });

  return (
    <>
      <button type="button" className={isRelevant ? 'isRelevant' : ''} onClick={openDialog}>{`${departureTime} ${
        Boolean(skips?.length) ? '💨' : ''
      }`}</button>
      <dialog id="dialog" ref={dialog} onClick={handleDialogClick}>
        <section>
          <h2>{title}</h2>
          {Boolean(skips?.length) && <p>💨 - шаттл не останавливается на остановках: {skips?.map(({ title }) => title).join(', ')}</p>}
          <div className="buttons">
            {calendarButtons.map(({ service, title }) => (
              <button key={service} onClick={() => atcb_action(makeConfig([service]))} type="button">
                {title}
              </button>
            ))}
            <button onClick={closeDialog}>ОК</button>
          </div>
        </section>
      </dialog>
    </>
  );
};
