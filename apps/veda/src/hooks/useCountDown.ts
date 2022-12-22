import { useEffect, useRef, useState } from 'react';

interface Params {
  /** endDate là timestamp */
  endDate: number;
}

export const useCountDown = ({ endDate }: Params) => {
  const [countDown, setCountDown] = useState(endDate - new Date().getTime());
  const timeoutRef = useRef<number | undefined>();

  useEffect(() => {
    timeoutRef.current = window.setInterval(() => {
      setCountDown(endDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(timeoutRef.current);
  }, [endDate]);

  const getEndTime = () => {
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    const isExpired = days + hours + minutes + seconds <= 0;

    return { days, hours, minutes, seconds, isExpired };
  };

  return getEndTime();
};
