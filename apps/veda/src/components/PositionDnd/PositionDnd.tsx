import React, { FC, useState, useEffect } from 'react';
import { View } from 'wiloke-react-core';
import * as styles from './styles';

export interface OnChangeParam {
  top: string;
  left: string;
}

export interface PositionDndOnChange {
  ({ top, left }: OnChangeParam): void;
}

export interface PositionDndProps {
  top?: string;
  left?: string;
  onChange?: PositionDndOnChange;
}

const strPercentToNumber = (value: string) => {
  return Number(value.replace('%', ''));
};

const numberToStrPercent = (value: number) => `${value}%`;

const PositionDnd: FC<PositionDndProps> = ({ top = '50%', left = '50%', onChange }) => {
  const [isMouseDown, setMouseDown] = useState(false);
  const [topState, setTopState] = useState(strPercentToNumber(top));
  const [leftState, setLeftState] = useState(strPercentToNumber(left));

  const setTopLeft = (event: React.MouseEvent<HTMLElement, MouseEvent>, cond: boolean) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const { offsetWidth, offsetHeight } = event.currentTarget;
    if (cond) {
      setTopState(Math.min(Math.max((offsetY / offsetHeight) * 100, 0), 100));
      setLeftState(Math.min(Math.max((offsetX / offsetWidth) * 100, 0), 100));
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setTopLeft(event, true);
    setMouseDown(true);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setTopLeft(event, isMouseDown);
  };

  const handleMouseUp = () => {
    setMouseDown(false);
  };

  useEffect(() => {
    onChange?.({ top: numberToStrPercent(topState), left: numberToStrPercent(leftState) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topState, leftState]);

  return (
    <View css={styles.container} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <View css={styles.thumb} style={{ top: numberToStrPercent(topState), left: numberToStrPercent(leftState) }} />
    </View>
  );
};

export default PositionDnd;
