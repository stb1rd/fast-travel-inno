import { FC, useRef, useState } from 'react';
import { TimeWithSkippedStops } from '../../entities/common';

interface Props {
  time: TimeWithSkippedStops;
}

export const TimeItem: FC<Props> = ({ time }) => {
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

  return (
    <>
      <button type="button" className={isRelevant ? 'isRelevant' : ''} onClick={openDialog}>{`${departureTime} ${
        Boolean(skips?.length) ? '💨' : ''
      }`}</button>
      <dialog id="dialog" ref={dialog} onClick={handleDialogClick}>
        <section>
          <h2>{`Шаттл в ${departureTime}`}</h2>
          {Boolean(skips?.length) && <p>💨 - шаттл не останавливается на остановках: {skips?.map(({ title }) => title).join(', ')}</p>}
          <button onClick={closeDialog}>ОК</button>
        </section>
      </dialog>
    </>
  );
};
