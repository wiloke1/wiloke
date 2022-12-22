import { Children, cloneElement, FC } from 'react';
import { TreeRendererProps } from 'react-sortable-tree';

interface CustomTreeRendererProps extends TreeRendererProps {}

export const CustomTreeRenderer: FC<CustomTreeRendererProps> = ({
  children,
  scaffoldBlockPxWidth,
  lowerSiblingCounts,
  isOver,
  draggedNode,
  canDrop,
  rowDirection = 'ltr',
  listIndex,
  treeId,
  swapFrom,
  swapLength,
  swapDepth,
  treeIndex,
  getPrevRow,
  connectDropTarget,
  ...otherProps
}) => {
  const scaffoldBlockCount = lowerSiblingCounts.length - 1;

  const _getPrevRow = () => getPrevRow?.();

  return connectDropTarget(
    <div
      {...otherProps}
      tree-id={treeId}
      list-index={listIndex}
      prev-row={_getPrevRow() || 'null'}
      swap-from={swapFrom}
      swap-length={swapLength}
      swap-depth={swapDepth}
      tree-index={treeIndex}
      row-direction={rowDirection}
      style={{ marginBottom: '5px', borderRadius: '6px', overflow: 'hidden !important' }}
    >
      <div
        className={'custom_nodeContent'}
        style={{
          paddingLeft: scaffoldBlockPxWidth * scaffoldBlockCount,
          height: '100%',
          borderRadius: '6px',
        }}
      >
        {Children.map(children, child =>
          cloneElement(child, {
            isOver,
            canDrop,
            draggedNode,
          }),
        )}
      </div>
    </div>,
  );
};
