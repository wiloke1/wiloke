import useDelay from 'hooks/useDelay';
import { Children, ReactElement } from 'react';
import { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { View } from 'wiloke-react-core';
import Sizer from './Sizer';
import { MasonryProps, State } from './types';
import { getColumn, getIndexSelected, getMaxHeight, getMinHeight } from './utils';

const Masonry: FC<MasonryProps> = ({ children, gap = 20, defaultColumn, responsive = [] }) => {
  const getDefaultState = (): State => ({ columnHeights: Array(getColumn(defaultColumn, responsive)).fill(0), itemStyles: [] });
  const [state, setState] = useState(getDefaultState());
  const [containerHeight, setContainerHeight] = useState(0);
  const [delay, cancel] = useDelay();
  const height = getMaxHeight(state.columnHeights);
  const [sizes, setSizes] = useState<{ width: number; height: number }[]>([]);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!!height) {
      setContainerHeight(height);
    }
  }, [height]);

  const masonryCalculator = () => {
    if (sizes.length >= Children.toArray(children).length && containerRef.current) {
      const column = getColumn(defaultColumn, responsive);
      const containerWidth = containerRef.current.offsetWidth;
      sizes.forEach(({ width, height }, index) => {
        setState(({ columnHeights, itemStyles }) => {
          const newHeights = [...columnHeights];
          const newItemStyles = [...itemStyles];
          const indexSelected = getIndexSelected(columnHeights);
          const newWidth = Math.round(containerWidth / column);
          const newHeight = (height * newWidth) / width;
          newHeights[indexSelected] += newHeight;
          newItemStyles[index] = {
            left: `${(100 / column) * indexSelected}%`,
            top: `${getMinHeight(columnHeights)}px`,
          };
          return {
            columnHeights: newHeights,
            itemStyles: newItemStyles,
          };
        });
      });
    }
  };

  useEffect(() => {
    setState(getDefaultState());
    masonryCalculator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sizes]);

  const handleGetSize = (width: number, height: number) => {
    setSizes(sizes => [...sizes, { width, height }]);
  };

  const handleResize = async () => {
    cancel();
    await delay(500);
    setState(getDefaultState());
    masonryCalculator();
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sizes]);

  return (
    <View
      ref={containerRef}
      css={{
        position: 'relative',
        height: `${containerHeight}px`,
        margin: `${-gap / 2}px`,
      }}
    >
      {Children.toArray(children)
        .map((child, index) => {
          const column = getColumn(defaultColumn, responsive);
          const _child = child as ReactElement;
          return (
            <Sizer
              key={_child.key}
              style={{ position: 'absolute', width: `${100 / column}%`, padding: `${gap / 2}px`, ...state.itemStyles[index] }}
              getSize={handleGetSize}
            >
              {child}
            </Sizer>
          );
        })
        .filter(Boolean)}
    </View>
  );
};

export default Masonry;
