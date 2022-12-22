import { FC, useEffect, useState } from 'react';

interface Props {
  latestRenderTimes: number[];
}

export const HighestRenderTime: FC<Props> = ({ latestRenderTimes }) => {
  const [highestRenderTime, setHighestRenderTime] = useState(0);
  useEffect(() => {
    setHighestRenderTime(
      latestRenderTimes.reduce((prev, next) => {
        return parseFloat(next.toFixed(2)) > parseFloat(prev.toFixed(2)) ? next : prev;
      }, highestRenderTime),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestRenderTimes]);
  return <span>Highest render time:{highestRenderTime.toFixed(2)} ms</span>;
};
