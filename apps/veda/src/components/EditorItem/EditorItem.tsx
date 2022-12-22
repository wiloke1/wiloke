import Tooltip from 'components/Tooltip';
import { FC, ReactNode } from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { i18n } from 'translation';
import { Text, View } from 'wiloke-react-core';
import * as styles from './styles';

export interface EditorItemProps {
  title: string;
  text?: string;
  isOpen?: boolean;
  Drag: ReactNode;
  Edit: ReactNode;
  Remove: ReactNode;
  Duplicate: ReactNode;
  dragHandler?: DraggableProvidedDragHandleProps;
}

const EditorItem: FC<EditorItemProps> = ({ title, text, Drag, Edit, Remove, Duplicate, dragHandler, isOpen = false }) => {
  return (
    <View css={styles.container}>
      <View css={styles.left} {...dragHandler}>
        <Tooltip text={i18n.t('general.drag')}>{Drag}</Tooltip>
        <View css={styles.textWrap}>
          <Text css={styles.title}>{title}</Text>
          {!!text && (
            <Text numberOfLines={1} size={12} color="gray6">
              {text}
            </Text>
          )}
        </View>
      </View>
      <View css={styles.right}>
        <Tooltip text={i18n.t(isOpen ? 'general.close' : 'general.edit')}>{Edit}</Tooltip>
        <Tooltip text={i18n.t('general.duplicate')}>{Duplicate}</Tooltip>
        <Tooltip text={i18n.t('general.remove')}>{Remove}</Tooltip>
      </View>
    </View>
  );
};

export default EditorItem;
