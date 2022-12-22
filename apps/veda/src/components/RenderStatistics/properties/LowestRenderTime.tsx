import { FC, useEffect, useState } from 'react';

interface Props {
  latestRenderTimes: number[];
}

export const LowestRenderTime: FC<Props> = ({ latestRenderTimes }) => {
  const [lowestRenderTime, setLowestRenderTime] = useState(Infinity);
  useEffect(() => {
    setLowestRenderTime(
      latestRenderTimes.reduce((prev, next) => {
        return parseFloat(next.toFixed(2)) > parseFloat(prev.toFixed(2)) ? prev : next;
      }, lowestRenderTime),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestRenderTimes]);
  return <span>Lowest render time:{lowestRenderTime.toFixed(2)} ms</span>;
};
