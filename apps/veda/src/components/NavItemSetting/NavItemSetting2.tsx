import Title from 'components/Title';
import { ReactNode } from 'react';
import { FontAwesome, FontAwesomeBrandsName, FontAwesomeName, FontAwesomeType, Text, View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface NavItemSettingProps<T extends FontAwesomeType = 'far'> {
  title: string;
  text?: string;
  iconType?: T;
  iconName?: T extends 'fab' ? FontAwesomeBrandsName : FontAwesomeName;
  active?: boolean;
  containerCss?: ViewProps['css'];
  /** badge */
  badge?: string;
  /** badgeNew */
  badgeNew?: string;
  /** Sự kiện khi bấm vào component */
  Right?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const NavItemSetting2 = <T extends FontAwesomeType>({
  title,
  iconType = 'far' as T,
  iconName,
  text,
  active = false,
  containerCss,
  badge,
  badgeNew,
  Right,
  onClick,
}: NavItemSettingProps<T>) => {
  const renderLeft = iconName && (
    <FontAwesome
      type={iconType}
      name={iconName}
      size={20}
      color={active ? 'primary' : 'gray8'}
      css={{ marginRight: '10px', width: '26px', textAlign: 'center' }}
    />
  );

  if (title === '') {
    return <></>;
  }

  return (
    <View css={[styles.container2, containerCss]} backgroundColor={active ? 'gray1' : 'light'} backgroundColorHover="gray1" onClick={onClick}>
      <Title
        title={title}
        text={text}
        Left={renderLeft}
        titleCss={({ colors, fonts }) => ({ color: active ? colors.primary : colors.gray8, fontSize: '13px', fontFamily: fonts.primary })}
      />
      <View css={styles.right}>
        {!!Right && Right}
        {badgeNew && (
          <Text fontFamily="primary" css={[styles.num, styles.numPlus]}>
            {badgeNew}
          </Text>
        )}
        {badge && (
          <Text fontFamily="primary" css={styles.num}>
            {badge}
          </Text>
        )}
      </View>
    </View>
  );
};

export default NavItemSetting2;
