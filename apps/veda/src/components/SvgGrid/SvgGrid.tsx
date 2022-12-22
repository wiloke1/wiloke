import Active from 'components/Active';
import { FC } from 'react';
import { GridSmart, View, ViewportTracking } from 'wiloke-react-core';
import More from './More';
import * as styles from './styles';

interface SvgGridDataItem {
  id: string;
  value: string;
}

export interface SvgGridProps {
  data: SvgGridDataItem[];
  idActive: string;
  buttonMoreEnable?: boolean;
  onItemClick?: (item: SvgGridDataItem) => void;
  onMore?: () => void;
  onEndReached?: () => void;
}

const SvgGrid: FC<SvgGridProps> = ({ data, idActive, onItemClick, onMore, onEndReached, buttonMoreEnable = false }) => {
  return (
    <>
      <GridSmart columnWidth={50} columnCount={2} columnGap={10}>
        {data
          .filter(item => item.value)
          .map(item => {
            return (
              <Active
                variant="style2"
                key={item.id}
                active={item.id === idActive}
                onClick={() => {
                  onItemClick?.(item);
                }}
                css={styles.imageWrap}
              >
                <View css={[styles.img, { backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(item.value)}")` }]} />
              </Active>
            );
          })}
        {buttonMoreEnable && <More onClick={onMore} />}
      </GridSmart>
      <ViewportTracking onEnterViewport={onEndReached}>
        <View css={{ height: '40px' }} />
      </ViewportTracking>
    </>
  );
};

export default SvgGrid;
