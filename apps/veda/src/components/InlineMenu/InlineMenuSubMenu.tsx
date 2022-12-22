import ScrollBars from 'components/ScrollBars';
import { FC, ReactNode } from 'react';
import { View } from 'wiloke-react-core';
import { useInlineMenu } from './context';
import * as styles from './styles';

export interface InlineMenuSubMenuProps {
  title: ReactNode;
  titleWidth?: number;
  width?: number;
  itemId: string;
  childId?: string;
  children: ReactNode;
  Header?: ReactNode;
}

const InlineMenuSubMenu: FC<InlineMenuSubMenuProps> = ({ title, children, itemId, childId, titleWidth, width }) => {
  const state = useInlineMenu();

  return (
    <>
      <View
        css={styles.item(titleWidth ?? width)}
        onClick={() => {
          if (!!childId) {
            state?.setIds?.([itemId, childId]);
          } else {
            state?.setIds?.([itemId]);
          }
        }}
      >
        {title}
      </View>
      {state?.ids.includes(itemId) && (
        <View css={styles.subMenu(width, titleWidth ?? width)}>
          <ScrollBars css={{ height: '100%' }}>{children}</ScrollBars>
        </View>
      )}
    </>
  );
};

export default InlineMenuSubMenu;
