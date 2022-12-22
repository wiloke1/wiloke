import { random, range } from 'lodash';
import { FC, useRef } from 'react';
import { View } from 'wiloke-react-core';

const colors = ['#3affce', '#20e3b2', '#ff6bcb', '#c8c9cd', '#eac394', '#e97878', '#9a86fd', '#bd93f9'];

export const Skeleton: FC = () => {
  const countRef = useRef(0);
  const isIncreaseRef = useRef(false);
  const maxRef = useRef(random(2, 6));

  return (
    <View css={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: 1, padding: '5px 0', userSelect: 'none' }}>
      {range(1, 30).map(item => {
        maxRef.current = countRef.current === 0 ? random(2, 6) : maxRef.current;
        if (countRef.current === maxRef.current) {
          isIncreaseRef.current = false;
        } else if (countRef.current === 0) {
          isIncreaseRef.current = true;
        }
        if (isIncreaseRef.current) {
          countRef.current = Math.min(countRef.current + 1, maxRef.current);
        } else {
          countRef.current = Math.max(countRef.current - 1, 0);
        }

        return (
          <View key={item} css={{ height: '34px', display: 'flex', alignItems: 'center' }}>
            <View
              css={{ color: '#6272a4', fontFamily: 'Monaco, monospace', fontWeight: 'normal', fontSize: '14px', width: '70px', textAlign: 'center' }}
            >
              {item}
            </View>
            <View css={{ borderLeft: '1px solid #454662', width: '10px', height: '100%' }} />
            <View
              key={item}
              css={{
                marginLeft: `${countRef.current * 20}px`,
                width: `${random(5, 50)}%`,
                height: '15px',
                backgroundColor: colors[random(0, colors.length - 1)],
                borderRadius: '4px',
                opacity: '0.1',
              }}
            />
          </View>
        );
      })}
    </View>
  );
};
