import { FC, useRef } from 'react';
import { TimeWithSkippedStops } from '../../entities/common';
import { TimeListProps } from './TimeList';

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
  const subtitle = `Отправление в ${departureTime} (${new Date().toLocaleDateString()})`;

  return (
    <>
      <button type="button" className={isRelevant ? 'isRelevant' : ''} onClick={openDialog}>{`${departureTime} ${
        Boolean(skips?.length) ? '💨' : ''
      }`}</button>
      <dialog id="dialog" ref={dialog} onClick={handleDialogClick}>
        <section>
          <h2>{title}</h2>
          <p>
            <small>{subtitle}</small>
          </p>
          {Boolean(skips?.length) && <p>💨 - шаттл не останавливается на остановках: {skips?.map(({ title }) => title).join(', ')}</p>}
          <button onClick={closeDialog}>ОК</button>
        </section>
      </dialog>
    </>
  );
};
