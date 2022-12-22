import { FC, useEffect, useState } from 'react';

interface Props {
  latestRenderTimes: number[];
}

export const AvgRenderTime: FC<Props> = ({ latestRenderTimes }) => {
  const [avgRenderTime, setAvgRenderTime] = useState(0);
  useEffect(() => {
    if (latestRenderTimes.length > 0) {
      setAvgRenderTime(latestRenderTimes.reduce((prev, next) => prev + next, 0) / latestRenderTimes.length);
    }
  }, [latestRenderTimes]);
  return <span>Average render time:{avgRenderTime.toFixed(2)} ms</span>;
};
