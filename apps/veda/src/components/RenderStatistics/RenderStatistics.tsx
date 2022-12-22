import { FC, Profiler, ProfilerOnRenderCallback, useCallback, useRef } from 'react';
import { AvgRenderTime } from './properties/AvgRenderTime';
import { Counter } from './properties/Counter';
import { HighestRenderTime } from './properties/HighestRenderTime';
import { Id } from './properties/Id';
import { LastRenderTime } from './properties/LastRenderTime';
import { LowestRenderTime } from './properties/LowestRenderTime';
import { TotalTime } from './properties/TotalTime';

interface Props {
  id: string;
}

export const RenderStatistics: FC<Props> = ({ children, id }) => {
  const latestRenderTimes = useRef<number[]>([]);
  const clockPerformance: ProfilerOnRenderCallback = useCallback(
    (_id, _phase, actualDuration) => {
      latestRenderTimes.current = [actualDuration, ...latestRenderTimes.current].slice(0, 500);
    },
    [latestRenderTimes],
  );
  return (
    <Profiler id={id} onRender={clockPerformance}>
      <div>
        <br />
        <Id id={id} />
        <br />
        <Counter />
        <br />
        <LastRenderTime latestRenderTimes={latestRenderTimes.current} />
        <br />
        <AvgRenderTime latestRenderTimes={latestRenderTimes.current} />
        <br />
        <HighestRenderTime latestRenderTimes={latestRenderTimes.current} />
        <br />
        <LowestRenderTime latestRenderTimes={latestRenderTimes.current} />
        <br />
        <TotalTime latestRenderTimes={latestRenderTimes.current} />
        <br />
      </div>
      {children}
    </Profiler>
  );
};
