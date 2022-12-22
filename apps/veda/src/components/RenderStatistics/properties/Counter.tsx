import { useRef } from 'react';

export const Counter = () => {
  const renders = useRef(0);
  return <span>Renders : {renders.current++}</span>;
};
