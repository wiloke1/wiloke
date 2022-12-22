import Collapse, { useCollapseActions } from 'components/Collapse';
import DragIcon from 'components/DragIcon/DragIcon';
import DragItem from 'components/DragItem';
import DragItemRight from 'components/DragItemRight';
import { FC } from 'react';
import { isDescendant, NodeRendererProps } from 'react-sortable-tree';
import { deepFind } from 'utils/functions/deepFind';
import { FontAwesome, View } from 'wiloke-react-core';
import { SettingDragMenu, SettingDragMenuChildren } from '..';
import { MenuForm } from '../MenuForm/MenuForm';
import { useActionMenu } from '../utils/useActionMenu';
import * as styles from './styles';

interface CustomThemeProps extends NodeRendererProps {}

export const CustomTheme: FC<CustomThemeProps> = ({
  isDragging,
  canDrag = false,
  canDrop = false,
  didDrop,
  node,
  path,
  treeIndex,
  className,
  style,
  draggedNode = null,
  scaffoldBlockPxWidth,
  rowDirection = 'ltr',
  parentNode,
  isSearchMatch,
  isSearchFocus,
  treeId,
  isOver,
  listIndex,
  connectDragPreview,
  connectDragSource,
  toggleChildrenVisibility,
  ...otherProps
}) => {
  const nodeTitle = (node as any).label;
  const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
  const isLandingPadActive = !didDrop && isDragging;
  const { handleDelete, handleChangeForm, handleDuplicate } = useActionMenu();
  const { onOpen, onClose } = useCollapseActions();

  const parentNodeHasMegaMenuIds = deepFind(node ?? {}, 'megaMenuId');

  // bấm vào thì sổ ra menu form
  const _handleShowChildren = () => {
    if (toggleChildrenVisibility) {
      toggleChildrenVisibility({
        node,
        path,
        treeIndex,
      });
    }
  };

  const getDescription = (value: SettingDragMenu) => {
    const desc = `${value.icon}, ${value.label}, ${value.href}, ${value.iconEnabled}`;
    if (desc.length > 20) {
      return `${desc.slice(0, 50)}..., `;
    }
    return `${desc} ,`;
  };

  const _handleActiveCollapse = (active: boolean) => () => {
    if (active) {
      onClose({ groupName: `DRAG_MENU_GROUP_NAME`, name: `DRAG_MENU_NAME_${(node as SettingDragMenu | SettingDragMenuChildren).id}` });
    } else {
      onOpen({ groupName: `DRAG_MENU_GROUP_NAME`, name: `DRAG_MENU_NAME_${(node as SettingDragMenu | SettingDragMenuChildren).id}` });
    }
  };

  const nodeContent = ({ active }: { active: boolean }) => {
    return connectDragPreview(
      <div className="menu-draggable">
        <DragItem
          active={active}
          description={getDescription(node as SettingDragMenu)}
          Icon={() => {
            if (node.children && (node.children.length > 0 || typeof node.children === 'function')) {
              return (
                <View onClick={_handleShowChildren} css={{ display: 'flex', alignItems: 'center' }}>
                  {node.expanded ? <FontAwesome type="far" name="angle-down" size={20} /> : <FontAwesome size={20} type="far" name="angle-up" />}
                </View>
              );
            }
            return <DragIcon />;
          }}
          variant="variant2"
          label={
            typeof nodeTitle === 'function'
              ? nodeTitle({
                  node,
                  path,
                  treeIndex,
                })
              : nodeTitle
          }
          onEdit={_handleActiveCollapse(active)}
          RightItem={
            <DragItemRight
              onEdit={_handleActiveCollapse(active)}
              onDelete={handleDelete(path, node as SettingDragMenu)}
              onDuplicate={parentNodeHasMegaMenuIds.length > 0 ? undefined : handleDuplicate(path)}
            />
          }
        />
      </div>,
    );
  };

  return (
    <div
      {...(otherProps as any)}
      row-direction={rowDirection}
      tree-id={treeId}
      list-index={listIndex}
      scaffold-block-px-width={scaffoldBlockPxWidth}
      parent-node={parentNode}
      is-search-focus={isSearchFocus.toString()}
      is-search-match={isSearchMatch.toString()}
      is-over={isOver.toString()}
      style={{
        height: '100% !important',
        width: '100% !important',
        overflow: 'hidden',
        borderRadius: '6px',
      }}
    >
      <View borderWidth={0} radius={6} backgroundColor="light" css={[styles.rowWrapper, !canDrag ? styles.rowWrapperDragDisabled : undefined]}>
        <View
          css={[styles.row, isLandingPadActive ? styles.rowLandingPad : undefined, isLandingPadActive && !canDrop ? styles.rowCancelPad : undefined]}
          className={className}
          style={{
            opacity: isDraggedDescendant ? 1 : 1,
            overflow: 'hidden',
            borderRadius: '6px',
            ...style,
          }}
        >
          {canDrag ? (
            <Collapse
              name={`DRAG_MENU_NAME_${(node as SettingDragMenu | SettingDragMenuChildren).id}`}
              groupName={`DRAG_MENU_GROUP_NAME`}
              css={{ height: '100%', display: 'block', alignItems: 'center', width: '100%', overflow: 'hidden' }}
              renderHeader={(_handler, active) => {
                return connectDragSource(nodeContent({ active }));
              }}
            >
              <View css={{ padding: '8px 14px', width: '100%' }}>
                <MenuForm
                  path={path}
                  data={(node as SettingDragMenu) || (node as SettingDragMenuChildren)}
                  onChange={data => {
                    handleChangeForm(data, node as SettingDragMenu, path);
                  }}
                />
              </View>
            </Collapse>
          ) : (
            // ? connectDragSource(nodeContent, { dropEffect: 'copy' })
            nodeContent({ active: false })
          )}
        </View>
      </View>
    </div>
  );
};
