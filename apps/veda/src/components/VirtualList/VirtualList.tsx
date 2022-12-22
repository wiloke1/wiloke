import { Empty } from 'antd';
import { FC, MutableRefObject, ReactNode } from 'react';
import { AutoSizer, List, ListRowRenderer, ScrollParams } from 'react-virtualized';
import { Styles, useStyleSheet, View, ViewProps } from 'wiloke-react-core';

export interface VirtualListProps {
  listRef?: MutableRefObject<List | null>;
  rowHeight: number;
  rowCount: number;
  containerClassName?: string;
  containerCss?: ViewProps['css'];
  disabledScrollStyle?: boolean;
  rowRender: (index: number) => ReactNode;
  onScroll?: (params: ScrollParams) => void;
}

const listStyles: Styles = {
  '&::-webkit-scrollbar': {
    width: '0',
  },
};

const scrollbar: Styles = {
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track-piece': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  '&::-webkit-scrollbar-thumb:vertical': {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '5px',
  },
  paddingRight: '4px',
};

const VirtualList: FC<VirtualListProps> = ({
  rowCount,
  rowHeight,
  rowRender,
  containerClassName = '',
  containerCss = {},
  onScroll,
  listRef,
  disabledScrollStyle = true,
}) => {
  const { styles } = useStyleSheet();

  const _rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <View key={key} style={{ ...style, paddingBottom: 10 }}>
        {rowRender(index)}
      </View>
    );
  };

  if (rowCount === 0) {
    return <Empty />;
  }

  return (
    <View className={containerClassName} css={[{ height: '100%', flex: 1 }, containerCss]}>
      <AutoSizer>
        {({ width, height }) => {
          return (
            <List
              ref={listRef}
              onScroll={onScroll}
              width={width}
              height={height}
              rowHeight={rowHeight}
              rowRenderer={_rowRenderer}
              rowCount={Math.ceil(rowCount)}
              className={disabledScrollStyle ? styles(listStyles) : styles(scrollbar)}
            />
          );
        }}
      </AutoSizer>
    </View>
  );
};

export default VirtualList;
