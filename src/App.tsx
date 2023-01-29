import { useState } from 'react';
import { AreaTypes, RouteTypes, ScheduleTypes } from './entities/common';

import './App.css';
import { TimeList } from './components/Times/TimeList';

function App() {
  const [inputAreaType, setInputAreaType] = useState(AreaTypes.Innopolis);
  const [inputRoute, setInputRoute] = useState(RouteTypes.R108);
  const [inputSchedule, setInputSchedule] = useState(ScheduleTypes.Regular);
  const [filterRelevant, setFilterRelevant] = useState(true);

  return (
    <main>
      <TimeList inputAreaType={inputAreaType} inputRoute={inputRoute} inputSchedule={inputSchedule} filterRelevant={filterRelevant} />
      <form>
        <section>
          <label>
            <input type="checkbox" defaultChecked={filterRelevant} onChange={() => setFilterRelevant(!filterRelevant)} />
            Только актуальные
          </label>
        </section>
        <section>
          <p>Шаттл{'\u00A0'}</p>
          <button onClick={() => setInputRoute(inputRoute !== RouteTypes.R108 ? RouteTypes.R108 : RouteTypes.R106)} type="button">
            {inputRoute}
          </button>
          <p>, дни{'\u00A0'}</p>
          <button
            onClick={() => setInputSchedule(inputSchedule !== ScheduleTypes.Regular ? ScheduleTypes.Regular : ScheduleTypes.DayOff)}
            type="button"
          >
            {inputSchedule}
          </button>
          <p>, выезд{'\u00A0'}</p>
          <button
            onClick={() => setInputAreaType(inputAreaType !== AreaTypes.Innopolis ? AreaTypes.Innopolis : AreaTypes.Kazan)}
            type="button"
          >
            {inputAreaType}
          </button>
        </section>
      </form>
    </main>
  );
}

export default App;
