import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { FC } from 'react';
import { View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface OnDragParams {
  x?: number;
  y?: number;
}

export interface DragCoordinatesProps extends Omit<ViewProps, 'onDragStart' | 'onDrag' | 'onDragEnd'> {
  x?: number;
  y?: number;
  onDragStart?: () => void;
  onDragEnd?: ({ x, y }: OnDragParams) => void;
  onDrag?: ({ x, y }: OnDragParams) => void;
}

const DragCoordinates: FC<DragCoordinatesProps> = ({ x, y, children, onDragStart, onDrag, onDragEnd, css, ...rest }) => {
  const [isStart, setIsStart] = useState(false);
  const [xStart, setXStart] = useState(0);
  const [yStart, setYStart] = useState(0);
  const [xInit, setXInit] = useState(0);
  const [yInit, setYInit] = useState(0);
  const [xState, setXState] = useState<number>();
  const [yState, setYState] = useState<number>(0);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (x !== undefined) {
      setXInit(x);
    }
    if (y !== undefined) {
      setYInit(y);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStart = (event: MouseEvent) => {
    if (containerRef.current?.contains(event.target as Node)) {
      setIsStart(true);
      setXStart(event.pageX);
      setYStart(event.pageY);
      onDragStart?.();
      document.body.style.cursor = 'ew-resize';
    }
  };

  const handleDrag = (event: MouseEvent) => {
    if (!!containerRef.current && isStart) {
      const x = Math.round(xInit + (event.pageX - xStart) / 2);
      const y = Math.round(yInit + (event.pageY - yStart) / 2);
      setXState(x);
      setYState(y);
      onDrag?.({ x, y });
    }
  };

  const handleStop = () => {
    setIsStart(false);
    setXStart(0);
    setYStart(0);
    if (xState !== undefined) {
      setXInit(xState);
    }
    if (yStart !== undefined) {
      setYInit(yState);
    }
    onDragEnd?.({ x: xState, y: yState });
    document.body.style.removeProperty('cursor');
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleStart);
    window.addEventListener('mousemove', handleDrag);
    window.addEventListener('mouseup', handleStop);
    return () => {
      window.removeEventListener('mousedown', handleStart);
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleStop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xState, yState, xStart, yStart, isStart]);

  return (
    <View ref={containerRef} {...rest} css={[styles.container, css]}>
      {children}
    </View>
  );
};

export default DragCoordinates;
