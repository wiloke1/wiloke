import { FC, ReactNode } from 'react';
import { View } from 'wiloke-react-core';
import { useInlineMenu } from './context';
import * as styles from './styles';

export interface InlineMenuItemProps {
  width?: number;
  itemId: string;
  parentId?: string;
  children: ReactNode;
  disabledClick?: boolean;
}

const InlineMenuItem: FC<InlineMenuItemProps> = ({ children, itemId, parentId, width, disabledClick = false }) => {
  const state = useInlineMenu();

  const handleClick = () => {
    if (disabledClick) {
      return;
    } else {
      if (!!parentId) {
        state?.setIds?.([parentId, itemId]);
      } else {
        state?.setIds?.([itemId]);
      }
    }
  };

  return (
    <View css={styles.item(width)} onClick={handleClick}>
      {children}
    </View>
  );
};

export default InlineMenuItem;
