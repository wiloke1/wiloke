import { sum } from 'ramda';
import { FC, useEffect, useState } from 'react';

interface Props {
  latestRenderTimes: number[];
}

export const TotalTime: FC<Props> = ({ latestRenderTimes }) => {
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    setTotalTime(() => sum(latestRenderTimes));
  }, [latestRenderTimes]);

  return <span>Total time:{totalTime.toFixed(2)} ms</span>;
};
