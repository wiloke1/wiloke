import Button from 'components/Button';
import HeaderDrawer from 'components/HeaderDrawer';
import ScrollBars from 'components/ScrollBars';
import { isEmpty } from 'ramda';
import { FC } from 'react';
import SortableTree from 'react-sortable-tree';
import { useDeepCompareEffect } from 'react-use';
import { i18n } from 'translation';
import { useStyleSheet, useTheme, View } from 'wiloke-react-core';
import { SettingDragMenu } from '.';
import { CustomTheme } from './CustomTheme/CustomTheme';
import { CustomTreeRenderer } from './CustomTheme/TreeRenderer';
import { DraggableMenuButton } from './DraggableMenuButton';
import { useNavigationTree, useNavigationTreeOnChange } from './globalState';
import * as css from './styles';
import { DraggableMenuProps, SettingDragMenuChildren } from './types';
import { flatDataOnChange } from './utils/flatDataOnChange';
import { useActionMenu } from './utils/useActionMenu';

type DraggableMenuStatic = FC<DraggableMenuProps> & {
  Button: typeof DraggableMenuButton;
};

const DraggableMenu: DraggableMenuStatic = ({ settings, label, onChange, goBack, multiLevelEnabled }) => {
  const [menu, setMenu] = useNavigationTree();
  const [_, setOnChange] = useNavigationTreeOnChange();

  const { colors } = useTheme();
  const { styles } = useStyleSheet(colors);
  const { handleCreate } = useActionMenu();

  useDeepCompareEffect(() => {
    if (!isEmpty(settings)) {
      setMenu(settings);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  useDeepCompareEffect(() => {
    setOnChange({ fnc: onChange });
  }, [onChange]);

  const _handleChange = (items: SettingDragMenu[]) => {
    const flatData = flatDataOnChange(items);
    setMenu(flatData);
    onChange?.(flatData);
  };

  return (
    <View backgroundColor="gray2" css={{ height: '100%' }}>
      <HeaderDrawer title={label} goBack={goBack} />
      <ScrollBars css={{ height: 'calc(100% - 54px) !important' }}>
        <View backgroundColor="gray2" css={css.menuContainer}>
          <SortableTree
            theme={{
              nodeContentRenderer: CustomTheme,
              treeNodeRenderer: CustomTreeRenderer,
              rowHeight: 48,
              scaffoldBlockPxWidth: 20,
            }}
            isVirtualized={false}
            className={styles(css.container)}
            // getNodeKey={({ node }) => node.id}
            getNodeKey={data => data.treeIndex}
            treeData={menu}
            maxDepth={multiLevelEnabled ? 3 : 1}
            onChange={_handleChange}
            canNodeHaveChildren={(node: SettingDragMenu | SettingDragMenuChildren) => {
              if (
                (node as SettingDragMenuChildren)?.['megaMenuEnabled'] !== undefined &&
                (node as SettingDragMenuChildren)?.['megaMenuEnabled'] === true
              ) {
                return false;
              }
              return true;
            }}
            canDrop={({ node }) => {
              if (
                (node as SettingDragMenuChildren)?.['megaMenuEnabled'] !== undefined &&
                (node as SettingDragMenuChildren)?.['megaMenuEnabled'] === true
              ) {
                return false;
              }
              return true;
            }}
          />

          <Button radius={6} size="small" backgroundColor="gray8" fontFamily="secondary" block onClick={handleCreate}>
            {i18n.t('general.add', { text: i18n.t('general.item'), textTransform: 'capitalize' })}
          </Button>
        </View>
      </ScrollBars>
    </View>
  );
};

DraggableMenu.Button = DraggableMenuButton;

export default DraggableMenu;
