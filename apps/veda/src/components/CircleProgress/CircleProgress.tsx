import { Progress, ProgressProps } from 'antd';
import React, { FC, useEffect, useRef, useState } from 'react';
import { FontAwesome, useTheme, View, ViewProps } from 'wiloke-react-core';

export interface CircleProgressProps {
  containerCss?: ViewProps['css'];
  type?: ProgressProps['type'];
  size?: number;
  iconSize?: number;
  isComplete?: boolean;
  value?: number;
}

const CircleProgress: FC<CircleProgressProps> = ({ value = 0, isComplete = false, size = 40, iconSize = 20, type = 'circle', containerCss }) => {
  const [count, setCount] = useState(value);
  const [completed, setCompleted] = useState(isComplete);
  const [flag, setFlag] = useState(false);

  const timerIdRef = useRef(0);
  const divRef = useRef<HTMLElement | null>(null);

  const { colors } = useTheme();

  useEffect(() => {
    if (typeof isComplete !== undefined) {
      setCompleted(isComplete);
    }
    if (typeof value !== undefined) {
      setCount(value);
    }
  }, [isComplete, value]);

  useEffect(() => {
    timerIdRef.current = window.setInterval(() => {
      if (count < 100 && !completed) {
        setCount(x => x + 1);
        setFlag(false);
      } else {
        setFlag(true);
      }
    }, 1);

    return () => {
      clearInterval(timerIdRef.current);
    };
  }, [count, completed]);

  useEffect(() => {
    let timeId: number | undefined;

    if (!!flag) {
      timeId = window.setTimeout(() => {
        setCompleted(true);
      }, 1000);
    }
    return () => clearTimeout(timeId);
  }, [flag]);

  return (
    <View ref={divRef} className="CircleProgress-container" radius={'pill'} css={containerCss}>
      {completed ? (
        <Progress
          type={type}
          strokeColor={colors.secondary}
          width={size}
          strokeWidth={5}
          format={() => <FontAwesome type="fas" size={iconSize} color="secondary" name="check" />}
        />
      ) : (
        <Progress
          type={type}
          strokeColor={colors.secondary}
          percent={count}
          width={size}
          strokeWidth={5}
          format={() => {
            if (!!completed) {
              <FontAwesome type="fas" size={iconSize} color="secondary" name="check" />;
            }
            return <View color="secondary">{count}</View>;
          }}
        />
      )}
    </View>
  );
};

export default CircleProgress;
