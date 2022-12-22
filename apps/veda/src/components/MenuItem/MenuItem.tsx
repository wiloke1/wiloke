import { FC } from 'react';
import { Text, View } from 'wiloke-react-core';
import * as styles from './styles';

export interface MenuItemProps {
  /** Trạng thái của component */
  active?: boolean;
  /** Image icon */
  icon?: string;
  /** Phần text nằm dưới icon */
  label: string;
  /** badge */
  badge?: string;
  /** badgeNew */
  badgeNew?: string;
  /** Sự kiện khi bấm vào component */
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const MenuItem: FC<MenuItemProps> = ({ active = false, icon, label, badge, badgeNew, onClick }) => {
  return (
    <View css={styles.container} onClick={onClick}>
      <View css={styles.left}>
        {icon && <View tagName="img" src={icon} />}
        <Text tagName="span" css={styles.label(active)}>
          {label}
        </Text>
      </View>
      <View css={styles.right}>
        {badgeNew && <Text css={[styles.num, styles.numPlus]}>{badgeNew}</Text>}
        {badge && <Text css={styles.num}>{badge}</Text>}
      </View>
    </View>
  );
};

export default MenuItem;
