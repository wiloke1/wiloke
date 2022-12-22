import DragIcon from 'components/DragIcon/DragIcon';
import Tooltip from 'components/Tooltip';
import { FC, ReactNode } from 'react';
import { i18n } from 'translation';
import { Text, View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface DragItemProps {
  variant?: 'variant1' | 'variant2';
  label: string;
  description?: string;
  active?: boolean;
  Icon?: () => ReactNode;
  RightItem?: ReactNode;
  onEdit?: () => void;
  css?: ViewProps['css'];
  innerCss?: ViewProps['css'];
  dragIconDisabled?: boolean;
}

const DragItem: FC<DragItemProps> = ({
  label,
  description,
  variant = 'variant1',
  active = false,
  onEdit,
  RightItem,
  Icon,
  css,
  innerCss,
  dragIconDisabled = false,
}) => {
  return (
    <View css={[styles.container(variant, active), css]}>
      <View css={[styles.inner(variant, active), innerCss]}>
        <View css={styles.left}>
          {!dragIconDisabled && (
            <Tooltip portal text={i18n.t('general.drag')} css={styles.icon}>
              {Icon?.() ? Icon?.() : <DragIcon />}
            </Tooltip>
          )}
          <View css={styles.headingContent}>
            <Text tagName="h6" numberOfLines={1}>
              {label}
            </Text>
            {!!description && (
              <Text css={{ '> *': { display: 'inline' } }} size={10} numberOfLines={1} dangerouslySetInnerHTML={{ __html: description }} />
            )}
          </View>
        </View>
        <View css={styles.edit} onClick={onEdit} />
        <View css={styles.actions}>{RightItem}</View>
      </View>
    </View>
  );
};

export default DragItem;
