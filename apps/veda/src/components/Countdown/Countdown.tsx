import { FC, useEffect, useRef, useState } from 'react';
import { Text } from 'wiloke-react-core';

export interface CountdownProps {
  start: number;
  end?: number;
  onStart?: () => void;
  onEnd?: () => void;
}

const Countdown: FC<CountdownProps> = ({ start, end = 0, onStart, onEnd }) => {
  const [count, setCount] = useState(start);
  const timerIdRef = useRef(-1);

  useEffect(() => {
    if (count === end) {
      onEnd?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useEffect(() => {
    onStart?.();
    timerIdRef.current = window.setInterval(() => {
      setCount(count => Math.max(count - 1, end));
    }, 1000);
    return () => {
      clearInterval(timerIdRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Text tagName="span">{count}</Text>;
};

export default Countdown;
