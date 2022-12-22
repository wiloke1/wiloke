import { GetNodeKeyFunction } from 'react-sortable-tree';
import { SettingDragMenu, SettingDragMenuChildren } from '..';

/** Lấy thông tin node hiện tai theo id */
export const getNodeKey = ({ node: { id } }: { node: SettingDragMenuChildren | SettingDragMenu }) => id;

/** Lấy thông tin node hiện tai theo index */
export const getNodeIndex: GetNodeKeyFunction = data => data.treeIndex;
