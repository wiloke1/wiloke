import { FC, useEffect, useState } from 'react';

interface Props {
  latestRenderTimes: number[];
}

export const LastRenderTime: FC<Props> = ({ latestRenderTimes }) => {
  const [lastRenderTime, setLastRenderTime] = useState(0);
  useEffect(() => {
    if (latestRenderTimes[0]) {
      setLastRenderTime(latestRenderTimes[0]);
    }
  }, [latestRenderTimes]);
  return <span>Last render time:{lastRenderTime.toFixed(2)} ms</span>;
};
